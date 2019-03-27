CREATE DATABASE blingBlaw;

/* CREATE SCHEMA statement_DB; */

CREATE TABLE statement_DB.statement_details(
   statement_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   statement_serial VARCHAR(36) NOT NULL UNIQUE,
   statement_Name VARCHAR(254) NOT NULL,
   statement_Type VARCHAR(254) NOT NULL,
   statement_Date DATE NOT NULL,
   statement_Desc VARCHAR(254),
   statement_Created TIMESTAMP,
   statement_Modified TIMESTAMP,
   statement_ModifiedtUser VARCHAR(254),
   statement_FileInfo JSONB,
   statement_owner_id INTEGER REFERENCES user_DB.user_auth(user_id),
   statement_owner_serial VARCHAR(36) UNIQUE REFERENCES user_DB.user_auth(user_serial)
);

CREATE TABLE statement_DB.statement_category(
   category_id SERIAL PRIMARY KEY NOT NULL,
   category_name VARCHAR(254) NOT NULL,
   category_weight INTEGER,
   category_created TIMESTAMP  
);
