/* SQL statementz - Assets
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

// BlingBlaw - Database configuration 
// Database - blingblaw_assets
const create_DB_asset = "CREATE DATABASE IF NOT EXISTS " + 
   dbConfig.assets_db_config.db_name + ";";
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
      fannypack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      fannypack_owner VARCHAR(36) UNIQUE NOT NULL,
      fannypack_name VARCHAR(240) NOT NULL,
      fannypack_created TIMESTAMP,
      fannypack_updated TIMESTAMP
   );`;









// Get Ready Export module 
const assets_sql = {
   db_name: DB_assets_name,
   db_user: DB_user,
   db_create: create_DB_asset,
   // schema_users
   schema_users: {
      schema_name: Schema_assets_users,
      schema_create: create_schema_users,
      table_users_auth: {
         table_name: Table_assets_users_auth,
         table_create: create_table_userAuth
      },
      table_users_details: {
         table_name: Table_assets_users_details,
         table_create: create_table_userDetails
      },
      table_users_record: {
         table_name: Table_assets_users_record,
         table_create: create_table_userRecords
      },
      table_users_group: {
         table_name: Table_assets_users_group,
         table_create: create_table_userGroup
      }
   },
   // schema_fannypacks
   schema_fannypacks: {
      schema_name: Schema_assets_fannypacks,
      schema_create: create_schema_fannyPack,
      table_fannypacks: {
         table_name: Table_fannypacks_fannypacks,
         table_create: create_table_fannypacks_fannypacks
      },
      table_records: {
         table_name: Table_fannypacks_records,
         table_create: create_table_fannypacks_records
      }
   }
}

