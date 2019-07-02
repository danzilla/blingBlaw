/* SQL statementz - FirstRun
 * 
 * database_Name - blingblaw_assets
 * │
 * └───Schema - users
 * |   │   Table - user_auth - user_id
 * |   │   Table - user_details - user_id
 * │   │   Table - fannypacks - fannypacks_id
 * └───Schema - fannypacks
 * |   │   Table - account_category - account_category_id
 * │   │   Table - account_type - account_type_id
 * │   │   Table - account_record - account_id
 * │   │   Table - account_One - account_id
 * 
    Create - FirstRun
    - Requirement
        - > No-input require
    - Create Database
        - create blingBlaw
    - Create Schema
        - create users_assets
    - Create Table
        - create users_assets.user_auth_table
        - create users_assets.user_details_table
        - create users_assets.fannypacks_table
 */

// App Global config
// DB Labels 
const DB_CONFIG = require('../app.db.1');
// DB owner_user
const DB_user = dbConfig.blingBlaw.user;

// Create Database
const create_Database = 'CREATE DATABASE ' + DB_CONFIG.app_PRIMARY_DB_config.db_name;
// Create Schema
const create_Schema = "CREATE SCHEMA IF NOT EXISTS " + DB_CONFIG.app_PRIMARY_DB_config.schema_name +
    " AUTHORIZATION " + DB_user + ";";
// Table - users.user_auth
const create_table_userAuth = "CREATE TABLE IF NOT EXISTS " + 
   DB_CONFIG.app_PRIMARY_DB_config.schema_name + "." +
    DB_CONFIG.app_PRIMARY_DB_config.table_users_auth +
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
   DB_CONFIG.app_PRIMARY_DB_config.schema_name + "." +
   DB_CONFIG.app_PRIMARY_DB_config.table_users_details +
   `(
        user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        user_full_name VARCHAR(254),
        user_email VARCHAR(254),
        user_created TIMESTAMP,
        user_modify TIMESTAMP,
        user_lastLogged TIMESTAMP,
        user_auth_serial VARCHAR(36) UNIQUE NOT NULL
    );`;
// Table - users.fannyPackz
const create_table_userDetails = "CREATE TABLE IF NOT EXISTS " + 
   DB_CONFIG.app_PRIMARY_DB_config.schema_name + "." +
   DB_CONFIG.app_PRIMARY_DB_config.table_users_fannyPack +
   `(
        fannyPack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        fannyPack_name VARCHAR(254),
        fannyPack_created TIMESTAMP,
        fannyPack_lastmodify TIMESTAMP,
        fannyPack_lastUpdated TIMESTAMP,
        user_auth_serial VARCHAR(36) UNIQUE NOT NULL
    );`;

// Export
const FirstRun = {
    create_Database: create_Database,
    create_Schema: create_Schema,
    create_Table_UserAuth: create_table_userAuth,
    create_Table_UserDetails: create_table_userDetails,
    create_Table_fannyPackz: create_Table_fannyPackz
}
module.exports = FirstRun;
