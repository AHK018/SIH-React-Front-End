import React, { useState } from 'react';

const Popup = ({ onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className="popup-message">
      <div className="popup-inner">
        <h2>Enter The 10 digit PNR number</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter PNR number"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Popup;
