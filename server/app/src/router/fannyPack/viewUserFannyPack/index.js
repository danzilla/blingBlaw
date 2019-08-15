// viewUserFannyPack - Router 
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
     
	viewUserFannyPackz
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

const { view_user_fannyPackz } = require('../../../config/statement/fannyPack_sql_statement');

// viewUserFannyPackz
const viewUserFannyPackz = function (req, res, next) {
    // viewUserFannyPackz
	let pageMessage = { 
		title:"viewUserFannyPackz", 
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
        const viewUserFannyPackzResult = [];
        // Payload bzz
        const payLoad = {
            user_serial: req.body.userSerial
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewUserFannyPackz
        function (callback) {
            using_blingblaw(callback, view_user_fannyPackz, payLoad, viewUserFannyPackzResult)
        }], function (err, Results) {
            console.log("Results: " + JSON.stringify(Results));
            console.log("err: " + JSON.stringify(err));
            res.send({ pageMesage: viewUserFannyPackzResult });
        });
    }
}
module.exports = viewUserFannyPackz;



