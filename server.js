const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(session({
    secret: "devops-practice-secret", // fine for a class project; use an env var in real production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));
app.use(express.static(__dirname));

const USERS_FILE = path.join(__dirname, "users.json");

function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 4));
}

// Salted hash so plain-text passwords never touch the disk
function hashPassword(password, salt) {
    return crypto.scryptSync(password, salt, 64).toString("hex");
}

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

// ---- Account signup / login / welcome page ----
app.post("/api/signup", (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ error: "Name, username and password are all required" });
    }

    const users = readUsers();
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: "That username is already taken" });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(password, salt);

    users.push({ name, username, salt, passwordHash });
    writeUsers(users);

    res.json({ message: "Account created" });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user || hashPassword(password, user.salt) !== user.passwordHash) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    req.session.user = { name: user.name, username: user.username };
    res.json({ message: "Logged in", name: user.name });
});

app.get("/api/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }
    res.json(req.session.user);
});

app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});