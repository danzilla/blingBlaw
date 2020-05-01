// UserAdd - Router
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
     
	add_user_to_userAuth
	add_user_to_userDetails
	create_schema_user_fannyPack
	create_table_account_category
	create_table_account_records
	create_table_account_types
	add_newFannyPack_to_fannypacks_table
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

const { add_user_to_userAuth, 
		add_user_to_userDetails } = require('../../../config/statement/user_sql_statement');
const { create_schema_user_fannyPack, 
		add_newFannyPack_to_fannypacks_table } = require('../../../config/statement/fannyPack_sql_statement');
const { create_accountCategory_table } = require('../../../config/statement/accountCategory_statement');
const { create_accounType_table } = require('../../../config/statement/accountType_sql_statement');
const { create_accountRecords_table } = require('../../../config/statement/accountRecord_sql_statement');

// Register user
const addUser = function (req, res, next) {
	// addUser
	let pageMessage = { 
		title:"addUser", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Get FannyPack name
	if (!req.body.userFannyPack || !req.body.userName  || !req.body.userPassword) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Inintial information are require";
		pageMessage.message = "All inputs are required";
		res.send({ pageMessage: pageMessage });
	} else if(req.body.userFannyPack && req.body.userName && req.body.userPassword) {
		// if all good
		// Collect Results
		const addUserResult = [];
		// Payload bzz
		const payLoad = {
			user_serial: uuidv5(req.body.userName, uuidv1()),
			user_name: req.body.userName,
			user_pwd_salt: Token.generate(),
			user_pwd_hash: req.body.userPassword,
			user_auth_token: Token.generate(),
			user_full_name: "",
			user_email: "",
			user_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			user_modify: "",
			user_lastLogged: "",
			get user_auth_serial(){ return this.user_serial },
			fannyPack_serial: Token.generate(),
			fannyPack_name: req.body.userFannyPack,
			fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			fannyPack_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			get fannyPack_owner_serial(){ return this.user_serial }
		};
		// Async Waterfall
		async.waterfall([
		// add_user_to_userAuth
		function (callback) {
			using_blingblaw(callback, add_user_to_userAuth, payLoad, addUserResult)
		},  // add_user_to_userDetails
		function (res, callback) {
			if(res.checked === "checked") {
				using_blingblaw(callback, add_user_to_userDetails, payLoad, addUserResult)
			} else {
				callback(null, res);
			}
		}, // create_schema_user_fannyPack
		function (res, callback) {
			if(res.checked === "checked"){
				using_blingblaw(callback, create_schema_user_fannyPack, payLoad, addUserResult)
			} else {
				callback(null, res);
			}
		}, // add_newFannyPack_to_fannypacks_table
		function (res, callback) {
			if(res.checked === "checked"){
				using_blingblaw(callback, add_newFannyPack_to_fannypacks_table, payLoad, addUserResult)
			} else {
				callback(null, res);
			}
		}, // create_accountCategory_table
		function (res, callback) {
			if(res.checked === "checked"){
				using_blingblaw(callback, create_accountCategory_table, payLoad, addUserResult)
			} else {
				callback(null, res);
			}
		}, // create_accounType_table
		function (res, callback) {
			if(res.checked === "checked"){
				using_blingblaw(callback, create_accounType_table, payLoad, addUserResult)
			} else {
				callback(null, res);
			}
		}, // create_accountRecords_table
		function (res, callback) {
			if(res.checked === "checked"){
				using_blingblaw(callback, create_accountRecords_table, payLoad, addUserResult)
			} else {
				callback(null, res);
			}
		}], function (err, Results) {
			if( addUserResult[0].checked === "checked" && 
				addUserResult[1].checked === "checked" && 
				addUserResult[2].checked === "checked" && 
				addUserResult[3].checked === "checked" && 
				addUserResult[4].checked === "checked" && 
				addUserResult[5].checked === "checked" && 
				addUserResult[6].checked === "checked" ){
					pageMessage.message = "User been added! " + payLoad.user_name;
					pageMessage.checked = addUserResult[0].checked;
					pageMessage.result = "#BlingBlaw";
			} else if (addUserResult[0].checked === "23505") {
				pageMessage.checked = "23505";
				pageMessage.message = "User already exits";
				pageMessage.result = "#Reset user pwd - todo..";
			} else if (Results) {
                // pageMessage
                pageMessage.checked = Results.checked;
                pageMessage.message = Results.message;
                pageMessage.result = "Something not right...";
            } else if (err) {
                // pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Something wrong #bloop #bloop";
                pageMessage.result = err;
            }
            res.send({ pageMessage: pageMessage });
		});
	}
}
module.exports = addUser;



