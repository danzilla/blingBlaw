// accountTransaction - Router
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

const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');

const { create_accountTransaction_table } = require('../../../../config/statement/account_sql_statement');
const { add_newAccount_to_accountRecord } = require('../../../../config/statement/accountRecord_sql_statement');

// addAccountTransaction
// Require
const addAccountTransaction = function (req, res, next) {
	// addAccountTransaction
	let pageMessage = { 
		title:"addAccountTransaction", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Get FannyPack name
	if(!req.body.fannyPack || !req.body.userSerial) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Inputs are require";
		pageMessage.message = "Inputs are require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.fannyPack && req.body.userSerial) { 
		// If alll good
		// Collect Results
		const addAccountTransactionResult = [];
		// Payload bzz
		const payLoad = {
			account_type_id: req.body.accountType,
			account_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			account_serial: Token.generate(),
			account_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			account_owner_serial: req.body.userSerial,
			fannyPack_serial: req.body.fannyPack
		};
		// Async Waterfall
		async.waterfall([
		// create_schema_user_fannyPack
		function (callback) {
			using_blingblaw(callback, create_accountTransaction_table, payLoad, addAccountTransactionResult)
		}, // add_newFannyPack_to_fannypacks_table
		function (res, callback) {
			using_blingblaw(callback, add_newAccount_to_accountRecord, payLoad, addAccountTransactionResult)
		}], function (err, Results) {
			if (Results) {
				if (Results.checked === "23505"){
					// pageMessage
					pageMessage.checked = Results.checked;
					pageMessage.message = "Account alredy exists";
					pageMessage.result = Results.result;
				} else {
					// pageMessage
					pageMessage.checked = Results.checked;
					pageMessage.message = Results.message;
					pageMessage.result = Results.result;
				}
            } else if (err) {
                // pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Error adding the info";
                pageMessage.result = err;
            }
			res.send({ pageMesage: addAccountTransactionResult });
		});
	}
}
module.exports = addAccountTransaction;



