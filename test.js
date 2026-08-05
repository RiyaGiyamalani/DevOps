const fs = require("fs");

if (fs.existsSync("index.html")) {
    console.log("index.html exists");
} else {
    console.log("index.html not found");
}

if (fs.existsSync("style.css")) {
    console.log("style.css exists");
} else {
    console.log("style.css not found");
}

if (fs.existsSync("script.js")) {
    console.log("script.js exists");
} else {
    console.log("script.js not found");
}

if (fs.existsSync("students.json")) {
    console.log("students.json exists");

    const students = JSON.parse(fs.readFileSync("students.json", "utf8"));

    let passed = true;

    if (students[0].name.trim() !== "") {
        console.log("TC : Name Validation : PASS");
    } else {
        console.log("TC : Name Validation : FAIL");
        passed = false;
    }

} else {
    console.log("students.json not found");
}