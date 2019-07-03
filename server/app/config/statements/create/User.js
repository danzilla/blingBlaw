/* SQL statementz - Create user
 * database_Name - blingblaw_assets
 * │
 * └───Schema - users
 * |   │   Table - user_auth - user_id
 * |   │   Table - user_details - user_id
 * │   │   Table - fannypacks - fannypacks_id
 * └───Schema - fannypacks
 * |   │   Table - account_category - account_category_id
 * │   │   Table - account_type - account_type_id
 * │   │   Table - account_record - account_id
 * │   │   Table - account_One - account_id
 * 
    Create - User
    - Requirement
        - > User, Password, fannyPackName
    - userAdd
        - Add user to users_assets.user_auth_table
        - Add user to users_assets.user_details_table
    - Create Schema
        - Create FannyPacks(fannyPackName, userSerialID)

add_user_to_userAuth(userName, userPassword)
add_user_to_userDetails(user_serial, userData)
*/

// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time

// DB Labels
const app_db = require("../app.db");
// DB Connections
const danzillaDB = require("../../../src/modules/danzillaDB");
// pageInfo
let pushD = {};

// User Auth
// Function - Insert user to userAuth Table
const add_user_to_userAuth = function(userName, userPassword) {
    `
        user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        user_serial VARCHAR(36) UNIQUE NOT NULL,
        user_name VARCHAR(12) UNIQUE NOT NULL,
        user_email VARCHAR(254) UNIQUE NOT NULL,
        user_pwd_salt VARCHAR(254) NOT NULL,
        user_pwd_hash VARCHAR(254) NOT NULL,
        user_auth_token VARCHAR(36)
    `
    // prepare data
    // random Salt from Time
    let user_serial = uuidv5(userName, uuidv1());
    let user_name = userName;
    // let user_email = userEmail + "@cool.me";
    let user_pwd_salt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let user_pwd_hash = userPassword; // Salt!
    let user_auth_token = uuidv5(userName, uuidv1());
    // Insert Query 
    let userAddQuery = "INSERT INTO " + app_db.db_config.schema_name + "." + app_db.db_config.table_users_auth +
                    "( user_serial, user_name, user_pwd_salt, user_pwd_hash, user_auth_token )" + 
                    "VALUES($1, $2, $3, $4, $5) RETURNING *";
    // Insert Data
    const userAddData = [ user_serial, user_name, user_pwd_salt, user_pwd_hash, user_auth_token ];
    // blaze
    danzillaDB.pool.query(userAddQuery, userAddData, 
        function (err, Results) {
          if (!err && Results) { // If no errors and Results == Good
            pushD = { checked: "checked", results: Results }
          } else if (err) { // if any errors
            pushD = { checked: "", results: err }
          }

          // if all good, pass user_serial
          console.log(JSON.stringify(pushD));
    });
}


// User Details
// Function - Insert user to userDetails Table
const add_user_to_userDetails = function(userSerialID, userData) {
    `
        user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        user_full_name VARCHAR(254),
        user_email VARCHAR(254),
        user_created TIMESTAMP,
        user_modify TIMESTAMP,
        user_lastLogged TIMESTAMP,
        user_auth_serial VARCHAR(36) UNIQUE NOT NULL
    `
    // prepare data
    // random Salt from Time
    let user_full_name = userData.userFullName;
    let user_email = userData.userEmail;
    let user_created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // let user_modify = "";
    // let user_lastLogged = "";
    let user_auth_serial = userSerialID;
    // Insert Query 
    let userAddQuery = "INSERT INTO " + app_db.db_config.schema_name + "." + app_db.db_config.table_users_details +
                    "( user_full_name, user_email, user_created, user_auth_serial )" + 
                    "VALUES($1, $2, $3, $4) RETURNING *";
    // Insert Data
    const userAddData = [ user_full_name, user_email, user_created, user_auth_serial ];
    // blaze
    danzillaDB.pool.query(userAddQuery, userAddData, 
        function (err, Results) {
          if (!err && Results) { // If no errors and Results == Good
            pushD = { checked: "\n checked", results: Results }
          } else if (err) { // if any errors
            pushD = { checked: "\n ", results: err }
          }
          console.log(JSON.stringify(pushD));
    });
}


const CreateUser = {
    add_user_to_userAuth: add_user_to_userAuth,
    add_user_to_userDetails: add_user_to_userDetails
}
module.exports = CreateUser;