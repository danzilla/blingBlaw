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
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
// https://www.npmjs.com/package/uuid-token-generator
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
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
		message: "", 
		checked: "", 
		result: "" 
	};
    // Get Login requirement
	if(!req.body.userName || !req.body.password || !req.body.userSerial) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Credentials are require";
		pageMessage.message = "User inputs are require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.userName && req.body.password && req.body.userSerial) {
        // Collect Results
        const loginUserResult = [];
        // Payload bzz
        const payLoad = {
            userName: req.body.userName,
            userPassword: req.body.password,
            user_auth_serial: req.body.userSerial,
            user_auth_token: Token.generate(),
            user_lastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // validate_user_login
        function (callback) {
            using_blingblaw(callback, validate_user_login, payLoad, loginUserResult)
        }, // update_userDetails
        function (res, callback) {
            using_blingblaw(callback, update_userDetails, payLoad, loginUserResult)
        }], function (err, Results) {
            console.log("Results: " + JSON.stringify(Results));
            console.log("err: " + JSON.stringify(err));
            res.send({ pageMesage: loginUserResult });
        });
    }
}
module.exports = loginUser;



