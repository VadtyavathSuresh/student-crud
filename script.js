let editIndex = null;

function loadStudents() {
    fetch("/students")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("tableBody");
            table.innerHTML = "";

            data.forEach((s, i) => {
                table.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${s.name}</td>
                    <td>${s.roll}</td>
                    <td>${s.dob}</td>
                    <td>${s.phone}</td>
                    <td>${s.email}</td>
                    <td>
                        <button onclick="editStudent(${i})">Edit</button>
                        <button onclick="deleteStudent(${i})">Delete</button>
                    </td>
                </tr>`;
            });
        });
}

function saveStudent() {
    const student = {
        name: name.value,
        roll: roll.value,
        dob: dob.value,
        phone: phone.value,
        email: email.value
    };

    const url = editIndex === null ? "/add" : `/update/${editIndex}`;
    const method = editIndex === null ? "POST" : "PUT";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    }).then(() => {
        clearForm();
        editIndex = null;
        loadStudents();   
    });
}

function editStudent(index) {
    fetch("/students")
        .then(res => res.json())
        .then(data => {
            const s = data[index];
            name.value = s.name;
            roll.value = s.roll;
            dob.value = s.dob;
            phone.value = s.phone;
            email.value = s.email;
            editIndex = index;
        });
}

function deleteStudent(index) {
    fetch(`/delete/${index}`, { method: "DELETE" })
        .then(() => loadStudents());
}

function clearForm() {
    name.value = "";
    roll.value = "";
    dob.value = "";
    phone.value = "";
    email.value = "";
}

loadStudents();
