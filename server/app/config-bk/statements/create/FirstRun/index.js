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

// Create Database
const create_Database = require("./create_database");
// Create Schema
const create_Schema = require("./create_schema");
// Table - users.user_userAuth
const create_table_userAuth = require("./create_table_userAuth");
// Table - users.user_details
const create_table_userDetails = require("./create_table_userDetails");
// Table - users.fannyPackz
const create_table_fannyPackz = require("./create_table_fannyPackz");

// Export FirstRun
const FirstRun = {
    create_Database: create_Database,
    create_Schema: create_Schema,
    create_Table_UserAuth: create_table_userAuth,
    create_Table_UserDetails: create_table_userDetails,
    create_Table_fannyPackz: create_table_fannyPackz
}
module.exports = FirstRun;
