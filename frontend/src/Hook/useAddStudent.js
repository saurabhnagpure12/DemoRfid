import { useState } from 'react';
import axios from 'axios';

const useAddStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addStudent = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('/api/students/add', { studentId, name });
      setSuccess(true);
      setStudentId('');
      setName('');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    studentId,
    setStudentId,
    name,
    setName,
    loading,
    error,
    success,
    addStudent
  };
};

export default useAddStudent;
