const fs = require("fs");

if (fs.existsSync("index.html")) {
    console.log(" index.html exists");
} else {
    console.log(" index.html not found");
    process.exit(1);
}

if (fs.existsSync("style.css")) {
    console.log(" style.css exists");
} else {
    console.log(" style.css not found");
    process.exit(1);
}

if (fs.existsSync("script.js")) {
    console.log(" script.js exists");
} else {
    console.log("script.js not found");
    process.exit(1);
}

if (fs.existsSync("students.json")) {
    console.log(" students.json exists");
} else {
    console.log(" students.json not found");
    process.exit(1);
}