/* SQL statementz - Login user
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

validate_user_auth(userData)
update_user_to_userDetails(userData)
*/
// Login user | Keep it minimal
const async = require('async');
// Time and Date
const moment = require('moment');
// bling
const create_schema_user_fannyPack = require("../../../modules/statements/fannyPack/addFannyPack/create_schema_user_fannyPack");

const validate_user_auth = require("../../../modules/statements/user/loginUser/validate_user_to_userAuth");
const update_user_userDetails = require("../../../modules/statements/user/loginUser/update_user_to_userDetails");
// Login user - pageMessage
let pageMessage = {
  title: "login_user", 
  checked: "", 
  message: "", 
  results: "" 
};
// Collect login_validation_results 
let login_validation_results = {
  validate_user_auth: "",
  update_user_userDetails: ""
};
// POST
// login Dawg
const login = function(req, res, next) {
  // Prep userData
  let userData = {
    userName: req.body.uname,
    password: req.body.pwd,
    userSerial: "nada",
    userLastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  }
  // If req.body == Empty 
  if (!req.body.uname || !req.body.pwd) {
      // pageMessage
      pageMessage = {
        checked: "Empty-field",
        message: "Cannot be empty fields",
        results: "nada"
      }; res.send({ pageMessage: pageMessage, loginValidationResults: "nada" });
  } // If fields are good
  else if (req.body.uname && req.body.pwd) {
    // Async Action #Fire #brrr
    async.waterfall([
          // Login Auth
      function (callback) {
          // Validate user login
        validate_user_auth(callback, userData, login_validation_results);
      },  // Add to user_details
      function (validate_userAuth_result, callback) {
          // If Auth is good | upate user record
        if (validate_userAuth_result.checked === "checked") {
          // Set user_serial
          userData.userSerial = validate_userAuth_result.results.user_serial;
          // Update user with user_details
          update_user_userDetails(callback, userData, login_validation_results);
        } else { // If update not proceed
          // pageMessage
          pageMessage = {
            title: "update_user_userDetails",
            checked: validate_userAuth_result.checked,
            message: validate_userAuth_result.message + " - Didn't proceed with update",
            results: "Error - Did not procced with user_add_to_userDetails"
          }; login_validation_results.update_user_userDetails = pageMessage;
          callback(null, pageMessage);
        }
      }
    ], function (err, Results) {
        // prepare - pageMessage
        if (err) {
          // if err
          pageMessage.title = pageMessage.title;
          pageMessage.checked = "Internal-error " + pageMessage.title;
          pageMessage.message = "Internal-error " + pageMessage.title;
          pageMessage.results = "Internal-error " + pageMessage.title;
        } else if (Results) {
          // if Validation and Update is good
          // Get the First-Obj message
          pageMessage.title = login_validation_results.validate_user_auth.title;
          pageMessage.checked = login_validation_results.validate_user_auth.checked;
          pageMessage.message = login_validation_results.validate_user_auth.message;
          pageMessage.results = login_validation_results.validate_user_auth.results;
        }
        // blaze
        res.send({
          pageMessage: pageMessage,
          loginValidationResults: login_validation_results
        });
    });
  }
}
module.exports = login;
