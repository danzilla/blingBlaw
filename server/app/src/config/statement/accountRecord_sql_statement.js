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
  title: "create_Table_UserAuth",
  sql: function (userData) {
      return `CREATE TABLE IF NOT EXISTS
        fannypack_${userData.fannyPack_serial}.accountRecord
          (
            accounts_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
            account_type_id VARCHAR(36) NOT NULL,
            account_serial VARCHAR(36) NOT NULL,
            account_lastmodify TIMESTAMP,
            account_owner_serial VARCHAR(36) NOT NULL
          );`;
  }
}
// Export 
const statements = {
  create_accountRecords_table: create_accountRecords_table
}
module.exports = statements;
