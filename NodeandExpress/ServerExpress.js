const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the current directory (including your HTML, CSS, JS, and images)
app.use(express.static(path.join(__dirname)));

// Start the server and log that it's running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
