CREATE DATABASE blingBlaw;

CREATE SCHEMA transaction_DB;

CREATE TABLE transaction_DB.transactions(
   transaction_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   transaction_serial VARCHAR(36) NOT NULL UNIQUE,
   transaction_Date DATE NOT NULL,
   transaction_Desc VARCHAR(254) NOT NULL,
   transaction_Withdrawls VARCHAR(254) NOT NULL,
   transaction_Deposits VARCHAR(254) NOT NULL,
   transaction_Balance VARCHAR(254) NOT NULL,
   transaction_Category JSONB,
   transaction_Comments JSONB,
   transaction_Updated TIMESTAMP,
   transaction_UpdateUser VARCHAR(254),
   statement_serial VARCHAR(36) REFERENCES statement_DB.statement_details(statement_serial),
   statement_id INTEGER REFERENCES statement_DB.statement_details(statement_Id)
);
