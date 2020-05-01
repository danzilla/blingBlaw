// Router - FannyPack
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
     
	create_schema_user_fannyPack
	create_table_account_category
	create_table_account_records
	create_table_account_types
	add_newFannyPack_to_fannypacks_table
*/
// Register FannyPack | Keep it minimal
const async = require('async');
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time

const { using_blingblaw } = require('../../../config/util/process_sql_mutation');

const { create_schema_user_fannyPack, 
		add_newFannyPack_to_fannypacks_table } = require('../../../config/statement/fannyPack_sql_statement');

const { create_accountTransaction_table } = require('../../../config/statement/accountTransaction_sql_statement');
const { create_accountCategory_table } = require('../../../config/statement/accountCategory_statement');
const { create_accounType_table } = require('../../../config/statement/accountType_sql_statement');
const { create_accountRecords_table } = require('../../../config/statement/accountRecord_sql_statement');

// addFanny
// Require - FannyPack_name
const addFanny = function (req, res, next) {
	// addFanny
	let pageMessage = { 
		title:"addFanny", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Get FannyPack name
	if(!req.body.fannyPack || !req.body.userSerial) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Fanny Name require";
		pageMessage.message = "FannyPack name require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.fannyPack && req.body.userSerial) {
		// If alll good
		// Collect Results
		const addFannyPackResult = [];
		// Payload bzz
		const payLoad = {
			fannyPack_serial: Token.generate(),
			fannyPack_name: req.body.fannyPack,
			fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			fannyPack_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			fannyPack_owner_serial: req.body.userSerial
		};
		// Async Waterfall
		async.waterfall([
			// create_schema_user_fannyPack
		function (callback) {
			using_blingblaw(callback, create_schema_user_fannyPack, payLoad, addFannyPackResult)
		}, // add_newFannyPack_to_fannypacks_table
		function (res, callback) {
			if (res.checked === "checked"){
				using_blingblaw(callback, add_newFannyPack_to_fannypacks_table, payLoad, addFannyPackResult)
			} else {
				callback(null, res)
			}
		}, // create_accountCategory_table
		function (res, callback) {
			if (res.checked === "checked"){
				using_blingblaw(callback, create_accountCategory_table, payLoad, addFannyPackResult)
			} else {
				callback(null, res)
			}
		}, // create_accounType_table
		function (res, callback) {
			if (res.checked === "checked"){
				using_blingblaw(callback, create_accounType_table, payLoad, addFannyPackResult)
			} else {
				callback(null, res)
			}
		}, // create_accountRecords_table
		function (res, callback) {
			if (res.checked === "checked"){
				using_blingblaw(callback, create_accountRecords_table, payLoad, addFannyPackResult)
			} else {
				callback(null, res)
			}
		}], function (err, Results) {
			if (addFannyPackResult[0].checked === "checked" &&
				addFannyPackResult[1].checked === "checked" &&
				addFannyPackResult[2].checked === "checked" &&
				addFannyPackResult[3].checked === "checked" &&
				addFannyPackResult[4].checked === "checked") {
				// pageMessage
				pageMessage.checked = addFannyPackResult[0].checked;
				pageMessage.message = "FannyPack added!";
				pageMessage.result = addFannyPackResult;
			} else if (Results) {
                // pageMessage
                pageMessage.checked = Results.checked;
                pageMessage.message = Results.message;
                pageMessage.result = Results;
            } else if (err) {
                // pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Error getting the info";
                pageMessage.result = err;
            }
			res.send({ pageMesage: pageMessage });
		});
	}
}
module.exports = addFanny;



