import React, { useState, useEffect , useRef } from 'react';

const MultiSelectField = () => {
  const initialOptions = [
    'B1.01','B2.101','B2.102','B2.107','B2.108',
    'B2.109','B2.110','B2.111','B2.112','B2.201',
    'B2.202','B2.207','B2.208','B2.209','B2.210',
    'B2.211','B2.212','B2.301','B2.302','B2.307',
    'B2.308','B2.309','B2.310','B2.311','B2.312',
    'B3.102','B3.103','B3.105','B3.106','B3.107',
    'B3.108','B3.202','B3.203','B3.205','B3.206',
    'B3.207','B3.208','B3.302','B3.305','B4.101',
    'B4.102','B4.106','B4.107','B4.108','B4.109',
    'B4.201','B4.202','B4.206','B4.207','B4.208',
    'B4.209','B4.210','B4.211','B4.212','B4.213',
    'B4.301','B4.302','B4.307','B4.308','B6.005[B1.MATS]',
    'B6.101','B6.105','B6.106','B6.201','B6.206',
    'B6.209','B6.301','B6.311','B7.102','B7.104',
    'B7.108','B7.110','B7.111','B7.201','B7.301',
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
    'C7.220','C7.305',"D2.101","D2.102-MD","D2.105-MD",
    "D2.201","D2.201-GD","D2.202-GD","D2.205-GD","D2.301-PD",
  "D2.302-PD","D2.305-PD","D4.01","D4.101","D4.103","D4.104","D4.105","D4.109","D4.110","D4.111",
  "D4.117","D4.201","D4.203","D4.204","D4.205","D4.209","D4.210","D4.211","D4.212",
  "D4.302","D4.303","D4.305","D4.306","D4.309","D4.310","D4.311","D4.312"  ,"D4.317" ,"D5.001",
  "D5.101-MD","D5.105-MD","D5.201","D5.201-GD","D5.202-GD","D5.205-GD","D5.301-PD","D5.302-PD","D5.305-PD",
  "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13","H14","H15","H16","H17","H18","H19","H20"];
  const [availableOptions, setAvailableOptions] = useState(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleDeleteOption = (optionToDelete) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToDelete));
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
            onKeyDown={handleKeyDown}
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
            placeholder="Search..."
          />

          <select
            multiple
            ref={dropdownRef}
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
            {option}
            <button onClick={() => handleDeleteOption(option)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectField;