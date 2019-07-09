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
let pushD = { title: "Validate_user_auth", status: "", result: "" };
// User Auth
// Function - Insert user to userAuth Table
const validate_user_auth = function (callback, userData, login_validation_results) {
    `
      user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      user_serial VARCHAR(36) UNIQUE NOT NULL,
      user_name VARCHAR(12) UNIQUE NOT NULL,
      user_pwd_salt VARCHAR(254) NOT NULL,
      user_pwd_hash VARCHAR(254) NOT NULL,
      user_auth_token VARCHAR(36)
    `
    // SELECT query 
    let loginValidateQuery = 'SELECT * FROM ' + db_config.database_labels.schema_name + "." + db_config.database_labels.table_users_auth +
      ' WHERE user_name = $1 AND user_pwd_hash = $2 LIMIT 1;';
    // NEED TO Validate and Optimize 
    let loginPayLoad = [
      userData.userName,
      userData.password
    ]
    // blaze
    danzillaDB.pool.query(loginValidateQuery, loginPayLoad, 
      function (err, Results) {
        if (!err && Results) { // If no errors and Results == Good
          pushD.checked = "checked";
          pushD.results = Results;
          login_validation_results.push(pushD);
        } else if (err.code == "3D000") { // No database exists
          pushD.checked = "3D000";
          pushD.results = "No database exist";
          login_validation_results.push(pushD);
        } else if (err.code == "42P01") { // if No Tables exists
          pushD.checked = "42P01";
          pushD.results = "No Tables exists or Messy database";
          login_validation_results.push(pushD);
        } else if (err) { // if any errors
          pushD.checked = "";
          pushD.results = err;
          login_validation_results.push(pushD);
        }
        callback(null, login_validation_results);
    });
}
module.exports = validate_user_auth;