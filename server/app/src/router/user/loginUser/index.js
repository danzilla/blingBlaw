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

validate_user_auth(userData)
update_user_to_userDetails(userData)
*/
// Login user | Keep it minimal
const async = require('async')
// Time and Date
const moment = require('moment')
// bling
const validate_user_auth = require("./utli/validate_user_to_userAuth")
const update_user_userDetails = require("./utli/update_user_to_userDetails")
// POST
// login module
const login = function(req, res, next) {
  // Collect login_validation_results 
  let login_validation_results = []
  // Login user - pageMessage
  let pageMessage = { title: "login_user", checked: "", message: "", results: "" }
  // Prep userData
  let userData = {
    userName: req.body.uname,
    password: req.body.pwd,
    userSerial: "nada",
    userLastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  }
  // If req.body == Empty 
  if (!req.body.uname || !req.body.pwd) {
    pageMessage.checked = "";
    pageMessage.message = "Error! cannot be empty fields";
    res.send({ pageMesage: pageMesage, loginValidationResults: "nada" });
  } // If fields are good
  else if (req.body.uname && req.body.pwd) {
    // Async Action #Fire
    async.waterfall([
           // Login Auth
      function (callback) {
          // Validate user login
        validate_user_auth(callback, userData, login_validation_results, pageMessage)
      },  // Add to user_details
      function (validate_userAuth_result, callback) {  
          // If Auth is good | upate user record
        if (validate_userAuth_result[0].checked === "checked"){
          // Set user_serial
          userData.userSerial = validate_userAuth_result[0].results.user_serial
          // Update user with user_details
          update_user_userDetails(callback, userData, login_validation_results, pageMessage)
        } else { // If update not proceed
          pageMessage.checked = validate_userAuth_result[0].checked
          pageMessage.message = validate_userAuth_result[0].message
          login_validation_results.push(pageMessage)
          callback(null, pageMessage)
        }
      }
    ], function (err, Results) {
        // prepare - pageMessage
        if (login_validation_results[0].checked == "checked" && 
            login_validation_results[1].checked == "checked" ) {
            // if Validation and Update is good
            pageMessage.checked = Results[0].checked
            pageMessage.message = Results[0].message
            pageMessage.results = Results[0].results
        } else {
          // if Validation and Update is bad
          // Get the First-Obj message
          pageMessage.checked = Results.checked
          pageMessage.message = Results.message
          pageMessage.results = Results.results
        }
        // blaze
        res.send({
          pageMessage: pageMessage,
          loginValidationResults: login_validation_results
        })
    });
  }
}
module.exports = login
