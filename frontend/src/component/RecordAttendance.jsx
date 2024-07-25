import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchStudents from "../Hook/useFetchStudents"; // Ensure the path is correct
import "./RecordAttendance.css";
const RecordAttendance = () => {
  const [studentId, setStudentId] = useState("");
  const [scannerId, setScannerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // State for scanners and attendance records
  const [scanners, setScanners] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch students using custom hook
  const {
    students,
    loading: studentLoading,
    error: studentError,
  } = useFetchStudents();

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
      const response = await axios.get("/api/scanners");
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch scanners");
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get("/api/attendance");
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch attendance records");
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
      setDataLoaded(true); // Set dataLoaded to true once data is fetched and mapped
    } catch (err) {
      setError(err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to get student name by ID
  const getStudentNameById = (id) => {
    const student = students.find((student) => student.studentId === id);
    return student ? student.name : "Unknown Student";
  };

  // Function to get scanner name by ID
  const getScannerNameById = (id) => {
    const scanner = scanners.find((scanner) => scanner.scannerId === id);
    return scanner ? scanner.name : "Unknown Scanner";
  };

  if (!dataLoaded) {
    return <p>Loading data...</p>; // Show loading message while data is being fetched and processed
  }

  return (
    <div>
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
</div><div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Scanner ID</th>
            <th>Scanner Name</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.studentId}</td>
              <td>{getStudentNameById(record.studentId)}</td>
              <td>{record.scannerId}</td>
              <td>{getScannerNameById(record.scannerId)}</td>
              <td>{record.status}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="row">
        <div className="column">
          <h2>Scanners</h2>
          <ul>
            {scanners.map((scanner) => (
              <li key={scanner.scannerId}>
                {scanner.name} (ID: {scanner.scannerId})
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Students</h2>
          {studentLoading && <p>Loading students...</p>}
          {studentError && (
            <p style={{ color: "red" }}>Error: {studentError.message}</p>
          )}
          <ul>
            {students.map((student) => (
              <li key={student.studentId}>
                {student.name} (ID: {student.studentId})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecordAttendance;
