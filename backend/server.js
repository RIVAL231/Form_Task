const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'Users'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// API endpoint to submit form data
app.post('/api/submit-form', (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;
  
  const query = 'INSERT INTO form_submissions (form_type, name, country_code, phone_number) VALUES (?, ?, ?, ?)';
  db.query(query, [formType, name, countryCode, phoneNumber], (err, result) => {
    if (err) {
      console.error('Error submitting form:', err);
      res.status(500).json({ error: 'An error occurred while submitting the form' });
      return;
    }
    res.status(200).json({ message: 'Form submitted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});