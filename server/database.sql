CREATE DATABASE gemini;

CREATE TABLE form (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255), 
    organizer VARCHAR(255), 
    is_published BOOLEAN, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE form_field (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255), 
  label VARCHAR(255), 
  form INT REFERENCES form(id) ON DELETE CASCADE
);

CREATE TABLE options (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255), 
  form_field INT REFERENCES form_field(id) ON DELETE CASCADE
);

CREATE TABLE history (
  id SERIAL PRIMARY KEY, 
  form INT REFERENCES form(id) ON DELETE CASCADE,
  form_field INT REFERENCES form_field(id) ON DELETE CASCADE, 
  response VARCHAR(255),
  submission INT
);