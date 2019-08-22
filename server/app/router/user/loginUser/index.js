// Authentication - Router 
/* 
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
     
	validate_user_login
	update_userDetails
*/
// Register user | Keep it minimal
const async = require('async');
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time

const { using_blingblaw } = require('../../../config/util/process_sql_mutation');

const { validate_user_login, 
		update_userDetails } = require('../../../config/statement/user_sql_statement');

// loginUser
const loginUser = function (req, res, next) {
    // loginUser
	let pageMessage = { 
        title:"loginUser", 
        checked: "", 
		message: "", 
		result: "" 
	};
    // Get Login requirement
	if(!req.body.userName || !req.body.userPassword) {
		// pageMessage
        pageMessage.checked = "errr";
        pageMessage.message = "User inputs are require";
		pageMessage.result = "Credentials are require";
		res.send({ pageMessage: pageMessage });
	} else if (req.body.userName && req.body.userPassword) {
        // Collect Results
        const loginUserResult = [];
        // Payload bzz
        const payLoad = {
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            user_auth_serial: "req.body.userSerial",
            user_auth_token: Token.generate(),
            user_lastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // validate_user_login
        function (callback) {
            using_blingblaw(callback, validate_user_login, payLoad, loginUserResult);
        }, // update_userDetails
        function (res, callback) {
            if (res.result.rowCount === 1) {
                // if logged in good, get user_serial
                payLoad.user_auth_serial = res.result.rows[0].user_serial;
                using_blingblaw(callback, update_userDetails, payLoad, loginUserResult);
            } else {
                callback(null, res)
            }
        }], function (err, Results) {
            // GOING to cobine these into One SQL statement - TODO
            // For now
            if (loginUserResult[0].result.rowCount === 0){
                pageMessage.message = "Incorrect credentials";
                pageMessage.checked = "nada";
                pageMessage.result = "#bloop";
            } else if (loginUserResult[0].result.rowCount === 1) {
                pageMessage.message = "Logged in, " + loginUserResult[0].result.rows[0].user_name;
                pageMessage.checked = loginUserResult[0].checked;
                pageMessage.result = loginUserResult[0].result.rows[0];
            } else if (Results) {
                // pageMessage
                pageMessage.checked = Results.checked;
                pageMessage.message = Results.message;
                pageMessage.result = "Something not right..";
            } else if (err) {
                // pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Something wrong #bloop #bloop";
                pageMessage.result = err;
            }
            console.log(JSON.stringify(pageMessage));
            
            res.send({ pageMessage: pageMessage });
        });
    }
}
module.exports = loginUser;