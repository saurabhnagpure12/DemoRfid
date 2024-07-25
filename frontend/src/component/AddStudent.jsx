import React from 'react';
import useAddStudent from '../Hook/useAddStudent';
import useFetchStudents from "../Hook/useFetchStudents"; // Ensure the path is correct



const AddStudent = () => {
  const {
    studentId,
    setStudentId,
    name,
    setName,
    loading: addingLoading,
    error: addingError,
    success,
    addStudent
  } = useAddStudent();

  const {
    students,
    loading: fetchingLoading,
    error: fetchingError
  } = useFetchStudents();

  return (
    <div>
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
          {addingLoading ? 'Adding...' : 'Add Student'}
        </button>
        {addingError && <p>Error: {addingError.message}</p>}
        {success && <p>Student added successfully!</p>}
      </form>
      <h2>Student List</h2>
      {fetchingLoading && <p>Loading students...</p>}
      {fetchingError && <p>Error: {fetchingError.message}</p>}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.studentId}: {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddStudent;
