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
// User Auth
// Function - Insert user to userAuth Table
const validate_user_auth = function (callback, userData, login_validation_results, pageMessage) {
    pageMessage.title = "Validate_user_auth";
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
            // If no errors and Results == Good
        if (!err && Results.rowCount === 1 && Results.rows[0].user_serial) { 
          pageMessage.checked = "checked";
          pageMessage.message = "User logged in! " + Results.rows[0].user_name;
          pageMessage.results = Results.rows[0];
          login_validation_results.push(pageMessage);
        }  // If 0 records
        else if (!err && Results.rowCount === 0) {
          pageMessage.checked = "";
          pageMessage.message = "Incorrect credentials";
          pageMessage.results = Results;
          login_validation_results.push(pageMessage);
        }  // No database exists
        else if (err.code == "3D000") {
          pageMessage.checked = err.code;
          pageMessage.message = "No database exist";
          pageMessage.results = err;
          login_validation_results.push(pageMessage);
        }  // if No Tables exists
        else if (err.code == "42P01") {
          pageMessage.checked = err.code;
          pageMessage.message = "No Tables exists or Messy database";
          pageMessage.results = err;
          login_validation_results.push(pageMessage);
        }  // if err 
        else if (err) {
          pageMessage.checked = err.code;
          pageMessage.message = "Error: " + JSON.stringify(err);
          pageMessage.results = err;
          login_validation_results.push(pageMessage);
        }  // if any else
        else {
          pageMessage.checked = "";
          pageMessage.message = "Internal Error";
          pageMessage.results = "Internal Error";
          login_validation_results.push(pageMessage);
        }
        callback(null, login_validation_results);
    });
}
module.exports = validate_user_auth;