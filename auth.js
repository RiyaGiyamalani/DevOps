const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");
const messageEl = document.getElementById("message");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, username, password })
        })
        .then(res => res.json().then(data => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (status === 200) {
                window.location.href = "login.html";
            } else {
                messageEl.textContent = data.error;
            }
        });
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json().then(data => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (status === 200) {
                window.location.href = "welcome.html";
            } else {
                messageEl.textContent = data.error;
            }
        });
    });
}

if (welcomeMessage) {
    fetch("/api/me")
        .then(res => {
            if (!res.ok) throw new Error("not logged in");
            return res.json();
        })
        .then(data => {
            welcomeMessage.textContent = `Welcome, ${data.name}!`;
        })
        .catch(() => {
            window.location.href = "login.html";
        });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        fetch("/api/logout", { method: "POST" })
            .then(() => window.location.href = "login.html");
    });
}
