import { useState } from 'react';
import axios from 'axios';

const useAddScanner = () => {
  const [scannerId, setScannerId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addScanner = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('/api/scanners/add', { scannerId, name });
      setSuccess(true);
      setScannerId('');
      setName('');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    scannerId,
    setScannerId,
    name,
    setName,
    loading,
    error,
    success,
    addScanner
  };
};

export default useAddScanner;
