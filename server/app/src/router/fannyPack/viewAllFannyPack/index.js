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
            res.send({ pageMessage: pageMessage });
        });
    }
}
module.exports = viewAllFannyPackz;



