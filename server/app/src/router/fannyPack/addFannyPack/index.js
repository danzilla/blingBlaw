/* SQL statementz - FannyPack
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
    Create - FannyPack
    - Requirement
        - > fannyPackName, userSerialID, fannyPackSerial
    - Create Schema
        - create fannypack_userID_fannypacks_serial
    - Create Table
        - create fannypack_userID_fannypacks_serial.account_types_table
        - create fannypack_userID_fannypacks_serial.account_category_table
        - create fannypack_userID_fannypacks_serial.account_record_table
    - Add
        - Add FannyPack_info to users_assets.fannypacks_table
        - Add SampleAccountType to fannypack_userID_fannypacks_serial.account_types_table
        - Add SampleCategory to fannypack_userID_fannypacks_serial.account_category_table
 */
// Register a FannyPack | Keep it minimal
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time
// blingBlaw
const create_schema_user_fannyPack = require("./utli/create_schema_user_fannyPack");
const table_account_types = require("./utli/create_table_account_types");
const table_account_category = require("./utli/create_table_account_category");
const create_table_account_record = require("./utli/create_table_account_record");
const add_newFannyPack_to_fannypacks_table = require("./utli/add_newFannyPack_to_fannypacks_record");
// Sample Data

// pageMessage
let pageMessage = {
    title: "add_fannyPack",
    checked: "",
    message: "",
    results: ""
};
// Collect add_fannyPack_results
let add_fannyPack_results = {
    create_schema_fannyPack: [],
    create_table_account_types: [],
    create_table_account_category: [],
    create_table_account_record: [],
    add_newFannyPack_to_fannypacks_table:[],
    add_SampleCategory_account_category_table: [],
    add_SampleAccountType_account_types_table: []
};
// POST - add FannyPack module
// #raaaawr
const addNewFannyPack = function (req, res, next) {
    // prepare userData
    let userData = {
        userSerial: req.body.userSerial,
        fannyPackName: req.body.fannyPack,
        fannyPackSerial: uuidv5(req.body.fannyPack, uuidv1()),
        fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };
    // If req.body == Empty 
    if (!req.body.userSerial || !req.body.fannyPack || !req.body.userName) {
        // pageMessage
        pageMessage = {
            checked: "Empty-field",
            message: "Cannot be empty fields",
            results: "nada"
        }; res.send({ pageMessage: pageMessage, addFannyPackResult: "nada" });
    } else {
        // Async Action #Fire
        async.waterfall([
            // Add New FannyPack | Register New FannyPack 
            function (callback) {
                // Add to user_auth
                add_user_to_userAuth(callback, userData, add_user_result);
            },  // Add to user_details
            function (userAuth_result, callback) {
                add_user_to_userDetails(callback, userData, add_user_result);
            }
        ], function (err, Results) {
            // prepare - pageMessage
            if (err) {
                // if err
                pageMessage.title = pageMessage.title;
                pageMessage.checked = "Internal-error " + pageMessage.title;
                pageMessage.message = "Internal-error " + pageMessage.title;
                pageMessage.results = "Internal-error " + pageMessage.title;
            } else if (Results) {
                // if Validation and Update is good
                // Get the First-Obj message
                pageMessage.title = add_user_result.add_user_to_userAuth.title;
                pageMessage.checked = add_user_result.add_user_to_userAuth.checked;
                pageMessage.message = add_user_result.add_user_to_userAuth.message;
                pageMessage.results = add_user_result.add_user_to_userAuth.results;
            }
            console.log("\n\npageMessage Final" + JSON.stringify(pageMessage));
            // #brrrr
            res.send({
                pageMessage: pageMessage,
                addFannyPackResult: add_user_result
            })
        });



    }
}
module.exports = addNewFannyPack;





