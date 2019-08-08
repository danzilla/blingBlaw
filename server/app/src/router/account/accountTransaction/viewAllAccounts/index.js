// viewAllAccounts - Router 
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
     
	viewAllAccounts
*/
// viewAllAccounts | Keep it minimal
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

const { view_ALL_accountRecord } = require('../../../../config/statement/accountRecord_sql_statement');

// viewAllAccounts
const viewAllAccounts = function (req, res, next) {
    // viewAllAccounts
	let pageMessage = { 
		title:"view_ALL_accountCategory", 
		message: "", 
		checked: "", 
		result: "" 
	};
	if(!req.body.fannyPack_serial) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Valid user and fannyPack require";
		pageMessage.message = "Valid user and fannyPack require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.fannyPack_serial) {
        // Collect Results
        const viewAllAccountsResult = [];
        // Payload bzz
        const payLoad = {
            fannyPack_serial: req.body.fannyPack_serial
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewAllAccounts
        function (callback) {
            using_blingblaw(callback, view_ALL_accountRecord, payLoad, viewAllAccountsResult)
        }], function (err, Results) {
            console.log("Results: " + JSON.stringify(Results));
            console.log("err: " + JSON.stringify(err));
            res.send({ pageMesage: viewAllAccountsResult });
        });
    }
}
module.exports = viewAllAccounts;



