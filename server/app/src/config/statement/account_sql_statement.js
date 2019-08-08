/* accountTransaction
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

fanny_serialFanny.accountTransaction
  `
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
  `
*/
// Import app config labels
const {database_labels, database_connection} = require('../app.config');
// Magic
//
// Table
// create_accountTransaction_table
const create_accountTransaction_table = {
  title: "create_accountTransaction_table",
  sql: function (userData) {
      return `CREATE TABLE IF NOT EXISTS
        fannypack_${userData.fannyPack_serial}.account_${userData.account_serial}
        (
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
  }
}
// 
// Add
// add_newAccountTransaction_to_accounTransaction - Require - userData
const add_newAccountTransaction_to_accountTransaction = {
    title: "add_newAccountCategory_to_accountCategory",
    sql: function (userData) {
      return `INSERT INTO fannypack_${userData.fannyPack_serial}.account_${userData.account_serial}
        ( transaction_serial, transaction_Date, transaction_Desc, transaction_Withdrawls, transaction_Deposits,
          transaction_Balance, transaction_Category, transaction_Comments, transaction_Updated, transaction_UpdateUser) VALUES 
        ('${userData.transaction_serial}', '${userData.transaction_Date}', '${userData.transaction_Desc}', '${userData.transaction_Withdrawls}',
        '${userData.transaction_Deposits}', '${userData.transaction_Balance}', '${userData.transaction_Category}', '${userData.transaction_Comments}',
        '${userData.transaction_Updated}', '${userData.transaction_UpdateUser}');`;
  }
}
//
// View 
// view_ALL_accountTransaction - Require - userData
const view_ALL_accountTransaction = {
  title: "view_ALL_accountTransaction",
  sql: function (userData) {
    return `SELECT * FROM fannypack_${userData.fannyPack_serial}.account_${userData.account_serial}';`;
  }
}
// Export 
const statements = {
  create_accountTransaction_table: create_accountTransaction_table,
  add_newAccountTransaction_to_accountTransaction: add_newAccountTransaction_to_accountTransaction,
  view_ALL_accountTransaction: view_ALL_accountTransaction
}
module.exports = statements;
