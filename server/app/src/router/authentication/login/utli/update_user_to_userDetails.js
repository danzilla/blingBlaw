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
    Login
    - Requirement
        - > User, Password
    - Validate user to user_auth
        - Validate user to users_assets.user_auth_table
    - Add userData to user_details_table
        - Add user to users_assets.user_details_table
*/

// DB Labels
const db_config = require('../../../../modules/app.db');
// DB Connections
const danzillaDB = require("../../../../modules/danzillaDB");
// pageInfo
let pushD = { title: "User_Details", status: "", result: "" };
// User Auth
// Function - Insert user to userAuth Table
const update_user_userDetails = function (callback, userData, add_user_result) {
    `
      user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_full_name VARCHAR(254),
      user_email VARCHAR(254),
      user_created TIMESTAMP,
      user_modify TIMESTAMP,
      user_lastLogged TIMESTAMP,
      user_auth_serial VARCHAR(36) UNIQUE NOT NULL
    `
    // Insert Query 
    let userAddQuery = "INSERT INTO " + db_config.database_labels.schema_name + "." + db_config.database_labels.table_users_details +
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
        } else if (err) { // if any errors
          pushD.checked = "";
          pushD.results = err;
          add_user_result.push(pushD);
        }
        callback(null, add_user_result);
    });
}
module.exports = update_user_userDetails;