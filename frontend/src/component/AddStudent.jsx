import React from 'react';
import useAddStudent from '../Hook/useAddStudent';

const AddStudent = () => {
  const {
    studentId,
    setStudentId,
    name,
    setName,
    loading,
    error,
    success,
    addStudent
  } = useAddStudent();

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
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
        {error && <p>Error: {error.message}</p>}
        {success && <p>Student added successfully!</p>}
      </form>
    </div>
  );
};

export default AddStudent;
