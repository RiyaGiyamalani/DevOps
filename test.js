const fs = require("fs");

let passed = true;

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

if (students[0].name.trim() != "") {
    console.log("TC:01 : Name Validation : PASS");
} else {
    console.log("TC:01 : Name Validation : FAIL");
    passed = false;
}

if (students[0].email.trim() != "") {
    console.log("TC:02 : Email Validation : PASS");
} else {
    console.log("TC:02 : Email Validation : FAIL");
    passed = false;
}

if (students[0].age > 0) {
    console.log("TC:03 : Age Validation : PASS");
} else {
    console.log("TC:03 : Age Validation : FAIL");
    passed = false;
}

if (students[0].course.trim() != "") {
    console.log("TC:04 : Course Validation : PASS");
} else {
    console.log("TC:04 : Course Validation : FAIL");
    passed = false;
}

if (passed) {
    console.log("All Test Cases Passed");
} else {
    console.log("Some Test Cases Failed");
    process.exit(1);
}