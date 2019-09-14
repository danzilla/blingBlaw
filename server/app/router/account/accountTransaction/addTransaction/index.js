// addAccountTransaction - Router
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
     
	add_Transaction_to_accountTransaction
	update_AccountTranction_to_accountRecord
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
// Require blings
const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');
const { add_newTransaction_to_accountTransaction_table } = require('../../../../config/statement/accountTransaction_sql_statement');
// addTransaction
const addTransaction = function (req, res, next) {
	// addTransaction
	let pageMessage = {
		title:"addAccountTransaction", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Get FannyPack name
	if(!req.body.accountSerial || !req.body.transactions || !req.body.fannyPack) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Inputs are require";
		pageMessage.message = "Inputs are require";
		res.send({ pageMessage: pageMessage });
	} else if (req.body.transactions && req.body.accountSerial && req.body.fannyPack) {
		// If alll good
		// Collect Results
		const addAccountTransactionResult = [];
		let payLoad = {
			isExtra: true,
			extraPayLoad: [],
			account_serial: req.body.accountSerial,
			account_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			account_owner_serial: req.body.userSerial,
			fannyPack_serial: req.body.fannyPack
		}
		// Async Waterfall
		async.waterfall([
		// add_newTransaction_to_accountTransaction_table
		function (callback) {
			if (req.body.transactions && Array.isArray(req.body.transactions)) {
				req.body.transactions.map((result, i) => {
					if(result.transaction_Deposits === ""){
						result.transaction_Deposits = null;
					} if(result.transaction_Withdrawls === ""){
						result.transaction_Withdrawls = null;
					} if(result.transaction_Balance === ""){
						result.transaction_Balance = null;
					}
					payLoad.extraPayLoad.push([
						Token.generate(),
						result.transaction_Date,
						result.transaction_Desc,
						result.transaction_Deposits,
						result.transaction_Withdrawls,
						result.transaction_Balance,
						`{${result.transaction_Category}}`,
						result.transaction_Comments,
						`{${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}}`,
						req.body.userSerial
					]);
				});
			}
			using_blingblaw(callback, add_newTransaction_to_accountTransaction_table, payLoad, addAccountTransactionResult);
		}], function (err, Results) {
			if (Results) {
				// pageMessage
				pageMessage.checked = Results.checked;
				pageMessage.message = Results.message;
				pageMessage.result = Results.result;
            } else if (err) {
				// pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Error inserting transaction info";
				pageMessage.result = err;
			}
			res.send({ pageMessage: pageMessage });
		});
	}
}
module.exports = addTransaction;



