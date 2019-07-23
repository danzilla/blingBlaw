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

create_schema_user_fannyPack(userData)
create_table_account_types(userData)
create_table_account_category(userData)
create_table_account_records(userData)
add_newFannyPack_to_fannypacks_table(userData)
 */
// Register a FannyPack | Keep it minimal
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time
// blingBlaw
const create_schema_user_fannyPack = require("../../../config/statements/fannyPack/addFannyPack/create_schema_user_fannyPack");
const add_newFannyPack_to_fannypacks_table = require("../../../config/statements/fannyPack/addFannyPack/add_newFannyPack_to_fannypacks_record");
const create_table_account_types = require("../../../config/statements/account/accountType/createAccountType/create_table_account_types");
const create_table_account_category = require("../../../config/statements/account/accountCategory/createAccountCategory/create_table_account_category");
const create_table_account_records = require("../../../config/statements/account/accountRecord/createAccountRecord/create_table_account_records");
// pageMessage
let pageMessage = {
    title: "add_fannyPack",
    checked: "",
    message: "",
    results: ""
};
// Collect add_fannyPack_results
let add_fannyPack_results = {
    create_schema_user_fannyPack: [],
    create_table_account_types: [],
    create_table_account_category: [],
    create_table_account_records: [],
    add_newFannyPack_to_fannypacks_table:[]
};
// POST - add FannyPack module
// #raaaawr
const add_New_FannyPack = function (req, res, next) {
    // prepare userData
    // req = user_serial and FannyPack_name
    let userData = {
        userSerial: req.body.userSerial,
        fannyPack: req.body.fannyPack,
        fannyPackSerial: Token.generate(),
        fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };
    // If req.body == Empty 
    if (!req.body.userSerial || !req.body.fannyPack) {
        // pageMessage
        pageMessage = {
            checked: "Empty-field",
            message: "Cannot be empty fields",
            results: "nada"
        }; 
        res.send({ pageMessage: pageMessage, addUserResult: "nada" });
    } else {
        // Create FannyPack
        async.waterfall([
            function (callbackTwo) {
                create_schema_user_fannyPack(callbackTwo, userData, add_fannyPack_results);
            },
            function (prev, callbackTwo) {
                if (prev.checked != "checked") { callbackTwo(null, "nada") } else {
                    create_table_account_records(callbackTwo, userData, add_fannyPack_results);
                }
            },
            function (prev, callbackTwo) {
                if (prev.checked != "checked") { callbackTwo(null, "nada") } else {
                    create_table_account_category(callbackTwo, userData, add_fannyPack_results);
                }
            },
            function (prev, callbackTwo) {
                if (prev.checked != "checked") { callbackTwo(null, "nada") } else {
                    create_table_account_types(callbackTwo, userData, add_fannyPack_results);
                }
            },
            function (prev, callbackTwo) {
                if (prev.checked != "checked") { callbackTwo(null, "nada") } else {
                    add_newFannyPack_to_fannypacks_table(callbackTwo, userData, add_fannyPack_results);
                }
            }
        ], function (err, result) {
            if (result) {
                // if Validation and Update is good
                // Get the First-Obj message
                pageMessage.title = result.title;
                pageMessage.checked = result.checked;
                pageMessage.message = result.message;
                pageMessage.results = result.results;
            } else if (err) {
                // if err
                pageMessage.title = pageMessage.title;
                pageMessage.checked = "Internal-error " + pageMessage.title;
                pageMessage.message = "Internal-error " + pageMessage.title;
                pageMessage.results = "Internal-error " + pageMessage.title;
            }
            console.log(JSON.stringify(pageMessage));
            // #brrrr
            res.send({
                pageMessage: pageMessage,
                addFannyPackResult: add_fannyPack_results
            })
        });
    }
}
module.exports = add_New_FannyPack;





