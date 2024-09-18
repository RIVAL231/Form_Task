import React, { useState } from 'react';
import Header from './components/Header';
import FormSelector from './components/FormSelector';
import FormComponent from './components/FormComponent';
import './index.css';
import './App.css';

export default function App() {
  const [formType, setFormType] = useState(null);

  return (
    <div className="container">
      <Header title="Dynamic Form Application" />
      <div className="card">
        <FormSelector onSelectForm={setFormType} />
        {formType && <FormComponent formType={formType} />}
      </div>
    </div>
  );
}