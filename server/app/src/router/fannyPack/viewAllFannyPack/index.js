// viewAllFannyPackz - Router 
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
     
	viewAllFannyPackz
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

const { view_ALL_fannyPackz } = require('../../../config/statement/fannyPack_sql_statement');

// viewAllFannyPackz
const viewAllFannyPackz = function (req, res, next) {
    // viewAllFannyPackz
	let pageMessage = { 
		title:"viewAllFannyPackz", 
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
        const viewAllFannyPackzResult = [];
        // Payload bzz
        const payLoad = {
            user_serial: req.body.userSerial
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewAllFannyPackz
        function (callback) {
            using_blingblaw(callback, view_ALL_fannyPackz, payLoad, viewAllFannyPackzResult)
        }], function (err, Results) {
            console.log("Results: " + JSON.stringify(Results));
            console.log("err: " + JSON.stringify(err));
            res.send({ pageMesage: viewAllFannyPackzResult });
        });
    }
}
module.exports = viewAllFannyPackz;



