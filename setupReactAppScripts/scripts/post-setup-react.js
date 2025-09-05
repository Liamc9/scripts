// setup-functions.js

const fs = require('fs');
const path = require('path');
const { executeCommand } = require('./utils');

// Get the project path from the command-line arguments
const projectPath = process.argv[2];

if (!projectPath) {
  console.error("Please provide a path to the project directory.");
  process.exit(1);
}

// Resolve the functions directory path
const functionsDir = path.join(projectPath, 'functions');
if (!fs.existsSync(functionsDir)) {
  console.error(`The functions directory does not exist at: ${functionsDir}`);
  process.exit(1);
}

// Define the template functions directory path
const templateFunctionsDir = path.join(__dirname, "../template/functions");
const templateEnvPath = path.join(templateFunctionsDir, ".env");
const templateIndexJsPath = path.join(templateFunctionsDir, "index.js");

// Destination paths
const envFilePath = path.join(functionsDir, ".env");
const indexFilePath = path.join(functionsDir, "index.js");

const copyFile = (source, destination) => {
  try {
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  } catch (error) {
    console.error(`Error copying ${source} to ${destination}:`, error);
    process.exit(1);
  }
};

// 1. Copy .env
console.log("\n--- Copying .env file from template ---");
if (fs.existsSync(templateEnvPath)) {
  copyFile(templateEnvPath, envFilePath);
} else {
  console.error(`Template .env file does not exist at: ${templateEnvPath}`);
  process.exit(1);
}

// 2. Copy index.js
console.log("\n--- Copying index.js file from template ---");
if (fs.existsSync(templateIndexJsPath)) {
  copyFile(templateIndexJsPath, indexFilePath);
} else {
  console.error(`Template index.js file does not exist at: ${templateIndexJsPath}`);
  process.exit(1);
}

// 3. Install dependencies in the root project
console.log("\n--- Installing packages in the project directory ---");
const rootDeps = [
  'react-firebase-hooks',
  'stripe',
  'dotenv',
  'cors',
  'liamc9npm@latest',
  'styled-components',
  'react-toastify',
  'swiper',
  'dragula',
  'react-router-dom',
  'react-icons'
];
executeCommand(`pnpm add ${rootDeps.join(' ')}`, { cwd: projectPath });

// 4. Install dependencies in the functions folder
console.log("\n--- Installing packages in the functions directory ---");
const funcDeps = ['stripe', 'dotenv', 'cors'];
executeCommand(`pnpm add ${funcDeps.join(' ')}`, { cwd: functionsDir });

// 5. Run the Stripe feature script
console.log("\n--- Running features/stripe.js ---");
const stripeScriptPath = path.join(__dirname, "features", "stripe.js");
executeCommand(`node "${stripeScriptPath}" "${projectPath}"`, { cwd: __dirname });

console.log("\nSetup complete.");
