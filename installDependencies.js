/**
 * This file automates the installation of required dependencies for the project.
 * 
 * Usage:
 * 1. Run this file using Node.js: `node installDependencies.js`.
 * 2. It installs the `mongodb` package required for MongoDB operations.
 * 
 * Example:
 * node installDependencies.js
 */

const { exec } = require('child_process');

console.log("Installing required dependencies...");

exec('npm install mongodb', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error installing dependencies: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
    }
    console.log("Dependencies installed successfully:");
    console.log(stdout);
});
