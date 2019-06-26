/* SQL statementz - Add account || BlingBlaw - Database configuration
 * In-Order
 * - blingblaw_assets --> users --> user_auth -> user_record -> user_details
 * - blingblaw_assets --> fannyPacks --> fannyPack -> fannypacks_records
 * - blingblaw_fannypack --> fannypack_id
 * - blingblaw_fannypack --> fannypack_id --> category
 * - blingblaw_fannypack --> fannypack_id --> wallet -> wallet_details
 * 
 * database_Name - blingblaw_assets
 * │
 * └───Schema - users
 * |   │   Table - user_auth - user_id
 * |   │   Table - user_details - user_id
 * |   │   Table - user_record - user_id
 * └───Schema - fannypacks
 * │   │   Table - fannypack - user_id
 * │   │   Table - fannypacks_records - fannypack_id
 * 
 * database_Name - blingblaw_fannypack
 * │
 * └───Schema - fannypack_id
 * |   │   Table - category - category_id - category_details - category_change_info
 * │   │   Table - wallet_ID - wallet_id -  wallet_name - wallet_change_info
 * │   │   Table - wallet_records - wallet_id
 *
 */



 




const account = {
    users: {
        add_to_user_auth: "",
        add_to_user_record: "",
        add_to_user_details: "",
        add_to_fannyPack: "",
        add_to_fannypacks_records: ""
    },
    fannypack: {
        create_schema_fannypack_ID: "",
        create_table_category: "",
        create_table_wallet_records: "",
        create_table_wallet_ID: ""
    }
}
module.exports = account;
