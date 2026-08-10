const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

function loadStudents() {
    fetch("/students")
        .then(res => res.json())
        .then(students => {
            table.innerHTML = "";

            students.forEach(student => {
                table.innerHTML += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.age}</td>
                        <td>${student.course}</td>
                    </tr>
                `;
            });
        });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(() => {
        form.reset();
        loadStudents();
    });
});

loadStudents();