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
const create_table_account = function () {


    let account_serial = "table name";

    // Create Table - create_Category_Table
    let sql_statement = "CREATE TABLE IF NOT EXISTS " +
    db_config.database_labels.schema_name + "." +
    db_config.database_labels.table_fannyPack_type +
    `(
        transaction_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        transaction_serial VARCHAR(36) NOT NULL UNIQUE,
        transaction_Date DATE NOT NULL,
        transaction_Desc VARCHAR(254) NOT NULL,
        transaction_Withdrawls VARCHAR(254) NOT NULL,
        transaction_Deposits VARCHAR(254) NOT NULL,
        transaction_Balance VARCHAR(254) NOT NULL,
        transaction_Category text[],
        transaction_Comments text[],
        transaction_Updated text[],
        transaction_UpdateUser VARCHAR(254)
    );`;
    console.log("\n\n\ncreate_table_account" + JSON.stringify(sql_statement));

}
module.exports = create_table_account;
