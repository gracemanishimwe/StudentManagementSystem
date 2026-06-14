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

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setClassName("");
    setGender("Male");
    setEditingId(null);
  };

  // =========================
  // ADD STUDENT (Backend generates ID)
  // =========================
  const addStudent = async () => {
    if (!name.trim()) return alert("Student Name is required");

    setLoading(true);

    try {
      await API.post("/students", {
        name: name.trim(),
        email: email.trim(),
        className: className.trim(),
        gender,
      });

      resetForm();
      await fetchStudents();

      alert("Student added successfully!");
    } catch (error) {
      console.error("Add Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add student");
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
  // EDIT FUNCTIONS
  // =========================
  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setEmail(student.email);
    setClassName(student.className);
    setGender(student.gender);
  };

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
      alert(" Student updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Management</h1>

      {/* Form */}
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
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Class (e.g. IT Year 2)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={editingId ? updateStudent : addStudent}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Processing..." : editingId ? "Update Student" : "Add Student"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Students ({students.length})
      </h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {students.length === 0 ? (
          <p className="p-8 text-center text-gray-500">No students added yet.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left">Student ID</th>
                <th className="p-4 text-left">Full Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Class</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-mono font-semibold">{student.studentId}</td>
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-gray-600">{student.email}</td>
                  <td className="p-4">{student.className}</td>
                  <td className="p-4">{student.gender}</td>
                  <td className="p-4 text-center space-x-3">
                    <button
                      onClick={() => startEdit(student)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
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