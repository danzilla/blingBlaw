/* SQL statementz - Account
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
  
    Create - Account
    - Requirement
        - > account_type_id, account_serial, account_lastmodify, account_owner_serial
    - Create Table
        - create fannypack-fannypacks_serial.account_serial_id
    - Add
        - Add newAccountTable to fannypack-fannypacks_serial.account_record_table

create_table_new_account(userData)
add_new_account_to_users_account_record_table(userData)
 */




// Add a AccountTable | Keep it minimal
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time
// blingBlaw
const create_schema_user_fannyPack = require("../../../modules/statements/fannyPack/addFannyPack/create_schema_user_fannyPack");
const add_newFannyPack_to_fannypacks_table = require("../../../modules/statements/fannyPack/addFannyPack/add_newFannyPack_to_fannypacks_record");
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
    create_table_account_types: []
};
// POST - add FannyPack module
// #raaaawr
const add_New_FannyPack = function (req, res, next) {
    /*
        accounts_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        account_type_id VARCHAR(36) NOT NULL,
        account_serial VARCHAR(36) NOT NULL,
        account_lastmodify TIMESTAMP,
        account_owner_serial VARCHAR(36) NOT NULL
    */
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





