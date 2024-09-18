import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css';

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  // Add more country codes as needed
];

export default function FormComponent({ formType }) {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Name should contain only alphabetic characters';
    }

    if (!countryCode) {
      newErrors.countryCode = 'Please select a country code';
    }

    if (!/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number should contain only numeric characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/api/submit-form', {
          formType,
          name,
          countryCode,
          phoneNumber,
        });
        console.log(response.data);
        alert('Form submitted successfully!');
        // Reset form fields
        setName('');
        setCountryCode('');
        setPhoneNumber('');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Form {formType}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="countryCode">Country Code:</label>
          <select
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select a country code</option>
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.country} ({country.code})
              </option>
            ))}
          </select>
          {errors.countryCode && <p className="error">{errors.countryCode}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}