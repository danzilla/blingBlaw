/* FirstRun
 * Async Action 
 * Keep it minimal
 */
/* SQL statementz - FirstRun
 *
 * database_Name - blingblaw_assets
 * │
 * └───Schema - users
 * |   │   Table - user_auth - user_id
 * |   │   Table - user_details - user_id
 * │   │   Table - fannypacks - fannypacks_id
 * └───Schema - fannypacks
 * |   │   Table - account_category - account_category_id
 * │   │   Table - account_type - account_type_id
 * │   │   Table - account_record - account_id
 * │   │   Table - account_One - account_id
 *
   Create - FirstRun
    - Requirement
        - > No-input require
    - Create Database
        - create blingBlaw
    - Create Schema
        - create users_assets
    - Create Table
        - create users_assets.user_auth_table
        - create users_assets.user_details_table
        - create users_assets.fannypacks_table
*/

// Async Waterfall
const async = require('async');

// initial Database 
const initiateDB = function (req, res, next) {
    // Check list for firstRunCheck
    const firstRunCheck = {
        create_Database_assets: "",
        create_schema_user: "",
        create_table_userAuth: "",
        create_table_userDetails: "",
        create_table_userRecord: ""
    }
    // Import FirstRun
    const FirstRun = {
        create_Database: require("./utli/create_database"),
        create_Schema: require("./utli/create_schema"),
        create_Table_UserAuth: require("./utli/create_table_userAuth"),
        create_Table_UserDetails: require("./utli/create_table_userDetails"),
        create_Table_fannyPackz: require("./utli/create_table_fannyPackz")
    }

    // Async Waterfall 
    async.waterfall([
            // Create Database
        function (callback) {
            FirstRun.create_Database(callback, firstRunCheck)
        },  // Create Schema - create_Schema
        function (result_create_Database, callback) {
            FirstRun.create_Schema(callback, firstRunCheck)
        }, // Create Table - create_Table_UserAuth
        function (result_create_Schema, callback) {
            FirstRun.create_Table_UserAuth(callback, firstRunCheck)
        }, // Create Table - create_Table_UserDetails
        function (result_create_Table_UserAuth, callback) {
            FirstRun.create_Table_UserDetails(callback, firstRunCheck)
        }, // Create Table - create_Table_fannyPackz
        function (result_create_Table_UserDetails, callback) {
            FirstRun.create_Table_fannyPackz(callback, firstRunCheck)
        }
    ], function (err, result) {

        // PageMessage
        let pageMesage = ""

        if (result) { pageMesage = "Result: " + JSON.stringify(result); } 
        else { pageMesage = "Error: " + err; } 
        console.log("\n \n" + pageMesage);

        res.send({
            pageMesage: pageMesage,
            firstRunCheck: firstRunCheck,
        })
    });
}
module.exports.initiateDB = initiateDB;



