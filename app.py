from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

students = []
next_id = 1

@app.route("/")
def index():
    return render_template("index.html")

# READ
@app.route("/students")
def get_students():
    return jsonify(students)

# CREATE
@app.route("/add", methods=["POST"])
def add_student():
    global next_id
    data = request.json
    student = {
        "id": next_id,
        "name": data["name"],
        "roll": data["roll"],
        "dob": data["dob"],
        "phone": data["phone"],
        "email": data["email"]
    }
    students.append(student)
    next_id += 1
    return jsonify({"message": "Student Added"})

# UPDATE
@app.route("/update/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.json
    for s in students:
        if s["id"] == id:
            s["name"] = data["name"]
            s["roll"] = data["roll"]
            s["dob"] = data["dob"]
            s["phone"] = data["phone"]
            s["email"] = data["email"]
            break
    return jsonify({"message": "Student Updated"})

# DELETE
@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_student(id):
    global students
    students = [s for s in students if s["id"] != id]
    return jsonify({"message": "Student Deleted"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
