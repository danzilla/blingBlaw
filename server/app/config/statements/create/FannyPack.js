/* SQL statementz - FannyPack
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
    Create - FannyPack
    - Requirement
        - > fannyPackName, userSerialID
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




// Create Schema
// Function - Insert user FannyPack to FannyPack record
const create_Schema_FannyPack = function(fannyPackSerial) {
    let fannyPack = "FannyPack-" + fannyPackSerial;
    const create_Schema = "CREATE SCHEMA IF NOT EXISTS " + fannyPack + " AUTHORIZATION " + app_db.blingBlaw.user + ";";
    // blaze
    danzillaDB.pool.query(create_Schema,
        function (err, Results) {
          if (!err && Results) { // If no errors and Results == Good
            pushD = { checked: "\n checked", results: Results }
          } else if (err) { // if any errors
            pushD = { checked: "\n ", results: err }
          }
          console.log(JSON.stringify(pushD));
    });
}

// FannyPack Record
// Function - Insert user FannyPack to FannyPack record
const add_fannyInfo_to_fannypacks_table = function(fannyPackName, userSerialID, fannyPackSerial) {
    `
        fannyPack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        fannyPack_serial VARCHAR(36) UNIQUE NOT NULL,
        fannyPack_name VARCHAR(254),
        fannyPack_created TIMESTAMP,
        fannyPack_lastmodify TIMESTAMP,
        fannyPack_lastUpdated TIMESTAMP,
        user_auth_serial VARCHAR(36) UNIQUE NOT NULL
    `
    // prepare data
    // random Salt from Time
    let fannyPack_name = fannyPackName;
    let user_auth_serial = userSerialID;
    let fannyPack_serial = fannyPackSerial;
    let fannyPack_created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // Insert Query 
    let userAddQuery = "INSERT INTO " + app_db.db_config.schema_name + "." + app_db.db_config.table_users_fannyPack +
                    "( fannyPack_serial, fannyPack_name, fannyPack_created, user_auth_serial )" + 
                    "VALUES($1, $2, $3, $4) RETURNING *";
    // Insert Data
    const userAddData = [ fannyPack_serial, fannyPack_name, fannyPack_created, user_auth_serial ];
    // blaze
    danzillaDB.pool.query(userAddQuery, userAddData, 
        function (err, Results) {
          if (!err && Results) { // If no errors and Results == Good
            pushD = { checked: "\n checked", results: Results }
          } else if (err) { // if any errors
            pushD = { checked: "\n ", results: err }
          }
          console.log(JSON.stringify(pushD));
    });
}


const CreateFannyPack = {
    create_schema_fannyPack: "",
    create_table_account_types: "",
    create_table_account_category: "",
    create_table_account_record: "",
    add_fannyInfo_to_fannypacks_table: "",
    add_SampleAccountType_account_types_table: "",
    add_SampleCategory_account_category_table: ""
}
module.exports = CreateFannyPack;
