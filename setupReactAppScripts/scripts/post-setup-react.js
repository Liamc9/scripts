const fs = require('fs');
const path = require('path');
const { executeCommand } = require('./utils');
const addStripeIntegration = require('./features/stripe');

// Get the project path from the command-line arguments
const projectPath = process.argv[2];

// Check if project path is provided
if (!projectPath) {
  console.error("Please provide a path to the project directory.");
  process.exit(1);
}

// Resolve the functions directory path
const functionsDir = path.join(projectPath, 'functions');

// Ensure the functions directory exists
if (!fs.existsSync(functionsDir)) {
  console.error(`The functions directory does not exist at: ${functionsDir}`);
  process.exit(1);
}

// Define the template functions directory path
const templateFunctionsDir = path.join(__dirname, "../template/functions");

// Define the source paths for .env and index.js in the template
const templateEnvPath = path.join(templateFunctionsDir, ".env");
const templateIndexJsPath = path.join(templateFunctionsDir, "index.js");

// Define the destination paths for .env and index.js in the functions directory
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

// Step 1: Copy .env file from template to functions directory, overwriting if exists
console.log("\n--- Copying .env file from template ---");
if (fs.existsSync(templateEnvPath)) {
  copyFile(templateEnvPath, envFilePath);
} else {
  console.error(`Template .env file does not exist at: ${templateEnvPath}`);
  process.exit(1);
}

// Step 2: Copy index.js file from template to functions directory, overwriting if exists
console.log("\n--- Copying index.js file from template ---");
if (fs.existsSync(templateIndexJsPath)) {
  copyFile(templateIndexJsPath, indexFilePath);
} else {
  console.error(`Template index.js file does not exist at: ${templateIndexJsPath}`);
  process.exit(1);
}

// Step 3: Install npm packages in the project directory
console.log("\n--- Installing packages in the project directory ---");
const projectPackages = [
  "react-firebase-hooks",
  "stripe",
  "dotenv",
  "cors",
  "liamc9npm@latest",
  "styled-components",
  "react-toastify",
  "swiper",
  "dragula",
  "react-router-dom",
  "react-icons",
];
projectPackages.forEach((pkg) => {
  executeCommand(`npm install ${pkg}`, { cwd: projectPath });
});


// Step 4: Install npm packages in the functions directory
console.log("\n--- Installing packages in the functions directory ---");
const functionPackages = ["stripe", "dotenv", "cors"];
functionPackages.forEach((pkg) => {
  executeCommand(`npm install ${pkg}`, { cwd: functionsDir });
});

// Step 5: Run Stripe setup
console.log("\n--- Adding Stripe provider ---");
addStripeIntegration(projectPath);

// Final message
console.log("\nSetup complete.");
