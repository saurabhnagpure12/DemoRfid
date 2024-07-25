import React from 'react';
import useAddScanner from '../Hook/useAddScanner';
import useFetchScanners from '../Hook/useFetchScanners';

const AddScanner = () => {
  const {
    scannerId,
    setScannerId,
    name,
    setName,
    loading: addingLoading,
    error: addingError,
    success,
    addScanner
  } = useAddScanner();

  const {
    scanners,
    loading: fetchingLoading,
    error: fetchingError
  } = useFetchScanners();

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
        <button type="submit" disabled={addingLoading}>
          {addingLoading ? 'Adding...' : 'Add Scanner'}
        </button>
        {addingError && <p style={{ color: 'red' }}>Error: {addingError.message}</p>}
        {success && <p style={{ color: 'green' }}>Scanner added successfully!</p>}
      </form>

      <h2>Scanner List</h2>
      {fetchingLoading && <p>Loading scanners...</p>}
      {fetchingError && <p style={{ color: 'red' }}>Error: {fetchingError.message}</p>}
      <ul>
        {scanners.map((scanner) => (
          <li key={scanner._id}>
            {scanner.scannerId}: {scanner.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddScanner;
