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

const students = JSON.parse(fs.readFileSync("students.json", "utf8"));

for (let i = 0; i < students.length; i++) {

    if (students[i].name.trim() !== "") {
        console.log(`TC:0${i + 1} : Name Validation : PASS`);
    } else {
        console.log(`TC:0${i + 1} : Name Validation : FAIL`);
        passed = false;
    }

    if (students[i].email.trim() !== "") {
        console.log(`TC:0${i + 1} : Email Validation : PASS`);
    } else {
        console.log(`TC:0${i + 1} : Email Validation : FAIL`);
        passed = false;
    }

    if (students[i].age > 0) {
        console.log(`TC:0${i + 1} : Age Validation : PASS`);
    } else {
        console.log(`TC:0${i + 1} : Age Validation : FAIL`);
        passed = false;
    }

    if (students[i].course.trim() !== "") {
        console.log(`TC:0${i + 1} : Course Validation : PASS`);
    } else {
        console.log(`TC:0${i + 1} : Course Validation : FAIL`);
        passed = false;
    }

}

if (passed) {
    console.log("\nAll Test Cases Passed");
} else {
    console.log("\nSome Test Cases Failed");
    process.exit(1);
}