/* SQL statementz - FirstRun
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
// Import FirstRun
const FirstRun = {
    kill_connection: require("./utli/kill_connection"),
    drop_Database: require("./utli/drop_database"),
    create_Database: require("./utli/create_database"),
    create_Schema: require("./utli/create_schema"),
    create_Table_UserAuth: require("./utli/create_table_userAuth"),
    create_Table_UserDetails: require("./utli/create_table_userDetails"),
    create_Table_fannyPackz: require("./utli/create_table_fannyPackz")
}
// Collect FirstRunCheck
const First_Run_Check_Result = []
// Initiate Database 
const initiateDB = function (req, res, next) {
    // Async Waterfall
    async.waterfall([
            // Drop Database
        function (callback) {
            FirstRun.drop_Database(callback, First_Run_Check_Result)
        },  // Create Database
        function (result_drop_Database, callback) {
            // If any active session - Kill
            if (result_drop_Database[0].results.code == "55006"){
                FirstRun.kill_connection(First_Run_Check_Result);
            } FirstRun.create_Database(callback, First_Run_Check_Result);
        },  // Create Schema - create_Schema
        function (result_create_Database, callback) {
            FirstRun.create_Schema(callback, First_Run_Check_Result);
        }, // Create Table - create_Table_UserAuth
        function (result_create_Schema, callback) {
            FirstRun.create_Table_UserAuth(callback, First_Run_Check_Result);
        }, // Create Table - create_Table_UserDetails
        function (result_create_Table_UserAuth, callback) {
            FirstRun.create_Table_UserDetails(callback, First_Run_Check_Result);
        }, // Create Table - create_Table_fannyPackz
        function (result_create_Table_UserDetails, callback) {
            FirstRun.create_Table_fannyPackz(callback, First_Run_Check_Result);
        }
    ], function (err, Results) {
        let pageMesage = "lalalala~ Initial DB";
        if (Results) { pageMesage = "Initiated first run!"}
        else if (err) { pageMesage = "Error, while, Initiating first run!" }
        res.send({
            pageMesage: pageMesage,
            firstRunCheck: First_Run_Check_Result,
        });
    });
}
module.exports.initiateDB = initiateDB;



