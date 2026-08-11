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

if (fs.existsSync("server.js")) {
    console.log("server.js exists");
} else {
    console.log("server.js not found");
    passed = false;
}

if (fs.existsSync("students.json")) {
    console.log("students.json exists");
} else {
    console.log("students.json not found");
    passed = false;
}

const students = JSON.parse(fs.readFileSync("students.json", "utf8"));

if (students.length > 0) {
    students.forEach((student, index) => {
        console.log(`\nStudent ${index + 1}:`);

        if (student.name && student.name.trim() != "") {
            console.log("Name Validation : PASS");
        } else {
            console.log("Name Validation : FAIL");
            passed = false;
        }

        if (student.email && student.email.trim() != "") {
            console.log("Email Validation : PASS");
        } else {
            console.log("Email Validation : FAIL");
            passed = false;
        }

        if (student.age >= 18) {
            console.log("Age Validation : PASS");
        } else {
            console.log("Age Validation : FAIL");
            passed = false;
        }

        if (student.course && student.course.trim() != "") {
            console.log("Course Validation : PASS");
        } else {
            console.log("Course Validation : FAIL");
            passed = false;
        }
    });
} else {
    console.log("No students registered");
    passed = false;
}

if (passed) {
    console.log("\nAll Test Cases Passed");
} else {
    console.log("\nSome Test Cases Failed");
    process.exit(1);
}