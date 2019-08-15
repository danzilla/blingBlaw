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
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
// https://www.npmjs.com/package/uuid-token-generator
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time

const { using_blingblaw } = require('../../../config/util/process_sql_mutation');

const { create_schema_user_fannyPack, 
		add_newFannyPack_to_fannypacks_table } = require('../../../config/statement/fannyPack_sql_statement');

const { create_accountTransaction_table } = require('../../../config/statement/account_sql_statement');
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
			using_blingblaw(callback, add_newFannyPack_to_fannypacks_table, payLoad, addFannyPackResult)
		}, // create_accountCategory_table
		function (res, callback) {
			using_blingblaw(callback, create_accountCategory_table, payLoad, addFannyPackResult)
		}, // create_accounType_table
		function (res, callback) {
			using_blingblaw(callback, create_accounType_table, payLoad, addFannyPackResult)
		}, // create_accountRecords_table
		function (res, callback) {
			using_blingblaw(callback, create_accountRecords_table, payLoad, addFannyPackResult)
		}], function (err, Results) {
			console.log("Results: " + JSON.stringify(Results));
			console.log("err: " + JSON.stringify(err));
			res.send({ pageMesage: addFannyPackResult });
		});
	}
}
module.exports = addFanny;



