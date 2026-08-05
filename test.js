const fs = require("fs");

let passed = true;

// Check if required files exist
if (fs.existsSync("index.html")) {
    console.log("index.html exists");
} else {
    console.log("index.html not found");
    passed = false;
}

if (fs.existsSync("style.css")) {
    console.log("style.css exists");
} else {
    console.log("style.css not found");
    passed = false;
}

if (fs.existsSync("script.js")) {
    console.log("script.js exists");
} else {
    console.log("script.js not found");
    passed = false;
}

if (fs.existsSync("students.json")) {
    console.log("students.json exists");
} else {
    console.log("students.json not found");
    passed = false;
}
