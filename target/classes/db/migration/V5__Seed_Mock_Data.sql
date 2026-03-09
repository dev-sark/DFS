-- V5: Massive Mock Data Seeding for Presentation & Analytics
-- Generates patients, visits, medical records, prescripts, lab requests, invoices, and audit logs.

-- 1. Patients
INSERT INTO patients (id, folder_number, full_name, date_of_birth, gender, blood_group, genotype, telephone, email, city, occupation, has_insurance) VALUES
(101, 'DFH-2026-001', 'Kwame Nkrumah', '1980-05-12', 'Male', 'O+', 'AA', '0201234567', 'kwame@example.com', 'Accra', 'Teacher', false),
(102, 'DFH-2026-002', 'Akua Mansa', '1992-08-24', 'Female', 'A+', 'AS', '0249876543', 'akua.m@example.com', 'Kumasi', 'Banker', true),
(103, 'DFH-2026-003', 'John Doe', '1975-11-03', 'Male', 'B-', 'AA', '0275558888', 'jdoe@gmail.com', 'Takoradi', 'Engineer', true),
(104, 'DFH-2026-004', 'Mary Jane', '2001-02-14', 'Female', 'O-', 'SS', '0504443333', 'mjane21@yahoo.com', 'Cape Coast', 'Student', false),
(105, 'DFH-2026-005', 'Kofi Annan', '1960-12-30', 'Male', 'AB+', 'AA', '0551112222', 'k.annan@diplomat.com', 'Accra', 'Diplomat', true);

-- 2. Visits (Spanning the last 30 days to populate the Analytics Volume charts)
-- We need primary_diagnosis to populate the Disease Prevalence chart
INSERT INTO visits (id, patient_id, visit_date, status, temperature, blood_pressure, heart_rate, weight, urgent, triage_notes, primary_diagnosis) VALUES
(201, 101, CURRENT_DATE - INTERVAL '28 days', 'COMPLETED', 38.5, '120/80', 88, 75.0, true, 'High fever, suspects malaria', 'Malaria'),
(202, 102, CURRENT_DATE - INTERVAL '25 days', 'COMPLETED', 36.8, '110/70', 72, 62.0, false, 'Routine checkup', 'Hypertension'),
(203, 103, CURRENT_DATE - INTERVAL '20 days', 'COMPLETED', 39.0, '130/85', 92, 85.0, true, 'Severe headache, fatigue', 'Typhoid Fever'),
(204, 104, CURRENT_DATE - INTERVAL '15 days', 'COMPLETED', 37.2, '115/75', 80, 55.0, false, 'Joint pain', 'Sickle Cell Crisis'),
(205, 101, CURRENT_DATE - INTERVAL '10 days', 'COMPLETED', 36.5, '120/80', 75, 74.5, false, 'Follow up for malaria', 'Malaria'),
(206, 105, CURRENT_DATE - INTERVAL '5 days', 'COMPLETED', 37.0, '140/90', 85, 90.0, true, 'Chest pain, shortness of breath', 'Hypertension'),
(207, 102, CURRENT_DATE - INTERVAL '2 days', 'WAITING_FOR_PHARMACY', 37.1, '112/72', 74, 62.5, false, 'Mild cough and cold', 'Upper Respiratory Infection'),
(208, 104, CURRENT_DATE - INTERVAL '1 days', 'WAITING_FOR_LAB', 38.0, '125/80', 88, 54.0, true, 'Fever returning', 'Malaria'),
(209, 103, CURRENT_DATE, 'WAITING_FOR_VITALS', NULL, NULL, NULL, NULL, false, NULL, NULL),
(210, 105, CURRENT_DATE, 'CONSULTATION', 36.9, '135/85', 80, 89.5, false, 'Regular BP check', NULL);

-- 3. Medical Records (History view for Doctors)
INSERT INTO medical_records (id, patient_id, visit_date, symptoms, diagnosis, treatment, notes, priority, doctor_notified) VALUES
(301, 101, CURRENT_DATE - INTERVAL '28 days', 'Fever, chills, headache', 'Malaria', 'Artemether-Lumefantrine 80/480mg', 'Patient advised to sleep under treated net.', 'NORMAL', true),
(302, 102, CURRENT_DATE - INTERVAL '25 days', 'None', 'Essential Hypertension', 'Lisinopril 10mg daily', 'BP is stable, continue medication.', 'NORMAL', true),
(303, 103, CURRENT_DATE - INTERVAL '20 days', 'High fever, abdominal pain', 'Typhoid Fever', 'Ciprofloxacin 500mg', 'Admitted for 2 days for IV fluids.', 'CRITICAL', true),
(304, 101, CURRENT_DATE - INTERVAL '10 days', 'Mild weakness', 'Recovering Malaria', 'Multivitamins', 'Patient is fully recovered.', 'NORMAL', true),
(305, 105, CURRENT_DATE - INTERVAL '5 days', 'Chest pain', 'Hypertensive urgency', 'Amlodipine 10mg', 'Referred to cardiologist if symptoms persist.', 'CRITICAL', true);

-- 4. Lab Requests
INSERT INTO lab_requests (id, visit_id, test_name, request_date, result_date, results, status, requested_by, performed_by) VALUES
(401, 201, 'Malaria RDT', CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days', 'Positive (+)', 'COMPLETED', 'Dr. Mike', 'Lab Tech Sam'),
(402, 203, 'Widal Test', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '20 days', 'Salmonella Typhi O: 1/160', 'COMPLETED', 'Dr. Mike', 'Lab Tech Sam'),
(403, 208, 'Full Blood Count', CURRENT_DATE - INTERVAL '1 days', NULL, NULL, 'PENDING', 'Dr. Mike', NULL),
(404, 210, 'Lipid Profile', CURRENT_DATE, NULL, NULL, 'PENDING', 'Dr. Mike', NULL);

-- 5. Prescriptions (For the Pharmacist)
INSERT INTO prescriptions (id, visit_id, medication_name, dosage, frequency, duration, notes, dispensed) VALUES
(501, 201, 'Coartem', '4 tablets', 'BD', '3 days', 'Take after meals', true),
(502, 202, 'Lisinopril', '10mg', 'OD', '30 days', 'Take in the morning', true),
(503, 203, 'Ciprofloxacin', '500mg', 'BD', '7 days', 'Complete full dose', true),
(504, 207, 'Cough Syrup', '10ml', 'TDS', '5 days', 'Avoid cold water', false),
(505, 208, 'Paracetamol', '1g', 'TDS', '3 days', 'For fever', false);

-- 6. Invoices (For the Cashier)
INSERT INTO invoices (id, visit_id, amount, item_type, payment_status, payment_method, created_at, paid_at) VALUES
(601, 201, 150.00, 'CONSULTATION_AND_DRUGS', 'PAID', 'CASH', CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
(602, 202, 200.00, 'CONSULTATION_AND_LAB', 'PAID', 'CARD', CURRENT_DATE - INTERVAL '25 days', CURRENT_DATE - INTERVAL '25 days'),
(603, 203, 500.00, 'ADMISSION_AND_DRUGS', 'PAID', 'MOMO', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '18 days'),
(604, 207, 85.00, 'PHARMACY', 'PAID', 'CASH', CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE - INTERVAL '2 days'),
(605, 208, 120.00, 'LAB_TEST', 'PAID', 'CASH', CURRENT_DATE - INTERVAL '1 days', CURRENT_DATE - INTERVAL '1 days'),
(606, 209, 250.00, 'CONSULTATION', 'UNPAID', NULL, CURRENT_DATE, NULL),
(607, 210, 50.00, 'REGISTRATION', 'UNPAID', NULL, CURRENT_DATE, NULL);

-- 7. Audit Logs
INSERT INTO audit_logs (id, username, role, action, details, timestamp) VALUES
(701, 'admin', 'ROLE_ADMIN', 'SYSTEM_START', 'System initialized successfully', CURRENT_DATE - INTERVAL '30 days'),
(702, 'receptionist_john', 'ROLE_RECEPTIONIST', 'REGISTER_PATIENT', 'Registered new patient DFH-2026-001', CURRENT_DATE - INTERVAL '28 days'),
(703, 'nurse_mary', 'ROLE_NURSE', 'RECORD_VITALS', 'Recorded vitals for Visit ID 201', CURRENT_DATE - INTERVAL '28 days'),
(704, 'doctor_mike', 'ROLE_DOCTOR', 'CREATE_PRESCRIPTION', 'Created prescription for Visit ID 201', CURRENT_DATE - INTERVAL '28 days'),
(705, 'admin', 'ROLE_ADMIN', 'VIEW_ANALYTICS', 'Admin accessed analytics dashboard', CURRENT_DATE);

-- Reset Sequences logically so future inserts work seamlessly
SELECT setval('patients_id_seq', (SELECT MAX(id) FROM patients));
SELECT setval('visits_id_seq', (SELECT MAX(id) FROM visits));
SELECT setval('medical_records_id_seq', (SELECT MAX(id) FROM medical_records));
SELECT setval('lab_requests_id_seq', (SELECT MAX(id) FROM lab_requests));
SELECT setval('prescriptions_id_seq', (SELECT MAX(id) FROM prescriptions));
SELECT setval('invoices_id_seq', (SELECT MAX(id) FROM invoices));
SELECT setval('audit_logs_id_seq', (SELECT MAX(id) FROM audit_logs));
