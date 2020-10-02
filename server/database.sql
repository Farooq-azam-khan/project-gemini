CREATE DATABASE gemini;

CREATE TABLE form (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255), 
    organizer VARCHAR(255), 
    is_published BOOLEAN 
);