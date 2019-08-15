// accountCategory - Router
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
     
	add_newAccountCategory_to_accountCategory
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

const { using_blingblaw } = require('../../../../config/util/process_sql_mutation');
// addAccountCategory
const { add_newAccountCategory_to_accountCategory } = require('../../../../config/statement/accountCategory_statement');
// Require
const addAccountCategory = function (req, res, next) {
	// addAccountCategory
	let pageMessage = { 
		title:"addAccountCategory", 
		message: "", 
		checked: "", 
		result: "" 
	};
	// Get categoryName name
	if (!req.body.userSerial || !req.body.categoryName || !req.body.categoryParent) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "Inputs are require";
		pageMessage.message = "Inputs are require";
		res.send({ pageMesage: pageMessage });
	} else if (req.body.userSerial && req.body.categoryName && req.body.categoryParent) { 
		// If alll good
		// Collect Results
		const addAccountCategoryResult = [];
		// Payload bzz
		const payLoad = {
			category_id: Token.generate(),
			category_name: req.body.categoryName,
			category_parent: req.body.categoryParent,
			category_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			category_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			fannyPack_serial: req.body.userSerial
		};
		// Async Waterfall
		async.waterfall([
		// add_newAccountCategory_to_accountCategory
		function (callback) {
			using_blingblaw(callback, add_newAccountCategory_to_accountCategory, payLoad, addAccountCategoryResult)
		}], function (err, Results) {
			console.log("Results: " + JSON.stringify(Results));
			console.log("err: " + JSON.stringify(err));
			res.send({ pageMesage: addAccountCategoryResult });
		});
	}
}
module.exports = addAccountCategory;



