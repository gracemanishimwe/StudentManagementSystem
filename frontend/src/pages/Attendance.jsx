import { useEffect, useState } from "react";
import API from "../Services/api";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  const fetchAttendance = async () => {
    const res = await API.get("/attendance");
    setAttendance(res.data);
  };

  const markAttendance = async (studentId, studentName, status) => {
    try {
      await API.post("/attendance", {
        studentId,
        studentName,
        date: today,
        status
      });
      alert(`✅ ${studentName} marked as ${status}`);
      fetchAttendance();
    } catch (error) {
      alert("Error marking attendance");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const getTodayStatus = (studentId) => {
    return attendance.find(a => a.studentId === studentId && a.date === today);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Mark Attendance - <span className="text-blue-600">{today}</span>
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Student ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Class</th>
              <th className="px-6 py-4 text-left">Gender</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => {
              const record = getTodayStatus(student._id);
              return (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono">{student.studentId}</td>
                  <td className="px-6 py-4 font-medium">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.className}</td>
                  <td className="px-6 py-4">{student.gender}</td>
                  
                  <td className="px-6 py-4 text-center">
                    {record ? (
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium
                        ${record.status === "Present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {record.status}
                      </span>
                    ) : (
                      <span className="text-gray-400">Not Marked</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => markAttendance(student._id, student.name, "Present")}
                        className={`px-5 py-2 rounded-lg font-medium ${record?.status === "Present" ? "bg-green-600 text-white" : "bg-green-100 hover:bg-green-200 text-green-700"}`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(student._id, student.name, "Absent")}
                        className={`px-5 py-2 rounded-lg font-medium ${record?.status === "Absent" ? "bg-red-600 text-white" : "bg-red-100 hover:bg-red-200 text-red-700"}`}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;