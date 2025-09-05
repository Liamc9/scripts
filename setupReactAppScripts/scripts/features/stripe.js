// features/stripe.js
const fs = require("fs");
const path = require("path");
const { executeCommand } = require("../utils");

// Get the project directory from command-line arguments
const appDirectory = process.argv[2];
if (!appDirectory) {
  console.error("Please provide the path to your React app directory.");
  process.exit(1);
}

// Define src folder path
const srcDir = path.join(appDirectory, "src");

(async function addStripeIntegration() {
  console.log("\n--- Adding Stripe Integration ---");

  // Install Stripe packages
  executeCommand(
    "pnpm add @stripe/react-stripe-js @stripe/stripe-js",
    { cwd: appDirectory }
  );

  // Create StripeProvider component
  const providerPath = path.join(srcDir, "stripeProvider.jsx");
  const providerContent = `
// src/stripeProvider.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeProvider;
  `.trim();

  fs.writeFileSync(providerPath, providerContent);
  console.log(`Created: ${providerPath}`);

  console.log("✅ Stripe integration added!");
})();
