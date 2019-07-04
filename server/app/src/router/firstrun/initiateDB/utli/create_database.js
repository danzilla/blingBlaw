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
// DB db_config
const db_config = require('../../../../modules/app.db');

// Create Database
const create_Database = function (callback, firstRunCheck) {
    let sql_statement = 'CREATE DATABASE ' + db_config.database_labels.db_name;
    console.log(sql_statement);
    callback(null, sql_statement);
}
module.exports = create_Database;
