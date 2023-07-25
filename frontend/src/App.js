import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './App.css';
function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Do something with the uploaded files and dates
    console.log(file1, file2, startDate, endDate);
    navigate('/about');
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file1">Upload Student CSV:  </label>
        <input type="file" id="file1" accept='.csv' required onChange={handleFile1Change} />
      </div>
      <br />
      <div>
        <label htmlFor="file2">Upload Examiner CSV:  </label>
        <input type="file" id="file2" accept='.csv' required onChange={handleFile2Change} />
      </div>
      <br />
      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input type="date" id="startDate" value={startDate} required onChange={handleStartDateChange} />
      </div>
      <br />
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input type="date" id="endDate" value={endDate} required onChange={handleEndDateChange} />
      </div>
      <br />
      
      
      <button type="submit">Submit</button>
      <br />
      <br />
      {isLoading && <p>Loading...</p>}
    </form>
    </div>
    
  );
}

export default App;
