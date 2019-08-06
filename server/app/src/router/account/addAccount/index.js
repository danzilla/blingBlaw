// REST - Router - Account
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
     
	create_accountTransaction_table
	add_newAccount_to_accountRecord
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

const { using_blingblaw } = require('../../../config/util/process_sql_mutation');

const { create_accountTransaction_table } = require('../../../config/statement/account_sql_statement');
const { add_newAccount_to_accountRecord } = require('../../../config/statement/accountRecord_sql_statement');

// addAccount
// Require - 
const addAccount = function (req, res, next) {
	// addAccount
	let pageMessage = { 
		title:"addAccount", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Collect Results
	const addAccountResult = [];
	// Payload bzz
	const payLoad = {
		account_type_id: req.body.accountType,
		account_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
		account_serial: Token.generate(),
		account_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
		account_owner_serial: req.body.userSerial,
		fannyPack_serial: req.body.fannyPack
	};
	// Get FannyPack name
	if(!req.body.fannyPack || !req.body.userSerial) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Inputs are require";
		pageMessage.message = "Inputs are require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.fannyPack && req.body.userSerial) { // If alll good
		// Async Waterfall
		async.waterfall([
				// create_schema_user_fannyPack
			function (callback) {
				using_blingblaw(callback, create_accountTransaction_table, payLoad, addAccountResult)
			}, // add_newFannyPack_to_fannypacks_table
			function (res, callback) {
				using_blingblaw(callback, add_newAccount_to_accountRecord, payLoad, addAccountResult)
			}
		], function (err, Results) {
			console.log("Results: " + JSON.stringify(Results));
			console.log("err: " + JSON.stringify(err));
			res.send({ pageMesage: addAccountResult });
		});
	}
}
module.exports = addAccount;



