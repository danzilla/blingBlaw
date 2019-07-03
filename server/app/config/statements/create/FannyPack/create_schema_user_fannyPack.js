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

// Create Schema - create_schema_fannyPack
// Function - Insert user FannyPack to FannyPack record
const create_schema_fannyPack = function(fannyPackSerial) {
  let pushD = {}
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
module.exports = create_schema_fannyPack;
