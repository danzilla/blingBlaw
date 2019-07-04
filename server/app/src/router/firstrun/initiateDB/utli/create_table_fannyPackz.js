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

// create_table_fannyPackz
const create_table_fannyPackz = function (callback, firstRunCheck) {
    // Table - users.fannyPackz
    const sql_statement = "CREATE TABLE IF NOT EXISTS " +
        db_config.database_labels.schema_name + "." +
        db_config.database_labels.table_users_fannyPack +
        `(
        fannyPack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        fannyPack_name VARCHAR(254),
        fannyPack_created TIMESTAMP,
        fannyPack_lastmodify TIMESTAMP,
        fannyPack_lastUpdated TIMESTAMP,
        user_auth_serial VARCHAR(36) UNIQUE NOT NULL
    );`;
    console.log(sql_statement);
    callback(null, sql_statement);
}
module.exports = create_table_fannyPackz;
