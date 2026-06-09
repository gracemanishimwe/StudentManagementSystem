import { useEffect, useState } from "react";
import API from "../Services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load students");
    }
  };

  const addStudent = async () => {
    if (!name.trim()) return alert("Student Name is required");

    setLoading(true);
    try {
      await API.post("/students", {
        name: name.trim(),
        email: email.trim(),
        className: className.trim(),
        gender: gender
      });

      setName("");
      setEmail("");
      setClassName("");
      setGender("Male");

      await fetchStudents();
      alert("✅ Student added successfully!");
    } catch (error) {
      console.error("Add Student Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Management</h1>

      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
        
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

        <button
          onClick={addStudent}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Students ({students.length})</h2>
      
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {students.length === 0 ? (
          <p className="p-8 text-center text-gray-500">No students added yet. Add your first student above.</p>
        ) : (
          students.map((student) => (
            <div key={student._id} className="flex items-center justify-between p-6 border-b last:border-none hover:bg-gray-50">
              <div>
                <p className="font-semibold text-lg">{student.name}</p>
                <p className="text-gray-600">
                  {student.studentId} • {student.className} • {student.gender}
                </p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
              <button
                onClick={() => deleteStudent(student._id)}
                className="text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Students;