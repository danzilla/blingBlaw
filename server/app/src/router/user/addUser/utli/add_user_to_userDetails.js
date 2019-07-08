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
let pushD = { checked: "", results: "" };
// User Details
// Function - Insert user to userDetails Table
const add_user_to_userDetails = function (callback, userData, add_user_result) {
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
                    "( user_created, user_auth_serial )" + 
                    "VALUES($1, $2) RETURNING *";
    // Insert Data
    const userAddData = [
      userData.userCreated,
      userData.userSerial 
    ];
    // Add to user_details
    if (add_user_result[0].checked == "checked") {  // If NO issue with user_auth
      // SQL Query - Fire
      danzillaDB.pool.query(userAddQuery, userAddData,
        // err catch
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
    } else { //if Error adding to user_auth
      pushD.checked = "";
      pushD.results = "Error - Didn't procced with adding user_details";
      add_user_result.push(pushD);
      callback(null, add_user_result);
    }
  console.log(JSON.stringify(add_user_result));
}
module.exports = add_user_to_userDetails;