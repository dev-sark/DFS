-- V4: Fix Role Enum Mismatch
-- Strip the 'ROLE_' prefix from the roles in the users table to match the Java Enum

UPDATE users SET role = REPLACE(role, 'ROLE_', '');
