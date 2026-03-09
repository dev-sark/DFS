-- Initial Schema for Divine Favor HMS

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    folder_number VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    genotype VARCHAR(10),
    telephone VARCHAR(50),
    email VARCHAR(255),
    house_number VARCHAR(100),
    street_name VARCHAR(255),
    landmark VARCHAR(255),
    city VARCHAR(100),
    occupation VARCHAR(255),
    workplace VARCHAR(255),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    has_insurance BOOLEAN DEFAULT FALSE,
    insurance_type VARCHAR(100),
    insurance_provider VARCHAR(255),
    insurance_number VARCHAR(255)
);

CREATE TABLE patient_allergies (
    patient_id INTEGER REFERENCES patients(id),
    allergy VARCHAR(255)
);

CREATE TABLE patient_chronic_conditions (
    patient_id INTEGER REFERENCES patients(id),
    condition VARCHAR(255)
);

CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) NOT NULL,
    visit_date TIMESTAMP,
    symptoms TEXT,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    priority VARCHAR(50),
    doctor_notified BOOLEAN DEFAULT FALSE
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) NOT NULL,
    visit_date TIMESTAMP,
    status VARCHAR(50),
    temperature DOUBLE PRECISION,
    blood_pressure VARCHAR(50),
    heart_rate INTEGER,
    weight DOUBLE PRECISION,
    urgent BOOLEAN DEFAULT FALSE,
    triage_notes TEXT,
    primary_diagnosis VARCHAR(255)
);

CREATE TABLE lab_requests (
    id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES visits(id) NOT NULL,
    test_name VARCHAR(255),
    request_date TIMESTAMP,
    result_date TIMESTAMP,
    results TEXT,
    status VARCHAR(50),
    requested_by VARCHAR(255),
    performed_by VARCHAR(255)
);

CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES visits(id) NOT NULL,
    medication_name VARCHAR(255),
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration VARCHAR(100),
    notes TEXT,
    dispensed BOOLEAN DEFAULT FALSE
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES visits(id) NOT NULL,
    amount DECIMAL(19, 2),
    item_type VARCHAR(100),
    payment_status VARCHAR(50) DEFAULT 'UNPAID',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    role VARCHAR(50),
    action VARCHAR(255),
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
