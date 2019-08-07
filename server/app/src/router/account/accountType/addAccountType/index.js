// accountType - Router
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
     
	add_newAccountCategory_to_accountCategory
*/
// Register FannyPack | Keep it minimal
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
// https://www.npmjs.com/package/uuid-token-generator
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time

const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');
// addAccountType
const { add_newAccountType_to_accountType } = require('../../../../config/statement/accountType_sql_statement');
// Require
const addAccountType = function (req, res, next) {
	// addAccountType
	let pageMessage = { 
		title:"addAccountType", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Collect Results
	const addAccountTypeResult = [];
	// Payload bzz
	const payLoad = {
		account_type_name: req.body.accountTypeName,
		account_type_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
		account_type_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
		fannyPack_serial: req.body.userSerial
	};
	// Get accountTypeName
	if (!req.body.userSerial || !req.body.accountTypeName) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Inputs are require";
		pageMessage.message = "Inputs are require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.userSerial && req.body.accountTypeName) { // If alll good
		// Async Waterfall
		async.waterfall([
				// add_newAccountType_to_accountType
			function (callback) {
				using_blingblaw(callback, add_newAccountType_to_accountType, payLoad, addAccountTypeResult)
			}
		], function (err, Results) {
			console.log("Results: " + JSON.stringify(Results));
			console.log("err: " + JSON.stringify(err));
			res.send({ pageMesage: addAccountTypeResult });
		});
	}
}
module.exports = addAccountType;



