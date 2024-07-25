import React from 'react';
import useAddScanner from '../Hook/useAddScanner';
import useFetchScanners from '../Hook/useFetchScanners';
import './AddScanner.css';

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
    <div className="container">
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
        {addingError && <p className="error">Error: {addingError.message}</p>}
        {success && <p className="success">Scanner added successfully!</p>}
      </form>

      <div className="card">
        <div>
          <h2>Scanner List</h2>
        </div>
        <div>
          {fetchingLoading && <p>Loading scanners...</p>}
          {fetchingError && (
            <p className="error">Error: {fetchingError.message}</p>
          )}
          <ul>
            {scanners.map((scanner) => (
              <div className="scanner-item" key={scanner._id}>
                <span>(id: {scanner.scannerId})</span>
                <span>(Name: {scanner.name})</span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddScanner;
