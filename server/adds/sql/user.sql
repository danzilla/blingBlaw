CREATE DATABASE blingBlaw;
/* CREATE SCHEMA user_DB; */

/* login table */
/* Auth first Table*/
CREATE TABLE user_DB.user_auth(
   user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
   user_serial VARCHAR(36) UNIQUE NOT NULL,
   user_name VARCHAR(12) UNIQUE NOT NULL,
   user_email VARCHAR(254) UNIQUE NOT NULL,
   user_pwd_salt VARCHAR(254) NOT NULL,
   user_pwd_hash VARCHAR(254) NOT NULL,
   user_auth_token VARCHAR(36)
);

/* user_details table */
/* profile info */
CREATE TABLE user_DB.user_details(
   user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
   user_full_name VARCHAR(254),
   user_email VARCHAR(254),
   user_phone_1 VARCHAR(254),
   user_address VARCHAR(254),
   user_group_id INTEGER REFERENCES user_DB.user_groups(group_id),
   user_id INTEGER REFERENCES user_DB.user_auth(user_id),
   user_serial VARCHAR(36) REFERENCES user_DB.user_auth(user_serial)
);

/* user_record table */
/* user history */
CREATE TABLE user_DB.user_record(
   user_record_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
   user_created TIMESTAMP,
   user_updated TIMESTAMP,
   user_last_signed_on TIMESTAMP,
   user_last_reset_pwd TIMESTAMP,
   user_id INTEGER REFERENCES user_DB.user_auth(user_id),
   user_group_id INTEGER REFERENCES user_DB.user_groups(group_id),
   user_serial VARCHAR(36) REFERENCES user_DB.user_auth(user_serial) 
);




/* user_group table */
/* groups and category */
CREATE TABLE user_DB.user_groups
(
   group_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
   group_serial VARCHAR(36) UNIQUE NOT NULL,
   group_name VARCHAR(254) NOT NULL,
   group_weight INTEGER NOT NULL,
   group_created TIMESTAMP
);




