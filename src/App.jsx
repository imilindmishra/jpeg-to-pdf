import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  // Handle file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to send file to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a JPEG file.');
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Send the POST request to the backend endpoint
      const response = await fetch('http://localhost:3001/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      // Receive the PDF blob from the response
      const blob = await response.blob();

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Optionally reset the file input after conversion
      setFile(null);
    } catch (error) {
      console.error('Error during conversion:', error);
      alert('An error occurred during conversion.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">JPEG to PDF Converter</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="upload-label">
          {file ? file.name : "Click to select a JPEG file"}
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            className="upload-input"
          />
        </label>
        {file && (
          <button type="submit" className="convert-btn">
            Convert
          </button>
        )}
      </form>
    </div>
  );
}

export default App;
