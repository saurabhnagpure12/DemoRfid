import React from 'react';
import useAddScanner from '../Hook/useAddScanner'; // Ensure path is correct

const AddScanner = () => {
  const {
    scannerId,
    setScannerId,
    name,
    setName,
    loading,
    error,
    success,
    addScanner
  } = useAddScanner();

  return (
    <div>
      <h2>Add Scanner</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addScanner();
        }}
      >
        <div>
          <label>Scanner ID:</label>
          <input
            type="text"
            value={scannerId}
            onChange={(e) => setScannerId(e.target.value)}
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
          {loading ? 'Adding...' : 'Add Scanner'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        {success && <p style={{ color: 'green' }}>Scanner added successfully!</p>}
      </form>
    </div>
  );
};

export default AddScanner;
