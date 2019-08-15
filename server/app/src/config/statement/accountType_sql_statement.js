/*  accountType
   Database - blingblaw
   └───Schema - users
    | │ Table - user_auth
    | │ Table - user_details
    │ │ Table - fannypacks
    └───Schema - fannypacks_fanny_serial
    | │ Table - account_category
    │ │ Table - account_type 
    │ │ Table - account_record
    │ │ Table - account_account_serial

fanny_serialFanny.category - Table
  `
    account_type_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    account_type_name VARCHAR(254) UNIQUE NOT NULL,
    account_type_created TIMESTAMP,
    account_type_lastmodify TIMESTAMP
  `
*/
// Import app config labels
const {database_labels, database_connection} = require('../app.config');
// Magic
//
// Table
// create_accounType_table - Require - userData
const create_accounType_table = {
  title: "create_Table_UserAuth",
  sql: function (userData) {
      return `CREATE TABLE IF NOT EXISTS
        fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_type}
        (
          account_type_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
          account_type_name VARCHAR(254) UNIQUE NOT NULL,
          account_type_created TIMESTAMP,
          account_type_lastmodify TIMESTAMP
        );`;
  }
}
//
// Add
// Require - account_type_name | account_type_created | account_type_lastmodify
const add_newAccountType_to_accountType = {
    title: "add_newAccountType_to_accountType",
    sql: function (userData) {
      return `INSERT INTO fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_type}
        (account_type_name, account_type_created, account_type_lastmodify)
        VALUES ('${userData.account_type_name}', '${userData.account_type_created}', '${userData.account_type_lastmodify}');`;
  }
}
//
// View 
// view_ALL_accountType - Require - userData
const view_ALL_accountType = {
  title: "view_ALL_accountType",
  sql: function (userData) {
    return `SELECT * FROM fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_type}';`;
  }
}
// Export 
const statements = {
  create_accounType_table: create_accounType_table,
  add_newAccountType_to_accountType: add_newAccountType_to_accountType,
  view_ALL_accountType: view_ALL_accountType
}
module.exports = statements;
