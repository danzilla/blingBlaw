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
// Time and Date
const moment = require('moment'); // Time
// bling
const validate_user_auth = require("./utli/validate_user_to_userAuth");
const update_user_userDetails = require("./utli/update_user_to_userDetails");

// POST
// login module
const login = function(req, res, next) {


  console.log("req.body" + JSON.stringify(req.body));

  let userData = {
    userName: req.body.uname,
    password: req.body.pwd,
    userSerial: "nada",
    userLastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  }
  // collect login_validation_results 
  let login_validation_results = []
  

  
  // Login User - pageMessage
  let pageInfo = {
    pageCode: "",
    pageMessage: ""
  };
  // If req.body == Empty 
  if (!req.body.uname || !req.body.pwd) {
    pageInfo.pageMessage = "Error! cannot be empty fields";
    pageInfo.pageGood = false;
  } // if fields are good
  else if (req.body.uname && req.body.pwd) {
    // Request DB conections
    const danzillaDB = require("../../../modules/danzillaDB");
    // TO DO - LIMIT search collumn - * - testing
    let query = 'SELECT * FROM users.user_auth ' +
      'WHERE user_name = $1 AND user_pwd_hash = $2 LIMIT 1;';
    // NEED TO Validate and Optimize 
    let loginPayLoad = [
      req.body.uname,
      req.body.pwd
    ]
    // Blaaaaze #yee
    danzillaDB.pool.query(query, loginPayLoad, function (err, result) {
      if (err) {
        // if err
        pageInfo.pageMessage = err;
        if (err.code == "ENOTFOUND") {
          pageInfo.pageMessage = "Trouble connecting to database - Is it [prod or dev?] - configure in app.db.js in server" + err.code;
        } else if (err.code == "ECONNREFUSED") {
          pageInfo.pageMessage = "Trouble connecting to database - Restart Docker or DB is not avilable - " + err.code;
        } else if (err.code == "3D000" || err.code == "42P01") {
          pageInfo.pageMessage = "Database not inintialize " + err.code;
        }
        pageInfo.pageCode = err.code;
      } else if (result) {
        // if result = 1 and pwd match // Credentials are matched
        if (result.rowCount == 1 && result.rows[0].user_pwd_hash == req.body.pwd) {
          pageInfo.pageMessage = "Logged in! " + result.rows[0].user_name;
          pageInfo.pageCode = true;
        } else {  // if password and row count is NOT one
          pageInfo.pageMessage = "Incorrect password";
          pageInfo.pageCode = false;
        }
      }
      // fire
      res.send({ pageInfo: pageInfo });
      console.log(JSON.stringify(pageInfo));
    });
  }
}
module.exports = login;
