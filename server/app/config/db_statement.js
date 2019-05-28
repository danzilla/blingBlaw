// App Global config
const appConfig = require('./app.config');

// SQL statement



/*
 * Two Databases 
 * 1 - Users
 * 2 - FannyPack
 */

/*
```
database_Name - blingblaw_assets
│
└───Schema - users
|   │   Table - user_auth - user_id
|   │   Table - user_details - user_id
|   │   Table - user_record - user_id
└───Schema - fannypack
│   │   Table - fannypack_id - user_id - fannyPackName - fannyPackChangeInfo
```
```
database_Name - blingblaw_fannypack
|  
└───Schema - fannypack_id
|   │   Table - category - category_id - category_details - category_change_info
│   │   Table - wallet - wallet_id -  wallet_name - wallet_change_info
│   │   Table - wallet_details - wallet_id
```
*/


// Database - blingblaw_assets
const create_DB_asset = "CREATE DATABASE IF NOT EXISTS " + appConfig.appDB.dbName_assets;
// Shema - user 
const create_shema_users = "CREATE SCHEMA IF NOT EXISTS " + appConfig.appDB.dbName_assets + ".users" + " AUTHORIZATION " + appConfig.defaultDB.dbUser + ";";

/* login table */
/* Auth first Table*/
const create_table_userAuth = "CREATE TABLE IF NOT EXISTS " + "users.user_auth" +
`(
    user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_serial VARCHAR(36) UNIQUE NOT NULL,
    user_name VARCHAR(12) UNIQUE NOT NULL,
    user_email VARCHAR(254) UNIQUE NOT NULL,
    user_pwd_salt VARCHAR(254) NOT NULL,
    user_pwd_hash VARCHAR(254) NOT NULL,
    user_auth_token VARCHAR(36)
);`;
 
 /* user_details table */
 /* profile info */
 const create_table_userDetails = "CREATE TABLE IF NOT EXISTS " + "users.user_details" +
 `(
    user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_full_name VARCHAR(254),
    user_email VARCHAR(254),
    user_phone_1 VARCHAR(254),
    user_address VARCHAR(254),
    user_group_id INTEGER REFERENCES user_DB.user_groups(group_id),
    user_id INTEGER REFERENCES user_DB.user_auth(user_id),
    user_serial VARCHAR(36) REFERENCES user_DB.user_auth(user_serial)
 );`;
 
 /* user_record table */
 /* user history */
 const create_table_userRecords = "CREATE TABLE IF NOT EXISTS " + "users.user_record" +
 `(
    user_record_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_created TIMESTAMP,
    user_updated TIMESTAMP,
    user_last_signed_on TIMESTAMP,
    user_last_reset_pwd TIMESTAMP,
    user_id INTEGER REFERENCES user_DB.user_auth(user_id),
    user_group_id INTEGER REFERENCES user_DB.user_groups(group_id),
    user_serial VARCHAR(36) REFERENCES user_DB.user_auth(user_serial) 
 );`;

 // Shema - fannypack
const create_shema_fannyPack = "CREATE SCHEMA IF NOT EXISTS " + appConfig.appDB.dbName_assets + ".fannypacks" + " AUTHORIZATION " + appConfig.defaultDB.dbUser + ";";

 /* fannypacks */
 /* user history */
 const create_table_fannypacks = "CREATE TABLE IF NOT EXISTS " + "fannypacks.fannypacks" +
 `(
    fannypacks_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    fannypacks_name VARCHAR(240) NOT NULL,
    fannypacks_created TIMESTAMP,
    fannypacks_updated TIMESTAMP,
    user_id INTEGER REFERENCES user_DB.user_auth(user_id),
    user_serial VARCHAR(36) REFERENCES user_DB.user_auth(user_serial) 
 );`;


//
// Database - fannypacks 
const create_DB_fannyPack = "CREATE DATABASE IF NOT EXISTS " + appConfig.appDB.dbName_fannyPack;
// Shema - user_fannyPack_ID
const create_shema_fannyPack = "CREATE SCHEMA IF NOT EXISTS " + appConfig.appDB.dbName_fannyPack + ".fannypacks_ID" + " AUTHORIZATION " + appConfig.defaultDB.dbUser + ";";

