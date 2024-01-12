import React from 'react';
import './Model.css'; // Import your CSS file for modal styles

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          Error
          <span className="close-btn" onClick={onClose}>×</span>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
