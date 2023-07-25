import React, { useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelectField from './options';
// import './App.css';
function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3,setFile3] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error,setError] = useState(false);
  const navigate = useNavigate();


  const initialOptions = [
    
    'C2.101','C2.102','C2.105','C2.107','C2.108',
    'C2.112','C2.201','C2.202','C2.205','C2.206',
    'C2.207','C2.208','C2.209','C2.211','C2.212',
    'C2.301','C2.302','C2.305','C2.306','C2.308',
    'C2.309','C2.311','C2.312','C3.101','C3.103',
    'C3.104','C3.120','C3.201','C3.203','C3.209',
    'C3.211','C3.303','C3.309','C3.328','C5.101',
    'C5.102','C5.104','C5.105','C5.106','C5.108',
    'C5.112','C5.201','C5.202','C5.203','C5.204',
    'C5.205','C5.206','C5.208','C5.211','C5.212',
    'C5.301','C5.302','C5.304','C5.305','C5.BASE',
    'C6.105','C6.206','C6.207','C6.209','C6.304',
    'C7.101CADLab','C7.119CADLab','C7.201','C7.203','C7.217',
    'C7.220','C7.305'];
  const [availableOptions, setAvailableOptions] = useState(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [counter , setCounter] = useState(1);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    if (counter === 5) {
      setCounter(0);
    }
    else {
        setCounter(counter + 1);
    }
  };

  const handleDeleteOption = (optionToDelete) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToDelete));
    if (counter > 1) {
      setCounter(counter -1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const previousIndex = dropdownRef.current.selectedIndex - 1;
      if (previousIndex >= 0) {
        dropdownRef.current.selectedIndex = previousIndex;
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = dropdownRef.current.selectedIndex + 1;
      if (nextIndex < dropdownRef.current.options.length) {
        dropdownRef.current.selectedIndex = nextIndex;
      }
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setAvailableOptions(initialOptions.filter((option) => !selectedOptions.includes(option)));
    } else {
      const filteredOptions = initialOptions.filter((option) =>
        option.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setAvailableOptions(filteredOptions.filter((option) => !selectedOptions.includes(option)));
    }
  }, [searchTerm, selectedOptions, initialOptions]);


  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };
  const handleSelectChange = (event) => {}

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };
  const handleFile3Change = (event) => {
    setFile3(event.target.files[0]);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOptions.length === 0){
      setError(true);
      return;
    }
    // Do something with the uploaded files and dates
    console.log(file1, file2, startDate, endDate);
      fetch('/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({file1, file2, file3, startDate, endDate, selectedOptions}),
      }).then((res) => {
        console.log(res);
        console.log('New data added');

      })

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
        <label htmlFor="file3">Upload GUC Supervisor CSV:  </label>
        <input type="file" id="file3" accept='.csv' required onChange={handleFile3Change} />
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
      
     {/* adjust the drop down menu to allow more than one option */}
      <div>
      <div style={{ display: 'inline-block', position: 'relative' }}>
      <button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? 'Hide Rooms' : 'Choose Rooms'}
      </button>

      {showOptions && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: 0,
            width: '200px',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            zIndex: 1,
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
            placeholder="Search..."
          />

          <select
            multiple
            ref={dropdownRef}
            required
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
            onKeyDown={handleKeyDown}
          >
            {availableOptions.map((option) => (
              <option
                key={option}
                value={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        {selectedOptions.map((option) => (
          <span
            key={option}
            style={{ backgroundColor: '#f0f0f0', padding: '5px', margin: '5px', borderRadius: '5px' }}
          >

            
                {option    }
            
            
            {/* {counter === 5 ? (
        <>
          <br />
          
          
        </>
      ) : null} */}
            <button onClick={() => handleDeleteOption(option)}>x</button>
            
            
          </span>
          
        ))}
      </div>
    </div>
      </div>
      
      <br />

      
    
      
      <button type="submit">Submit</button>
      <br />
      <br />
      {error && <p>Please choose the rooms</p>}
    </form>
    </div>
    
  );
}

export default App;
