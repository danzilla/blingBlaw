// REST - Router - First Run and Initial_Database
/* First Run

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
     
	kill_connection
	drop_Database
	create_Database
    create_Schema
	create_Table_UserAuth
	create_Table_UserDetails
	create_Table_fannyPackz
*/

const async = require('async');
const { using_blingblaw,
		using_postgresDefault } = require('../../../config/util/process_sql_query');
const { kill_connection, 
		drop_app_Database,
		create_app_Database,
		create_app_Schema } = require('../../../config/statement/firstRun_sql_statement');
const { create_Table_UserAuth,
		create_Table_UserDetails } = require('../../../config/statement/user_sql_statement');
const { create_Table_fannyPackz } = require('../../../config/statement/fannyPack_sql_statement');
// initiate Database build Brrrr
const initialDatabase = function (req, res, next) {
	// pageMessage
	let pageMessage = { 
		title:"Intial Database setup", 
		checked: "", 
		message: "", 
		result: "" 
	};
	// Collect Recults
	const FirstRunResults = [];
	// Async Waterfall
    async.waterfall([
            // kill_connection
        function (callback) {
			using_postgresDefault(callback, kill_connection, FirstRunResults)
        },  // drop_app_Database
        function (res, callback) {
			using_postgresDefault(callback, drop_app_Database, FirstRunResults)
		}, // create_app_Database
		function (res, callback) {
			using_postgresDefault(callback, create_app_Database, FirstRunResults)
		}, // create_app_Schema
		function (res, callback) {
			using_blingblaw(callback, create_app_Schema, FirstRunResults)
		}, // create_Table_UserAuth
		function (res, callback) {
			using_blingblaw(callback, create_Table_UserAuth, FirstRunResults)
		}, // create_Table_UserDetails
		function (res, callback) {
			using_blingblaw(callback, create_Table_UserDetails, FirstRunResults)
		}, // create_Table_fannyPackz
		function (res, callback) {
			using_blingblaw(callback, create_Table_fannyPackz, FirstRunResults)
		}
    ], function (err, Results) {
		if (Results) {
			// pageMessage
			pageMessage.checked = Results.checked;
			pageMessage.message = Results.message;
			pageMessage.result = FirstRunResults;
		} else if (err) {
			// pageMessage
			pageMessage.checked = err.code;
			pageMessage.message = "Something wrong #bloop #bloop";
			pageMessage.result = FirstRunResults;
		}
        res.send({ pageMessage: pageMessage });
    });
}
module.exports = initialDatabase;



