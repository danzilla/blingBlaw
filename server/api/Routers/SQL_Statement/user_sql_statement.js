/*  User
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

    create_schema_user_fannyPack
    add_user_to_userAuth
    add_user_to_userDetails
     
user_auth
  `
    user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_serial VARCHAR(36) UNIQUE NOT NULL,
    user_name VARCHAR(12) UNIQUE NOT NULL,
    user_pwd_salt VARCHAR(254) NOT NULL,
    user_pwd_hash VARCHAR(254) NOT NULL,
    user_auth_token VARCHAR(36)
  `
user_details
  `
    user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_full_name VARCHAR(254),
    user_email VARCHAR(254),
    user_created TIMESTAMP,
    user_modify TIMESTAMP,
    user_lastLogged TIMESTAMP,
    user_auth_serial VARCHAR(36) UNIQUE NOT NULL
  `
*/

// Import app config labels
const {database_labels, database_connection} = require('../../app.config');
// Magic

//
// Create Table
// Table - userAuth
const create_Table_UserAuth = {
  title: "create_Table_UserAuth",
  sql: `CREATE TABLE IF NOT EXISTS
      ${database_labels.schema_name}.${database_labels.table_users_auth}
      (
          user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
          user_serial VARCHAR(36) UNIQUE NOT NULL,
          user_name VARCHAR(12) UNIQUE NOT NULL,
          user_pwd_salt VARCHAR(254) NOT NULL,
          user_pwd_hash VARCHAR(254) NOT NULL,
          user_auth_token VARCHAR(36)
      );`
}
// Table - userDetails
const create_Table_UserDetails = {
  title: "create_Table_UserDetails",
  sql: `CREATE TABLE IF NOT EXISTS 
      ${database_labels.schema_name}.${database_labels.table_users_details}
      (
          user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
          user_full_name VARCHAR(254),
          user_email VARCHAR(254),
          user_created TIMESTAMP,
          user_modify TIMESTAMP,
          user_lastLogged TIMESTAMP,
          user_auth_serial VARCHAR(36) UNIQUE NOT NULL
      );`
}
//
// Add
// add_user_to_userAuth - Require - userData
const add_user_to_userAuth = {
    title: "add_user_to_userAuth",
    sql: function (userData) {
      return `INSERT INTO ${database_labels.schema_name}.${database_labels.table_users_auth}
        (user_serial, user_name, user_pwd_salt, user_pwd_hash) 
        VALUES ('${userData.user_serial}', '${userData.user_name}', '${userData.user_pwd_salt}', '${userData.user_pwd_hash}');`;
  }
}
// add_user_to_userDetails - Require - userData
const add_user_to_userDetails = {
    title: "add_user_to_userDetails",
    sql: function (userData) {
      return `INSERT INTO ${database_labels.schema_name}.${database_labels.table_users_details}
        (user_created, user_auth_serial) 
        VALUES('${userData.user_created}', '${userData.user_auth_serial}');`;
  }
}
//
// Login and Authentication 
// validate_user_login - Require - userData
const validate_user_login = {
  title: "validate_user_login",
  sql: function (userData) {
    return `SELECT 
      user_serial, user_name, user_full_name, user_email, user_lastlogged, user_auth_token
      FROM ${database_labels.schema_name}.${database_labels.table_users_auth} userAuth
      LEFT JOIN ${database_labels.schema_name}.${database_labels.table_users_details} userDetail 
      ON userAuth.user_serial = userDetail.user_auth_serial
      WHERE userAuth.user_name='${userData.userName}' AND userAuth.user_pwd_hash='${userData.userPassword}' LIMIT 1;`;
  }
}
// update_userDetails - Require - userData
const update_userDetails = {
  title: "update_userDetails",
  sql: function (userData) {
    return `UPDATE ${database_labels.schema_name}.${database_labels.table_users_details}
            SET user_lastLogged='${userData.user_lastLogged}' 
            WHERE user_auth_serial='${userData.user_auth_serial}';`;
  }
}
//
// View
// view_user - Require - userData
const view_user = {
  title: "view_user",
  sql: function (userData) {
    return `SELECT 
      user_serial, user_name, user_full_name, user_email, 
      user_created, user_modify, user_lastlogged, user_auth_token
      FROM ${database_labels.schema_name}.${database_labels.table_users_auth} userAuth
      LEFT JOIN ${database_labels.schema_name}.${database_labels.table_users_details} userDetail 
      ON userAuth.user_serial = userDetail.user_auth_serial
      WHERE userAuth.user_serial='${userData.user_serial}' LIMIT 1;`;
  }
}
// view_all_user - Require - userData
const view_all_user = {
  title: "view_all_user",
  sql: function (userData) {
    return `SELECT 
      user_serial, user_name, user_full_name, user_email, 
      user_created, user_modify, user_lastlogged, user_auth_token
      FROM ${database_labels.schema_name}.${database_labels.table_users_auth} userAuth
      LEFT JOIN ${database_labels.schema_name}.${database_labels.table_users_details} userDetail 
      ON userAuth.user_serial = userDetail.user_auth_serial;`;
  }
}
// Export 
const statements = {
  create_Table_UserAuth: create_Table_UserAuth,
  create_Table_UserDetails: create_Table_UserDetails,
  add_user_to_userAuth: add_user_to_userAuth,
  add_user_to_userDetails: add_user_to_userDetails,
  validate_user_login: validate_user_login,
  update_userDetails: update_userDetails,
  view_all_user: view_all_user,
  view_user: view_user
}
module.exports = statements;
