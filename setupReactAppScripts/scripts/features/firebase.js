// features/firebase.js
const { executeCommand } = require("../utils");

async function addFirebaseConfig(appDirectory) {
  if (!appDirectory) {
    console.error("Please provide the path to your React app directory.");
    process.exit(1);
  }
  console.log("\n--- Adding Firebase ---");

  executeCommand("npm install firebase", { cwd: appDirectory });
  executeCommand("npm install -g firebase-tools", { cwd: appDirectory });
}

module.exports = addFirebaseConfig;

if (require.main === module) {
  const appDirectory = process.argv[2];
  addFirebaseConfig(appDirectory);
}
