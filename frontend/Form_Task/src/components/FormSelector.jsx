import React from 'react';
import './FormSelector.css';

export default function FormSelector({ onSelectForm }) {
  return (
    <div className="form-selector">
      <h2>Select a Form</h2>
      <div className="button-container">
        <button className="button button-primary" onClick={() => onSelectForm('A')}>
          Form A
        </button>
        <button className="button button-secondary" onClick={() => onSelectForm('B')}>
          Form B
        </button>
      </div>
    </div>
  );
}