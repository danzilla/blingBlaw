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

const create_schema_fannyPack = "fannypack_userID_fannypacks_serial";
const create_table_account_types = "";
const create_table_account_category = "";
const create_table_account_record = "";
const add_fannyInfo_to_fannypacks_table = "";
const add_SampleAccountType_account_types_table = "";
const add_SampleCategory_account_category_table = "";

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
