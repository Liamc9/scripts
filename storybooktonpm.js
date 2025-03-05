const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { exec } = require('child_process');
const util = require('util');

// Promisify exec for async/await usage
const execAsync = util.promisify(exec);

// Define source and destination paths
const SOURCE_COMPONENTS = path.join('..', 'all_projects', 'storybook', 'src', 'components');
const DEST_COMPONENTS = path.join('..', 'all_projects', 'npmPackages', 'liamc9npm', 'src', 'components');
const INDEX_FILE_PATH = path.join('..','all_projects', 'npmPackages', 'liamc9npm', 'src', 'index.js');
const PACKAGE_JSON_PATH = path.join('..','all_projects', 'npmPackages', 'liamc9npm', 'package.json');

// Supported file extensions for components
const COMPONENT_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// Paths or patterns with named exports (relative to components directory)
const NAMED_EXPORT_PATHS = [
  path.join('Branding', 'icons'), // Add other directories with named exports if any
];

/**
 * Checks if a given file path matches any of the named export paths.
 * @param {string} filePath - The relative file path from the components directory.
 * @returns {boolean} - True if the file is within a named export path, else false.
 */
function isNamedExport(filePath) {
  return NAMED_EXPORT_PATHS.some(namedPath => filePath.startsWith(namedPath));
}

/**
 * Copies the components folder from source to destination.
 * First removes the destination folder to ensure no leftover files.
 */
async function copyComponents() {
  try {
    const sourceExists = await fs.pathExists(SOURCE_COMPONENTS);
    if (!sourceExists) {
      console.error(`❌ Source directory "${SOURCE_COMPONENTS}" does not exist.`);
      process.exit(1);
    }
    // Remove the destination folder if it exists
    if (await fs.pathExists(DEST_COMPONENTS)) {
      await fs.remove(DEST_COMPONENTS);
      console.log(`🗑️ Removed existing destination folder "${DEST_COMPONENTS}"`);
    }
    // Ensure the directory exists before copying
    await fs.ensureDir(DEST_COMPONENTS);
    await fs.copy(SOURCE_COMPONENTS, DEST_COMPONENTS, { overwrite: true });
    console.log(`✅ Successfully copied "${SOURCE_COMPONENTS}" to "${DEST_COMPONENTS}"`);
  } catch (err) {
    console.error('❌ Error copying components folder:', err);
    process.exit(1);
  }
}

/**
 * Generates the index.js file with appropriate export statements.
 */
function generateIndex() {
  try {
    const pattern = `${DEST_COMPONENTS}/**/*{${COMPONENT_EXTENSIONS.join(',')}}`;
    const files = glob.sync(pattern, { nodir: true });
    const exportStatements = [];

    files.forEach(file => {
      const relativePath = path.relative(path.dirname(INDEX_FILE_PATH), file);
      let importPath = relativePath.replace(/\\/g, '/');
      COMPONENT_EXTENSIONS.forEach(ext => {
        if (importPath.endsWith(ext)) {
          importPath = importPath.slice(0, -ext.length);
        }
      });
      if (!importPath.startsWith('.')) {
        importPath = `./${importPath}`;
      }
      const relativeFilePath = path.relative(DEST_COMPONENTS, file);
      const isNamed = isNamedExport(relativeFilePath);
      if (isNamed) {
        exportStatements.push(`export * from '${importPath}';`);
      } else {
        const componentName = path.basename(file, path.extname(file));
        exportStatements.push(`export { default as ${componentName} } from '${importPath}';`);
      }
    });

    exportStatements.sort();
    const indexContent = `// Auto-generated index.js

${exportStatements.join('\n')}
`;
    fs.writeFileSync(INDEX_FILE_PATH, indexContent, 'utf8');
    console.log(`✅ Successfully generated index.js at "${INDEX_FILE_PATH}"`);
  } catch (err) {
    console.error('❌ Error generating index.js:', err);
    process.exit(1);
  }
}

/**
 * Commits changes to the repository with a given message.
 * @param {string} message - The commit message.
 */
async function commitChanges(message) {
  try {
    const repoDir = path.dirname(PACKAGE_JSON_PATH);
    await execAsync(`git add .`, { cwd: repoDir });
    // Use '--allow-empty' to avoid errors if there's nothing to commit.
    await execAsync(`git commit -m "${message}" --allow-empty`, { cwd: repoDir });
    console.log(`✅ Changes committed with message: "${message}"`);
  } catch (err) {
    console.error('❌ Error committing changes:', err);
    process.exit(1);
  }
}

/**
 * Updates the package version in package.json.
 * @param {string} releaseType - The type of version update: 'patch', 'minor', 'major'.
 */
async function updateVersion(releaseType = 'patch') {
  try {
    const packageJsonExists = await fs.pathExists(PACKAGE_JSON_PATH);
    if (!packageJsonExists) {
      console.error(`❌ package.json not found at "${PACKAGE_JSON_PATH}".`);
      process.exit(1);
    }
    const packageData = await fs.readJson(PACKAGE_JSON_PATH);
    if (!packageData.version) {
      console.error(`❌ "version" field not found in package.json.`);
      process.exit(1);
    }
    const { stderr } = await execAsync(`npm version ${releaseType}`, {
      cwd: path.dirname(PACKAGE_JSON_PATH),
      stdio: 'inherit',
    });
    if (stderr) {
      console.warn('⚠️ npm version warning:', stderr);
    }
    console.log(`✅ Successfully updated version to "${packageData.version}"`);
  } catch (err) {
    console.error('❌ Error updating version:', err);
    process.exit(1);
  }
}

/**
 * Publishes the package to npm.
 */
async function publishPackage() {
  try {
    const { stderr } = await execAsync(`npm publish`, {
      cwd: path.dirname(PACKAGE_JSON_PATH),
      stdio: 'inherit',
    });
    if (stderr) {
      console.warn('⚠️ npm publish warning:', stderr);
    }
    console.log(`✅ Successfully published the package to npm.`);
  } catch (err) {
    console.error('❌ Error publishing package:', err);
    process.exit(1);
  }
}

/**
 * Pushes commits and tags to the remote GitHub repository.
 */
async function pushChanges() {
  try {
    const repoDir = path.dirname(PACKAGE_JSON_PATH);
    await execAsync(`git push`, { cwd: repoDir, stdio: 'inherit' });
    await execAsync(`git push --tags`, { cwd: repoDir, stdio: 'inherit' });
    console.log(`✅ Successfully pushed commits and tags to GitHub.`);
  } catch (err) {
    console.error('❌ Error pushing changes to GitHub:', err);
    process.exit(1);
  }
}

/**
 * Main function to execute the steps.
 */
async function main() {
  await copyComponents();
  generateIndex();
  // Commit changes made by generateIndex (if any)
  await commitChanges('chore: update index.js and components');

  await updateVersion('patch');
  await publishPackage();
  await pushChanges();
}

main();
