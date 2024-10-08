CREATE DATABASE Users;

USE Users;

CREATE TABLE form_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_type ENUM('A', 'B') NOT NULL,
  name VARCHAR(255) NOT NULL,
  country_code VARCHAR(10) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);