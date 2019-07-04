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
const db_config = require('../../../../modules/app.db');

// create_table_userAuth
const create_table_userAuth = function (callback, firstRunCheck) {
    // Table - users.create_table_userAuth
    const sql_statement = "CREATE TABLE IF NOT EXISTS " +
        db_config.database_labels.schema_name + "." +
        db_config.database_labels.table_users_auth +
    `(
        user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        user_serial VARCHAR(36) UNIQUE NOT NULL,
        user_name VARCHAR(12) UNIQUE NOT NULL,
        user_pwd_salt VARCHAR(254) NOT NULL,
        user_pwd_hash VARCHAR(254) NOT NULL,
        user_auth_token VARCHAR(36)
    );`;
    console.log(sql_statement);
    callback(null, sql_statement);
}
module.exports = create_table_userAuth;
