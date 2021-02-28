/*  accountCategory Table
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
    category_id VARCHAR(254) UNIQUE NOT NULL,
    category_name VARCHAR(254) UNIQUE NOT NULL,
    category_parent VARCHAR(36) NOT NULL,
    category_created TIMESTAMP,
    category_lastmodify TIMESTAMP
  `
*/
// Import app config labels
const {database_labels, database_connection} = require('../../app.config');
// Magic
//
// Table
// create_accountCategory_table
const create_accountCategory_table = {
  title: "create_category_Table",
  sql: function (userData) {
      return `CREATE TABLE IF NOT EXISTS
        fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_category}
          (
            category_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
            category_serial VARCHAR(36) UNIQUE NOT NULL,
            category_name VARCHAR(254) UNIQUE NOT NULL,
            category_parent VARCHAR(36) NOT NULL,
            category_created TIMESTAMP,
            category_lastmodify TIMESTAMP
          );`;
  }
}
// Add
// add_newAccountCategory_to_accountCategory - Require - userData
const add_newAccountCategory_to_accountCategory = {
    title: "add_newAccountCategory_to_accountCategory",
    sql: function (userData) {
      return `INSERT INTO fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_category} (category_serial, category_name, category_parent, category_created, category_lastmodify) VALUES ('$1', '$2', '$3', '$4', '$5') RETURNING *;`;
  }
}
// View 
// view_ALL_accountCategory - Require - userData
const view_ALL_accountCategory = {
  title: "view_ALL_accountCategory",
  sql: function (userData) {
    return `SELECT * FROM fannypack_${userData.fannyPack_serial}.${database_labels.table_fannyPack_category};`;
  }
}
// Export 
const statements = {
  create_accountCategory_table: create_accountCategory_table,
  add_newAccountCategory_to_accountCategory: add_newAccountCategory_to_accountCategory,
  view_ALL_accountCategory: view_ALL_accountCategory
}
module.exports = statements;
