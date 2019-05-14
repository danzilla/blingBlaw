/* CREATE SCHEMA: statement_DB */
/* CREATE SCHEMA statement_DB; */

/* CREATE Table: statement_details */
CREATE TABLE statement_DB.statement_details(
   statement_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   statement_serial VARCHAR(36) NOT NULL UNIQUE,
   statement_Name VARCHAR(254),
   statement_Type VARCHAR(254) NOT NULL,
   statement_Date DATE NOT NULL,
   statement_Desc VARCHAR(254),
   statement_Created TIMESTAMP,
   statement_Modified VARCHAR(36),
   statement_owner_id INTEGER REFERENCES user_DB.user_auth(user_id),
   statement_owner_serial VARCHAR(36) REFERENCES user_DB.user_auth(user_serial)
);

/* CREATE Table: statement_category */
CREATE TABLE statement_DB.statement_category(
   statement_category_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   statement_category_serial VARCHAR(36) NOT NULL UNIQUE,
   statement_category_name VARCHAR(254) NOT NULL,
   statement_category_created TIMESTAMP,
   statement_category_updated TIMESTAMP
);
