// viewAllTransaction - Router 
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
     
	viewAllTransaction
*/
// viewAllTransaction | Keep it minimal
const async = require('async');

const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');

const { view_ALL_accountTransaction } = require('../../../../config/statement/account_sql_statement');

// viewAllTransaction
const viewAllTransaction = function (req, res, next) {
    // viewAllTransaction
	let pageMessage = { 
		title:"view_ALL_Transaction", 
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
        const viewAllTransactionResult = [];
        // Payload bzz
        const payLoad = {
            fannyPack_serial: req.body.fannyPack,
            account_serial: req.body.account_serial
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewAllTransaction
        function (callback) {
            using_blingblaw(callback, view_ALL_accountTransaction, payLoad, viewAllTransactionResult)
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
module.exports = viewAllTransaction;



