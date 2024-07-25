import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchScanners = () => {
  const [scanners, setScanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScanners = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/scanners');
        setScanners(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScanners();
  }, []);

  return {
    scanners,
    loading,
    error
  };
};

export default useFetchScanners;
