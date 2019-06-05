/* SQL statementz - Assets || BlingBlaw - Database configuration
 * 
 * database_Name - blingblaw_assets
 * │
 * └───Schema - users
 * |   │   Table - user_auth - user_id
 * |   │   Table - user_details - user_id
 * |   │   Table - user_record - user_id
 * |   │   Table - user_group - user_group_id
 * └───Schema - fannypacks
 * │   │   Table - fannypack_id - user_id - fannyPackName - fannyPackChangeInfo
 * 
 */

// App Global config
const dbConfig = require('../app.db');
// default db owner_user
const DB_user = dbConfig.blingBlaw.user;
// Database - blingblaw_assets
const create_DB_asset = 'CREATE DATABASE '+ dbConfig.assets_db_config.db_name;

// Users
// Schema - DB_assets_name.users
const create_schema_users = "CREATE SCHEMA IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_users.schema_name + 
   " AUTHORIZATION " + DB_user + ";";
// Table - users.user_auth
const create_table_userAuth = "CREATE TABLE IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_users.schema_name + "." +
   dbConfig.assets_db_config.schema_users.table_users_auth +
   `(
      user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_serial VARCHAR(36) UNIQUE NOT NULL,
      user_name VARCHAR(12) UNIQUE NOT NULL,
      user_email VARCHAR(254) UNIQUE NOT NULL,
      user_pwd_salt VARCHAR(254) NOT NULL,
      user_pwd_hash VARCHAR(254) NOT NULL,
      user_auth_token VARCHAR(36)
   );`;
// Table - users.user_details
const create_table_userDetails = "CREATE TABLE IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_users.schema_name + "." +
   dbConfig.assets_db_config.schema_users.table_users_details +
   `(
      user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_full_name VARCHAR(254),
      user_email VARCHAR(254),
      user_phone_1 VARCHAR(254),
      user_address VARCHAR(254),
      user_group_id INTEGER REFERENCES users.user_groups(group_id),
      user_id INTEGER REFERENCES users.user_auth(user_id),
      user_serial VARCHAR(36) REFERENCES users.user_auth(user_serial)
   );`;
// Table - users.user_record
const create_table_userRecords = "CREATE TABLE IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_users.schema_name + "." +
   dbConfig.assets_db_config.schema_users.table_users_record +
   `(
      user_record_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_created TIMESTAMP,
      user_updated TIMESTAMP,
      user_last_signed_on TIMESTAMP,
      user_last_reset_pwd TIMESTAMP,
      user_id INTEGER REFERENCES users.user_auth(user_id),
      user_serial VARCHAR(36) REFERENCES users.user_auth(user_serial)
   );`;
// Table - users.user_group
const create_table_userGroup = "CREATE TABLE IF NOT EXISTS " +
   dbConfig.assets_db_config.schema_users.schema_name + "." +
   dbConfig.assets_db_config.schema_users.table_users_group +
   `(
      user_group_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_group_name VARCHAR(254) UNIQUE NOT NULL,
      user_group_created TIMESTAMP,
      user_group_updated TIMESTAMP
   );`;

// fannyPack
// Schema - fannypack
const create_schema_fannyPack = "CREATE SCHEMA IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_fannypacks.schema_name + 
   " AUTHORIZATION " + DB_user + ";";
// Table fannypacks.fannypacks
const create_table_fannypacks_fannypacks = "CREATE TABLE IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_fannypacks.schema_name + "." +
   dbConfig.assets_db_config.schema_fannypacks.table_fannypacks +
   `(
      fannypack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      fannypack_owner VARCHAR(36) UNIQUE NOT NULL,
      fannypack_name VARCHAR(240) NOT NULL,
      fannypack_created TIMESTAMP,
      fannypack_updated TIMESTAMP
   );`;
// Table fannypacks.table_records
const create_table_fannypacks_records = "CREATE TABLE IF NOT EXISTS " + 
   dbConfig.assets_db_config.schema_fannypacks.schema_name + "." +
   dbConfig.assets_db_config.schema_fannypacks.table_records + "." +
   `(
      fannypack_records_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      fannypack_owner VARCHAR(36) UNIQUE NOT NULL,
      fannypack_name VARCHAR(240) NOT NULL,
      fannypack_created TIMESTAMP,
      fannypack_updated TIMESTAMP,
      fannypack_modified TIMESTAMP
   );`;

// Export Create_DB_Design for Assets and Users
const assets_database = {
   db_name: dbConfig.assets_db_config.db_name,
   create_db: create_DB_asset,
   create_schema_users: create_schema_users,
   create_schema_fannyPack: create_schema_fannyPack,
   create_table_userAuth: create_table_userAuth,
   create_table_userDetails: create_table_userDetails,
   create_table_userRecords: create_table_userRecords,
   create_table_userGroup: create_table_userGroup,
   create_table_fannypacks_records: create_table_fannypacks_records,
   create_table_fannypacks_fannypacks: create_table_fannypacks_fannypacks
}
module.exports = assets_database;
