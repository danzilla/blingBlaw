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

const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');

const { view_ALL_accountRecord } = require('../../../../config/statement/accountRecord_sql_statement');

// viewAllAccounts
const viewAllAccounts = function (req, res, next) {
    // viewAllAccounts
	let pageMessage = { 
		title:"view_ALL_account", 
		message: "", 
		checked: "", 
		result: "" 
	};
	if(!req.body.fannyPack) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Valid user and fannyPack require";
		pageMessage.message = "Valid user and fannyPack require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.fannyPack) {
        // Collect Results
        const viewAllAccountsResult = [];
        // Payload bzz
        const payLoad = {
            fannyPack_serial: req.body.fannyPack
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewAllAccounts
        function (callback) {
            using_blingblaw(callback, view_ALL_accountRecord, payLoad, viewAllAccountsResult)
        }], function (err, Results) {
            if (Results) {
                // pageMessage
                pageMessage.checked = Results.checked;
                pageMessage.message = Results.message;
                pageMessage.result = Results.result.rows;
            } else if (err) {
                // pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Error viewing the info";
                pageMessage.result = err;
            }
            res.send({ pageMessage: pageMessage });
        });
    }
}
module.exports = viewAllAccounts;



