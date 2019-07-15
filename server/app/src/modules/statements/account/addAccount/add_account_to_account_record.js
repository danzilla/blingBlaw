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
        - > accountName, accountType, userSerial
    - Create Table
        - create fannypacks_serial.account_serial
    - Add
        - Add accountInfo to fannypacks_serial.account_record
    
create_table_account()
add_account_to_account_record()
 */
// DB Labels
const db_config = require('../../../app.db');
// DB Connections
const danzillaDB = require("../../../danzillaDB");
// pageMessage
let pageMessage = { title: "create_table_account", checked: "", message: "", results: "" };
// Create Table - create_table_account
// Function - Create Table - account_types
const add_account_to_account_record = function () {
    `
        accounts_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        account_type_id VARCHAR(36) NOT NULL,
        account_serial VARCHAR(36) NOT NULL,
        account_lastmodify TIMESTAMP,
        account_owner_serial VARCHAR(36) NOT NULL
    `
    // Create Table - create_Category_Table
    let sql_statement = "CREATE TABLE IF NOT EXISTS " + db_config.database_labels.schema_name + "." +  db_config.database_labels.table_fannyPack_type;

    // SQL Query - Fire
    danzillaDB.pool.query(sql_statement,
        // err catch
        function (err, Results) {
            // If no errors and Results == Good
        if (!err && Results) { 
            pageMessage.checked = "checked";
            pageMessage.message = "Added to user_details!";
            pageMessage.results = Results;
        } // if any errors
        else if (err) {
            pageMessage.checked = err.code;
            pageMessage.message = "Error adding to user_details";
            pageMessage.results = err;
        } // if any else
        else {
            pageMessage.checked = "Internal_Error";
            pageMessage.message = "Internal Error";
            pageMessage.results = "Internal Error";
        }
        add_user_result.add_user_to_userDetails = pageMessage;
        callback(null, pageMessage);
    });



}
module.exports = add_account_to_account_record;
