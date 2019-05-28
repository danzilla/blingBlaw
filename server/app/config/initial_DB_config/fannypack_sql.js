/* SQL statementz - FannyPackz
 * 
 * database_Name - blingblaw_fannypack
 * │
 * └───Schema - fannypack_id
 * |   │   Table - category - category_id - category_details - category_change_info
 * │   │   Table - wallet - wallet_id -  wallet_name - wallet_change_info
 * │   │   Table - wallet_details - wallet_id
 *  
 */
// App Global config
const appConfig = require('../app.config');

// Database - Labels
// Database userName
const DB_user = appConfig.defaultDB.dbUser;
// Database for FannyPack
const DB_fannyPack = appConfig.appDB.dbName_fannyPack;
// Schemas - fannypack.user_fannyPack_ID
const Schema_fannypack = "user_fannyPack_ID";
// Tables - db_assets.users.Tables
const Table_fannypack_category = "category";
const Table_fannypack_wallet = "wallet";

// Database - fannypacks 
const create_DB_fannyPack = "CREATE DATABASE IF NOT EXISTS " + DB_fannyPack + ";";

// Dynamic-Schema-Table for Each users
// Schema - user_fannyPack_ID
const create_schema_fannyPack = "CREATE SCHEMA IF NOT EXISTS " + DB_fannyPack + "." + Schema_fannypack + " AUTHORIZATION " + DB_user + ";";
// Table - fannypacks.category
const create_table_fannypacks_category = "CREATE TABLE IF NOT EXISTS " + Schema_fannypack + "." + Table_fannypack_category +
`(
   category_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   category_serial VARCHAR(36) NOT NULL UNIQUE,
   category_name VARCHAR(254) NOT NULL,
   category_parent INTEGER NOT NULL,
   category_created TIMESTAMP,
   category_updated TIMESTAMP
);`;
// Table - fannypacks.wallet
const create_table_fannypacks_wallet = "CREATE TABLE IF NOT EXISTS " + Schema_fannypack + "." + Table_fannypack_wallet +
`(
   transaction_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
   transaction_serial VARCHAR(36) NOT NULL UNIQUE,
   transaction_Date DATE NOT NULL,
   transaction_Desc VARCHAR(254) NOT NULL,
   transaction_Withdrawls VARCHAR(254) NOT NULL,
   transaction_Deposits VARCHAR(254) NOT NULL,
   transaction_Balance VARCHAR(254) NOT NULL,
   transaction_Category JSONB,
   transaction_Comments JSONB,
   transaction_Updated TIMESTAMP,
   transaction_UpdateUser VARCHAR(254)
);`;
