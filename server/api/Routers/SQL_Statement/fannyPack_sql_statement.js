/* Fannypack
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

    add_newFannyPack_to_fannypacks_table
     
fannyPack
  `
    fannyPack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    fannyPack_serial VARCHAR(36) UNIQUE NOT NULL,
    fannyPack_name VARCHAR(254),
    fannyPack_created TIMESTAMP,
    fannyPack_lastUpdated TIMESTAMP,
    fannyPack_owner_serial VARCHAR(36) NOT NULL
  `
*/
// Import app config labels
const {database_labels, database_connection} = require('../../app.config');
// Magic
//
// Create Table
// Table fannypack
const create_Table_fannyPackz = {
  title: "create_Table_fannyPackz",
  sql: `CREATE TABLE IF NOT EXISTS ${database_labels.schema_name}.${database_labels.table_users_fannyPack}
      (
          fannyPack_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
          fannyPack_serial VARCHAR(36) UNIQUE NOT NULL,
          fannyPack_name VARCHAR(254) NOT NULL,
          fannyPack_created TIMESTAMP,
          fannyPack_lastUpdated TIMESTAMP,
          fannyPack_owner_serial VARCHAR(36) NOT NULL
      );`
}
//
// Create Schema
// Require - user_serial = userData.fannyPackSerial
const create_schema_user_fannyPack = {
  title: "create_schema_user_fannyPack",
  sql: function (userData) {
      return `CREATE SCHEMA IF NOT EXISTS fannyPack_${userData.fannyPack_serial} AUTHORIZATION ${database_connection.user};`;
  }
}
//
// Add
// Require - user_serial = userData.fannyPackSerial
const add_newFannyPack_to_fannypacks_table = {
    title: "add_newFannyPack_to_fannypacks_table",
    sql: function (userData) {
      return `INSERT INTO ${database_labels.schema_name}.${database_labels.table_users_fannyPack} 
          (fannyPack_serial, fannyPack_name, fannyPack_created, fannyPack_lastUpdated, fannyPack_owner_serial) 
          VALUES
          ('${userData.fannyPack_serial}', '${userData.fannyPack_name}', '${userData.fannyPack_created}', '${userData.fannyPack_lastUpdated}', '${userData.fannyPack_owner_serial}');`;
  }
}
//
// View 
// view_ALL_fannyPackz - Require - userData
const view_ALL_fannyPackz = {
  title: "view_ALL_fannyPackz",
  sql: function (userData) {
    return `SELECT * FROM ${database_labels.schema_name}.${database_labels.table_users_fannyPack};`;
  }
}
// view_user_fannyPackz - Require - userData
const view_user_fannyPackz = {
  title: "view_user_fannyPackz",
  sql: function (userData) {
    return `SELECT * FROM ${database_labels.schema_name}.${database_labels.table_users_fannyPack}
      WHERE fannyPack_owner_serial='${userData.user_serial}';`;
  }
}
// Export 
const statements = {
  create_Table_fannyPackz: create_Table_fannyPackz,
  create_schema_user_fannyPack: create_schema_user_fannyPack,
  add_newFannyPack_to_fannypacks_table: add_newFannyPack_to_fannypacks_table,
  view_user_fannyPackz:view_user_fannyPackz,
  view_ALL_fannyPackz:view_ALL_fannyPackz
}
module.exports = statements;