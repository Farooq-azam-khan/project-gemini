CREATE DATABASE gemini;

CREATE TABLE form (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255), 
    organizer VARCHAR(255), 
    is_published BOOLEAN 
);

CREATE TABLE form_field (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255), 
  label VARCHAR(255), 
  form INT REFERENCES form(id)
);

CREATE TABLE options (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255), 
  form_field INT REFERENCES form_field(id)
);
