import React, { useState, useEffect } from 'react';

const MultiSelectField = () => {
  const initialOptions = ['B1.01','B2.101','B2.102','B2.107','B2.108','B2.109'];
  const [availableOptions, setAvailableOptions] = useState(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleDeleteOption = (optionToDelete) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToDelete));
  };

  useEffect(() => {
    const filteredOptions = initialOptions.filter((option) =>
      option.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setAvailableOptions(filteredOptions);
  }, [searchTerm]);

  useEffect(() => {
    const updatedAvailableOptions = initialOptions.filter(
      (option) => !selectedOptions.includes(option)
    );
    setAvailableOptions(updatedAvailableOptions);
  }, [selectedOptions]);

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? 'Hide Rooms' : 'Show Rooms'}
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
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
            placeholder="Search..."
          />

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {availableOptions.map((option) => (
              <li
                key={option}
                style={{ cursor: 'pointer', padding: '5px' }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        {selectedOptions.map((option) => (
          <span
            key={option}
            style={{ backgroundColor: '#f0f0f0', padding: '5px', margin: '5px', borderRadius: '5px' }}
          >
            {option}
            <button onClick={() => handleDeleteOption(option)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectField;
