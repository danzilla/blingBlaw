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
        - create fannypack_fannypacks_serial.account_serial_id
    - Add
        - Add newAccountTable to fannypack_fannypacks_serial.account_record_table

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
const create_table_new_account = require("../../../config/statements/account/accountTransaction/createAccountTransaction/create_table_account_transaction_table");
const add_new_account_to_users_account_record_table = require("../../../config/statements/account/accountRecord/addAccountRecord/add_newAccountTransactionTable_to_account_record");
// pageMessage
let pageMessage = {
    title: "create_transactionTable_accountRecord",
    checked: "",
    message: "",
    results: ""
};
// Collect create_new_account
let create_account_results = {
    create_table_new_account: "",
    add_new_account_to_users_account_record_table: ""
};
// POST - add FannyPack module
// #raaaawr
const create_new_account = function (req, res, next) {
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
        userfannyPackSerial: req.body.fannyPackSerial,
        account_type_id: Token.generate(),
        account_serial: Token.generate(),
        account_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        account_owner_serial: req.body.userSerial
    };
    // If req.body == Empty 
    if (!req.body.userSerial) {
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
            function (callback) {
                create_table_new_account(callback, userData, create_account_results);
            },
            function (prev, callback) {
                if (prev.checked != "checked") { callback(null, "nada") } else {
                    add_new_account_to_users_account_record_table(callback, userData, create_account_results);
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
            console.log("create_account_results: \n" + JSON.stringify(create_account_results));
            // #brrrr
            res.send({
                pageMessage: pageMessage,
                createNewAccount: create_account_results
            })
        });
    }
}
module.exports = create_new_account;





