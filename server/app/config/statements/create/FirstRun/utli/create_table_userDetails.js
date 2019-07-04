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
const DB_CONFIG = require('../../../app.db');

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

module.exports.create_table_userDetails = create_table_userDetails;
