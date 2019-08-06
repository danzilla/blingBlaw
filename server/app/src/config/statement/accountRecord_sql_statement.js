/*  Account Record Table
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

fanny_serialFanny.accountRecord
  `
    accounts_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    account_type_id VARCHAR(36) NOT NULL,
    account_serial VARCHAR(36) NOT NULL,
    account_lastmodify TIMESTAMP,
    account_owner_serial VARCHAR(36) NOT NULL
  `
*/
// Import app config labels
const {database_labels, database_connection} = require('../app.config');
// Magic
// Account Record
const create_accountRecords_table = {
  title: "create_accountRecords_table",
  sql: function (userData) {
      return `CREATE TABLE IF NOT EXISTS
        fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_record}
          (
            accounts_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
            account_type_id VARCHAR(36) NOT NULL,
            account_serial VARCHAR(36) NOT NULL,
            account_lastmodify TIMESTAMP,
            account_owner_serial VARCHAR(36) NOT NULL
          );`;
  }
}
// Add
// Require - account_type_id | account_serial | account_lastmodify | account_owner_serial
const add_newAccount_to_accountRecord = {
    title: "add_newAccount_to_accountRecord",
    sql: function (userData) {
      return `INSERT INTO fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_record}
        (account_type_id, account_serial, account_lastmodify, account_owner_serial) 
        VALUES ('${userData.account_type_id}', '${userData.account_serial}', '${userData.account_lastmodify}', '${userData.account_owner_serial}');`;
  }
}
// Export 
const statements = {
  create_accountRecords_table: create_accountRecords_table,
  add_newAccount_to_accountRecord: add_newAccount_to_accountRecord
}
module.exports = statements;
