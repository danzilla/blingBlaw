/* 
* Databases
*
* db_Name - blingblaw_assets
* │
* └───Schema - users
* |   │   Table - user_auth - user_id
* |   │   Table - user_details - user_id - user_group_id
* |   │   Table - user_record - user_id
* |   │   Table - user_group - user_group_id
* └───Schema - fannypacks
* │   │   Table - fannypack_id - user_id - fannyPackName - fannyPackChangeInfo
* │   │   Table - fannypack_id - user_id - fannyPackChangeInfo
*
* db_Name - blingblaw_fannypack
* │
* └───Schema - fannyPack_users_serial_ID
* |   │   Table - category - category_id - category_details - category_change_info
* │   │   Table - wallet - wallet_id -  wallet_name - wallet_change_info
* │   │   Table - wallet_details - wallet_id
*
*/

// App Database - Name
const app_assets_db_name = "blingblaw_assets";
const app_fannyPack_db_name = "blingblaw_fannypacks";
// Database for Danzilla_
const db_Danzilla = "danustanDB";

// Default-Database connection configuration
const db_User = "danzilla";
const db_Pwd = "1035621";
const db_Port = "6543";
const db_Host = "localhost";
const default_DB = "postgres";

/* 
* Labels For - Database - Schema - Tables
*/
// Database - Assets
const assets_db_config = {
    // database
    db_name: app_assets_db_name,
    // schema_Assets.users
    schema_users: {
        schema_name: "users",
        table_users_auth: "user_auth",
        table_users_details: "user_details",
        table_users_record: "user_records",
        table_users_group: "user_groups",
    },
    // schema_Assets.fannypacks
    schema_fannypacks: {
        schema_name: "fannypacks",
        table_fannypacks: "wallets",
        table_records: "records"
    }
}
// Database - FannyPacks
const fannypacks_db_config = {
    // Database - FannyPacks
    db_name: app_fannyPack_db_name,
    // Schema - FannyPacks.fannypack_user_id
    schema_fannypack_userID: {
        schema_name: "fannyPack_" + "users_serial_ID",
        table_wallet: "wallet",
        table_wallet_details: "wallet_details",
        table_category: "category"
    }
}

/*
 * Databases settings and configurations 
 */
const database = {
    // App - Assets
    blingblaw: {
        user: db_User,
        password: db_Pwd,
        database: assets_db_config.db_name,
        port: db_Port,
        host: db_Host
    },
    // App - FannyPackz
    fannypack: {
        user: db_User,
        password: db_Pwd,
        database: fannypacks_db_config.db_name,
        port: db_Port,
        host: db_Host
    },
    // App - default postgres (public)
    default_postgres_db: {
        user: db_User,
        password: db_Pwd,
        database: default_DB,
        port: db_Port,
        host: db_Host
    },
    // #Yee
    danzilla_db: {
        user: db_User,
        password: db_Pwd,
        database: db_Danzilla,
        port: db_Port,
        host: db_Host
    }
}

// Export - Labels for Database - Schema - Tables
module.exports.assets_db_config = assets_db_config;
module.exports.fannypacks_db_config = fannypacks_db_config;
// Export - Databases settings 
module.exports.blingBlaw = database.blingblaw;
module.exports.fannyPack = database.fannypack;
module.exports.postgres = database.default_postgres_db;
// Danzilla
module.exports.Home = database.danzilla_db;
