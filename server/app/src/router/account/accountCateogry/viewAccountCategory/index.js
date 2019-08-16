// viewAccountCategory - Router 
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
     
	viewAccountCategory
*/
// viewAccountCategory | Keep it minimal
const async = require('async');

const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');

const { view_ALL_accountCategory } = require('../../../../config/statement/accountCategory_statement');

// viewAccountCategory
const viewAccountCategory = function (req, res, next) {
    // viewAccountCategory
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
        const viewAccountCategoryResult = [];
        // Payload bzz
        const payLoad = {
            fannyPack_serial: req.body.fannyPack_serial
        };
        // if all good
        // Async Waterfall
        async.waterfall([
        // viewAccountCategory
        function (callback) {
            using_blingblaw(callback, view_ALL_accountCategory, payLoad, viewAccountCategoryResult)
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
            res.send({ pageMesage: viewAccountCategoryResult });
        });
    }
}
module.exports = viewAccountCategory;



