let editId = null;

function loadStudents() {
    fetch("/students")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("tableBody");
            table.innerHTML = "";

            data.forEach(s => {
                table.innerHTML += `
                <tr>
                    <td>${s.name}</td>
                    <td>${s.roll}</td>
                    <td>${s.dob}</td>
                    <td>${s.phone}</td>
                    <td>${s.email}</td>
                    <td>
                        <button class="edit" onclick='editStudent(${JSON.stringify(s)})'>Edit</button>
                        <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
                    </td>
                </tr>`;
            });
        });
}

function saveStudent() {
    const student = {
        name: document.getElementById("name").value,
        roll: document.getElementById("roll").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
    };

    if (!student.name || !student.roll) {
        alert("Name and Roll Number are required");
        return;
    }

    const url = editId ? `/update/${editId}` : "/add";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    }).then(() => {
        editId = null;
        document.querySelectorAll("input").forEach(i => i.value = "");
        loadStudents();
    });
}

function editStudent(s) {
    editId = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("roll").value = s.roll;
    document.getElementById("dob").value = s.dob;
    document.getElementById("phone").value = s.phone;
    document.getElementById("email").value = s.email;
}

function deleteStudent(id) {
    fetch(`/delete/${id}`, { method: "DELETE" })
        .then(() => loadStudents());
}

loadStudents();
