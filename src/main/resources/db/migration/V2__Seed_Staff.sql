-- V2 Seed Staff Accounts
INSERT INTO users (username, password, email, role) VALUES 
('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xdM0ttR7.y.F6Gky', 'admin@divinefavor.com', 'ROLE_ADMIN'),
('doctor_mike', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xdM0ttR7.y.F6Gky', 'mike@divinefavor.com', 'ROLE_DOCTOR'),
('nurse_mary', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xdM0ttR7.y.F6Gky', 'mary@divinefavor.com', 'ROLE_NURSE'),
('receptionist_john', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xdM0ttR7.y.F6Gky', 'john@divinefavor.com', 'ROLE_RECEPTIONIST');
