# Scripts

This repository contains helper scripts for bootstrapping React projects.

## Setup React App

Run the `setup-react-app.js` script to create a new React app inside `all_projects/webApps` and optionally enable features.

```bash
node setupReactAppScripts/scripts/setup-react-app.js <project-name>
```

You will be prompted to enable Tailwind with Prettier, Firebase, and GitHub integration.

After the base app is created you can run the additional `post-setup-react.js` script to install extra packages and set up serverless functions:

```bash
node setupReactAppScripts/scripts/post-setup-react.js <path-to-project>
```

The scripts are mostly plug and play and require only Node.js and npm to be installed.
