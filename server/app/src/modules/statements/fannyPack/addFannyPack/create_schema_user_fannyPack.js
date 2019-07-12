/* SQL statementz - FannyPack
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
    Create - FannyPack
    - Requirement
        - > fannyPackName, userSerialID, fannyPackSerial
    - Create Schema
        - create fannypack_userID_fannypacks_serial
    - Create Table
        - create fannypack_userID_fannypacks_serial.account_types_table
        - create fannypack_userID_fannypacks_serial.account_category_table
        - create fannypack_userID_fannypacks_serial.account_record_table
    - Add
        - Add FannyPack_info to users_assets.fannypacks_table
        - Add SampleAccountType to fannypack_userID_fannypacks_serial.account_types_table
        - Add SampleCategory to fannypack_userID_fannypacks_serial.account_category_table
 */
// DB Labels
const db_config = require('../../../../modules/app.db');
// DB Connections
const danzillaDB = require("../../../../modules/danzillaDB");
// pageMessage
let pageMessage = { title: "create_schema_fannyPack", checked: "", message: "", results: "" };
// Create Schema - create_schema_fannyPack
// Function - Insert user FannyPack to FannyPack record
const create_schema_fannyPack = function(fannyPackSerial, userSerial) {

    // name = "fanny-"userSerial + fannySerial
    let user_fannyPack_name = "fannyPack-" + fannyPackSerial + userSerial;
    let sql_statement_fannyPack = "CREATE SCHEMA IF NOT EXISTS " + user_fannyPack_name
        + " AUTHORIZATION " + db_config.database_connection.user + ";";

    console.log("LOOOOL: " + sql_statement_fannyPack);

}
module.exports = create_schema_fannyPack;
