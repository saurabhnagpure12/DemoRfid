import React from 'react';
import { Link, Route, Routes } from 'react-router-dom'; // Ensure Link is imported
import AddStudent from './component/AddStudent';
import AddScanner from './component/AddScanner';
import RecordAttendance from './component/RecordAttendance';

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-student">Add Student</Link>
          </li>
          <li>
            <Link to="/add-scanner">Add Scanner</Link>
          </li>
          <li>
            <Link to="/record-attendance">Record Attendance</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Attendance System</h1>} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-scanner" element={<AddScanner />} />
        <Route path="/record-attendance" element={<RecordAttendance />} />
      </Routes>
    </div>
  );
};

export default App;
