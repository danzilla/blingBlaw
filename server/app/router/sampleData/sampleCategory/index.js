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

const { accountCategory } = require('../../../config/app.sampleData');

const { using_blingblaw } = require('../../../config/util/process_sql_mutation');
// addAccountCategory
const { add_newAccountCategory_to_accountCategory } = require('../../../config/statement/accountCategory_statement');
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
	if (!req.body.fannyPack) {
		// pageMessage
		pageMessage.checked = "errr";
		pageMessage.result = "fannyPack are require";
		pageMessage.message = "Valid fannyPack require";
		res.send({ pageMessage: pageMessage });
	} else if (req.body.fannyPack) { 
		// If alll good
		// Collect Results
		const addAccountCategoryResult = [];
		// Async Waterfall
		async.waterfall([
		// add_newAccountCategory_to_accountCategory
		function (callback) {
			// Sample category PayLoad
			const categoryPayLoad = [];
			accountCategory.map((rootCat, i) => {
				let parentSerial = Token.generate();
				let payLoad = [
					parentSerial,
					rootCat.parent,
					"rootCategory",
					moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
					moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
					req.body.fannyPack
				]; categoryPayLoad.push(payLoad)
				if(rootCat.child){
					rootCat.child.map((childCat, z) => {
						let childSerial = Token.generate();
						let payLoad = [
							childSerial,
							childCat,
							parentSerial,
							moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
							moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
							req.body.fannyPack
						]; categoryPayLoad.push(payLoad)
					});
				}
			});
			let payLoad = {
				isExtra: true,
				extraPayLoad: categoryPayLoad,
				fannyPack_serial: req.body.fannyPack
			}
			console.log("categoryPayLoad: " + JSON.stringify(categoryPayLoad));
			using_blingblaw(callback, add_newAccountCategory_to_accountCategory, payLoad, addAccountCategoryResult)
		}], function (err, Results) {
			if (Results) {
				if (Results.checked === "23505"){
					// pageMessage
					pageMessage.checked = Results.checked;
					pageMessage.message = "Category alredy exists";
					pageMessage.result = Results.result;
				} else {
					// pageMessage
					pageMessage.checked = Results.checked;
					pageMessage.message = Results.message;
					pageMessage.result = Results.result;
				}
            } else if (err) {
                // pageMessage
                pageMessage.checked = err.code;
                pageMessage.message = "Error Adding the info";
                pageMessage.result = err;
            }
			res.send({ pageMessage: addAccountCategoryResult });
		});
	}
}
module.exports = addAccountCategory;



