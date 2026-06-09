import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/students`).then(res => setStudents(res.data));
    axios.get(`${API_BASE}/attendance`).then(res => setAttendance(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <p className="text-gray-500">Total Students</p>
          <p className="text-6xl font-bold mt-4">{students.length}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <p className="text-gray-500">Attendance Records</p>
          <p className="text-6xl font-bold text-green-600 mt-4">{attendance.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;