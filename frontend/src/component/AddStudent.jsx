import React from "react";
import useAddStudent from "../Hook/useAddStudent";
import useFetchStudents from "../Hook/useFetchStudents";
import "./AddStudent.css";

const AddStudent = () => {
  const {
    studentId,
    setStudentId,
    name,
    setName,
    loading: addingLoading,
    error: addingError,
    success,
    addStudent,
  } = useAddStudent();

  const {
    students,
    loading: fetchingLoading,
    error: fetchingError,
  } = useFetchStudents();

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStudent();
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
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={addingLoading}>
          {addingLoading ? "Adding..." : "Add Student"}
        </button>
        {addingError && <p className="error">Error: {addingError.message}</p>}
        {success && <p className="success">Student added successfully!</p>}
      </form>

      <div className="card">
        <div>
          <h2>Student List</h2>
        </div>
        <div>
          {fetchingLoading && <p>Loading students...</p>}
          {fetchingError && (
            <p className="error">Error: {fetchingError.message}</p>
          )}
          <ul>
            {students.map((student) => (
              <div className="student-item" key={student._id}>
                <span>(Name: {student.name}) </span>
                <span> (ID: {student.studentId})</span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
