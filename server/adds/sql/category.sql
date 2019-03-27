CREATE DATABASE blingBlaw;

/* CREATE SCHEMA category_DB; */

CREATE TABLE category_DB.category(
   category_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   category_serial VARCHAR(36) NOT NULL UNIQUE,
   category_name VARCHAR(254) NOT NULL,
   category_parent INTEGER NOT NULL,
   category_created TIMESTAMP,
   category_updated TIMESTAMP
);
