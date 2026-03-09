-- V3: Fix staff account passwords
-- BCrypt hash of 'admin123' generated with strength 10
-- This replaces the incorrect hash from V2

UPDATE users SET password = '$2a$10$slYQmyNdgTY7NkLzsX3wHO.KFT./3Dc2yFKkL.KHd88d1UkKu3o5C' WHERE username = 'admin';
UPDATE users SET password = '$2a$10$slYQmyNdgTY7NkLzsX3wHO.KFT./3Dc2yFKkL.KHd88d1UkKu3o5C' WHERE username = 'doctor_mike';
UPDATE users SET password = '$2a$10$slYQmyNdgTY7NkLzsX3wHO.KFT./3Dc2yFKkL.KHd88d1UkKu3o5C' WHERE username = 'nurse_mary';
UPDATE users SET password = '$2a$10$slYQmyNdgTY7NkLzsX3wHO.KFT./3Dc2yFKkL.KHd88d1UkKu3o5C' WHERE username = 'receptionist_john';
