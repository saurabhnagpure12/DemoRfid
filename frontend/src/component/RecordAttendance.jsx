import React, { useState, useEffect } from "react";
import axios from "axios";

const RecordAttendance = () => {
  const [studentId, setStudentId] = useState("");
  const [scannerId, setScannerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // State for scanners and attendance records
  const [scanners, setScanners] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Function to record attendance
  const recordAttendance = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post("/api/attendance/record", { studentId, scannerId });
      setSuccess(true);
      fetchData(); // Refresh attendance records after successful submission
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch scanners and attendance records
  const fetchScanners = async () => {
    try {
      const response = await axios.get('/api/scanners');
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch scanners');
    }
  };
  
  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('/api/attendance');
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch attendance records');
    }
  };
  
  const fetchData = async () => {
    try {
      const [scanners, attendanceRecords] = await Promise.all([
        fetchScanners(),
        fetchAttendanceRecords(),
      ]);
      setScanners(scanners);
      setAttendanceRecords(attendanceRecords);
    } catch (err) {
      setError(err);
    }
  };
  

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Record Attendance</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          recordAttendance();
        }}
      >
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Scanner ID:</label>
          <input
            type="text"
            value={scannerId}
            onChange={(e) => setScannerId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Recording..." : "Record Attendance"}
        </button>
        {error && <p>Error: {error.message}</p>}
        {success && <p>Attendance recorded successfully!</p>}
      </form>

      <h2>Scanners</h2>
      <ul>
        {scanners.map((scanner) => (
          <li key={scanner._id}>
            {scanner.name} (ID: {scanner._id})
          </li>
        ))}
      </ul>

      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Scanner ID</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.studentId}</td>
              <td>{record.scannerId}</td>
              <td>{record.status}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordAttendance;
