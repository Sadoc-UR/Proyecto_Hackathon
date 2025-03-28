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
