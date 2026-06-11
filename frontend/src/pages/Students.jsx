import { useEffect, useState } from "react";
import API from "../Services/api";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [gender, setGender] = useState("Male");

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH STUDENTS
  // =========================
  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // SAFE STUDENT ID GENERATOR
  // =========================
  const generateStudentId = () => {
    if (!students || students.length === 0) return "ST001";

    let maxNumber = 0;

    students.forEach((student) => {
      const id = student.studentId;

      if (typeof id === "string" && id.startsWith("ST")) {
        const numberPart = id.slice(2);
        const num = Number(numberPart);

        if (!Number.isNaN(num)) {
          maxNumber = Math.max(maxNumber, num);
        }
      }
    });

    return "ST" + String(maxNumber + 1).padStart(3, "0");
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setName("");
    setEmail("");
    setClassName("");
    setGender("Male");
    setEditingId(null);
  };

  // =========================
  // ADD STUDENT
  // =========================
  const addStudent = async () => {
    if (!name.trim()) return alert("Student Name is required");

    setLoading(true);
    try {
      await fetchStudents(); // ensure latest data

      const newStudentId = generateStudentId();

      await API.post("/students", {
        studentId: newStudentId,
        name: name.trim(),
        email: email.trim(),
        className: className.trim(),
        gender,
      });

      resetForm();
      await fetchStudents();

      alert("Student added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE STUDENT
  // =========================
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await API.delete(`/students/${id}`);
      await fetchStudents();
      alert("Student deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

  // =========================
  // START EDIT
  // =========================
  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setEmail(student.email);
    setClassName(student.className);
    setGender(student.gender);
  };

  // =========================
  // UPDATE STUDENT
  // =========================
  const updateStudent = async () => {
    if (!editingId) return;

    setLoading(true);
    try {
      await API.put(`/students/${editingId}`, {
        name: name.trim(),
        email: email.trim(),
        className: className.trim(),
        gender,
      });

      resetForm();
      await fetchStudents();

      alert("Student updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 border">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Student" : "Add New Student"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          onClick={editingId ? updateStudent : addStudent}
          disabled={loading}
          className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Processing..."
            : editingId
            ? "Update Student"
            : "Add Student"}
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <h2 className="text-2xl font-semibold mb-4">
        All Students ({students.length})
      </h2>

      <div className="bg-white border rounded-2xl shadow overflow-hidden">
        {students.length === 0 ? (
          <p className="p-6 text-center">No students found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="p-3">{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.className}</td>
                  <td>{student.gender}</td>

                  <td className="space-x-2 p-3">
                    <button
                      onClick={() => startEdit(student)}
                      className="text-blue-600 px-3 py-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="text-red-600 px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Students;