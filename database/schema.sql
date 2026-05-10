-- Sheger Health Connect Database Schema

CREATE DATABASE IF NOT EXISTS sheger_health;
USE sheger_health;

-- Users Table (Base for all roles)
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Patient', 'Doctor', 'Receptionist', 'Admin') NOT NULL DEFAULT 'Patient',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Patients Profile
CREATE TABLE Patients (
    id INT PRIMARY KEY,
    date_of_birth DATE,
    gender ENUM('Male', 'Female'),
    address TEXT,
    blood_type VARCHAR(5),
    emergency_contact VARCHAR(100),
    FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Doctors Profile
CREATE TABLE Doctors (
    id INT PRIMARY KEY,
    department VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    experience_years INT,
    availability_schedule JSON,
    FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Services / Departments
CREATE TABLE Services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price_etb DECIMAL(10,2) NOT NULL,
    duration_mins INT NOT NULL
);

-- Appointments
CREATE TABLE Appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Patients(id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(id),
    FOREIGN KEY (service_id) REFERENCES Services(id)
);

-- Medical Records
CREATE TABLE MedicalRecords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT,
    diagnosis TEXT NOT NULL,
    prescriptions TEXT,
    allergies TEXT,
    lab_results TEXT,
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Patients(id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(id),
    FOREIGN KEY (appointment_id) REFERENCES Appointments(id)
);
