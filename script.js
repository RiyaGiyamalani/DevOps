let students = [];

// Load existing students
fetch("students.json")
    .then(response => response.json())
    .then(data => {
        students = data;
        displayStudents();
    })
    .catch(() => {
        students = [];
    });

document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value
    };

    students.push(student);

    displayStudents();

    this.reset();

    alert("Student Registered Successfully!");
});

function displayStudents(){

    const table = document.getElementById("studentTable");
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

}