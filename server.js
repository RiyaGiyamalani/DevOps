const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/students", (req, res) => {
    const file = path.join(__dirname, "students.json");
    const students = JSON.parse(fs.readFileSync(file, "utf8"));
    res.json(students);
});

app.post("/register", (req, res) => {
    const file = path.join(__dirname, "students.json");

    const students = JSON.parse(fs.readFileSync(file, "utf8"));

    students.push(req.body);

    fs.writeFileSync(file, JSON.stringify(students, null, 4));

    console.log("Student added:", req.body);

    res.json({ message: "Student registered" });
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on port 3001");
});