import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddStudent from "./component/AddStudent";
import AddScanner from "./component/AddScanner";
import RecordAttendance from "./component/RecordAttendance";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-student" className="navbar-link">Add Student</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-scanner" className="navbar-link">Add Scanner</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-scanner" element={<AddScanner />} />
          <Route path="/" element={<RecordAttendance />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
