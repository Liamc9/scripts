// setup-react-app.js

const path = require("path");
const fs = require("fs");
const { askQuestion, executeCommand } = require("./utils");

(async function main() {
  // Ensure a project name is provided.
  const projectName = process.argv[2];
  if (!projectName) {
    console.error("Please provide a project name.");
    process.exit(1);
  }

  // Define key paths.
  const allProjectsDir = path.join(process.cwd(), "../../../all_projects/webApps");
  const appDirectory = path.join(allProjectsDir, projectName);

  if (fs.existsSync(appDirectory)) {
    console.error("A project with this name already exists.");
    process.exit(1);
  }

  console.log("\n--- Feature Selection ---");

  // Helper to prompt features with Y as the default.
  const askFeature = async (question) => {
    const answer = await askQuestion(question);
    return answer.trim() === "" || answer.toLowerCase().startsWith("y");
  };

  const addTailwindPrettier = await askFeature("Do you want to add Tailwind CSS and Prettier with Tailwind CSS plugin? (Y/n): ");
  const addFirebase = await askFeature("Do you want to add Firebase? (Y/n): ");
  const addGitHub = await askFeature("Do you want to set up GitHub integration? (Y/n): ");

  // Create the main projects directory if it doesn't exist.
  if (!fs.existsSync(allProjectsDir)) {
    fs.mkdirSync(allProjectsDir, { recursive: true });
    console.log(`Created directory: ${allProjectsDir}`);
  }

  console.log("\n--- Setting up a simple React app with Vite ---");
  // Scaffold with Vite
  executeCommand(
    `pnpm create vite@latest ${projectName} -- --template react`,
    { cwd: allProjectsDir }
  );

  // Install dependencies
  executeCommand(`pnpm install`, { cwd: appDirectory });

  console.log("\n--- Replacing the src folder with template src ---");
  const templateSrc = path.join(__dirname, "../template/src");
  const projectSrc = path.join(appDirectory, "src");

  if (!fs.existsSync(templateSrc)) {
    console.error(`Template src folder does not exist at ${templateSrc}`);
    process.exit(1);
  }

  if (fs.existsSync(projectSrc)) {
    fs.rmSync(projectSrc, { recursive: true, force: true });
    console.log(`Deleted existing src folder at ${projectSrc}`);
  }

  fs.cpSync(templateSrc, projectSrc, { recursive: true });
  console.log(`Copied template src from ${templateSrc} to ${projectSrc}`);
  console.log("\nVite React app setup complete!");

  // Execute feature scripts based on user selections.
  const featureScriptsDir = path.join(__dirname, "features");
  if (addTailwindPrettier) {
    executeCommand(
      `node tailwindprettier.js "${appDirectory}"`,
      { cwd: featureScriptsDir }
    );
  }
  if (addFirebase) {
    executeCommand(
      `node firebase.js "${appDirectory}"`,
      { cwd: featureScriptsDir }
    );
  }
  if (addGitHub) {
    executeCommand(
      `node github.js "${appDirectory}"`,
      { cwd: featureScriptsDir }
    );
  }

  console.log("\nAll selected features have been added to your app!");
  console.log(`\nNavigate to your project directory:\ncd ${path.relative(process.cwd(), appDirectory)}`);
})();
