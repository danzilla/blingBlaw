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
// DB Labels
const db_config = require('../../../../modules/app.db');
// DB Connections
const danzillaDB = require("../../../../modules/danzillaDB");
// pageInfo
let pushD = { title: "User_Auth", status: "", result: "" };
// User Auth
// Function - Insert user to userAuth Table
const add_user_to_userAuth = function (callback, userData, add_user_result) {
    `
      user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_serial VARCHAR(36) UNIQUE NOT NULL,
      user_name VARCHAR(12) UNIQUE NOT NULL,
      user_pwd_salt VARCHAR(254) NOT NULL,
      user_pwd_hash VARCHAR(254) NOT NULL,
      user_auth_token VARCHAR(36)
    `
    // Insert Query 
    let userAddQuery = "INSERT INTO " + db_config.database_labels.schema_name + "." + db_config.database_labels.table_users_auth +
                    "( user_serial, user_name, user_pwd_salt, user_pwd_hash )" + 
                    "VALUES($1, $2, $3, $4) RETURNING *";
    // prepare Insert Data
    const userAddData = [ 
      userData.userSerial,
      userData.userName,
      userData.userPwdSalt,
      userData.userPwdHash
    ];
    // blaze
    danzillaDB.pool.query(userAddQuery, userAddData, 
      function (err, Results) {
        if (!err && Results) { // If no errors and Results == Good
          pushD.checked = "checked";
          pushD.results = Results;
          add_user_result.push(pushD);
        } else if (err.code == "3D000") { // No database exists
          pushD.checked = "3D000";
          pushD.results = "No database exist";
          add_user_result.push(pushD);
        } else if (err.code == "42P01" || err.code == "23502") { // if No Tables exists
          pushD.checked = "42P01";
          pushD.results = "No Tables exists(42P01) or Table is mess(23502)";
          add_user_result.push(pushD);
        } else if (err.code == "23505") { // if record exists
          pushD.checked = "23505";
          pushD.results = "Record alredy exists";
          add_user_result.push(pushD);
        } else if (err) { // if any errors
          pushD.checked = "";
          pushD.results = err;
          add_user_result.push(pushD);
        }
        callback(null, add_user_result);
    });
}
module.exports = add_user_to_userAuth;