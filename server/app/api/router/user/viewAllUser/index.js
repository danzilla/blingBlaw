// viewAllUser - Router 
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
     
	viewAllUser
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

const { view_all_user } = require('../../../config/statement/user_sql_statement');

// viewAllUser
const viewAllUser = function (req, res, next) {
    // viewAllUser
	let pageMessage = { 
		title:"viewAllUser", 
		message: "", 
		checked: "", 
		result: "" 
	};
	if(!req.body.userSerial) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Valid user require";
		pageMessage.message = "Valid user require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.userSerial) {
        // Collect Results
        const viewAllUserResult = [];
        // Payload bzz
        const payLoad = {
            user_serial: req.body.userSerial
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewAllUser
        function (callback) {
            using_blingblaw(callback, view_all_user, payLoad, viewAllUserResult)
        }], function (err, Results) {
            if (Results) {
                // pageMessage
                pageMessage.checked = Results.checked;
                pageMessage.message = Results.message;
                pageMessage.result = Results.result.rows;
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
module.exports = viewAllUser;


