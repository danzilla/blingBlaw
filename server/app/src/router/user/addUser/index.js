/* SQL statementz - Create user
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
    Create - User
    - Requirement
        - > User, Password, fannyPackName
    - userAdd
        - Add user to users_assets.user_auth_table
        - Add user to users_assets.user_details_table
    - Create Schema
        - Create FannyPacks(fannyPackName, userSerialID)

add_user_to_userAuth(userName, userPassword)
add_user_to_userDetails(userData)

create_schema_user_fannyPack(userData)
create_table_account_category(userData)
create_table_account_records(userData)
create_table_account_types(userData)
add_newFannyPack_to_fannypacks_table(userData)

*/
// Register user | Keep it minimal
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
// https://www.npmjs.com/package/uuid-token-generator
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time
// User
const add_user_to_userAuth = require("../../../modules/statements/user/addUser/add_user_to_userAuth");
const add_user_to_userDetails = require("../../../modules/statements/user/addUser/add_user_to_userDetails");
// FannyPack
const create_schema_user_fannyPack = require("../../../modules/statements/fannyPack/addFannyPack/create_schema_user_fannyPack");
const create_table_account_category = require("../../../modules/statements/fannyPack/addFannyPack/create_table_account_category");
const create_table_account_records = require("../../../modules/statements/fannyPack/addFannyPack/create_table_account_records");
const create_table_account_types = require("../../../modules/statements/fannyPack/addFannyPack/create_table_account_types");
const add_newFannyPack_to_fannypacks_table = require("../../../modules/statements/fannyPack/addFannyPack/add_newFannyPack_to_fannypacks_record");

// pageMessage
let pageMessage = {
    title: "add_user",
    checked: "",
    message: "",
    results: ""
};
// Collect add_user_results 
let add_user_result = {
    add_user_to_userAuth: "",
    add_user_to_userDetails: "",
    create_schema_fannyPack: "",
    create_table_account_category: "",
    create_table_account_records: "",
    create_table_account_types: "",
    add_newFannyPack_to_fannypacks_table: ""
};
// POST - add user module
// #r
const register = function (req, res, next) {
    // prepare userData
    let userData = {
        userSerial: uuidv5(req.body.userName, uuidv1()),
        userName: req.body.userName,
        userPwdHash: req.body.password,
        userPwdSalt: req.body.fannyPack + req.body.userName,
        userCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        fannyPack: req.body.fannyPack,
        fannyPackSerial: Token.generate(),
        fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };
    // If req.body == Empty 
    if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
        // pageMessage
        pageMessage = {
            checked: "Empty-field",
            message: "Cannot be empty fields",
            results: "nada"
        }; res.send({ pageMessage: pageMessage, addUserResult: "nada" });
    } else {
        // Function 1 - Add to user_Auth and User_details
        // Function 2 - Create and add FannyPackz
        function FinalResult(callback) {
            async.parallel({
                // Create User
                userCreate: function (callback) {
                    async.waterfall([
                        function (callbackOne) {
                            add_user_to_userAuth(callbackOne, userData, add_user_result);
                        },
                        function (prev, callbackOne) {
                            add_user_to_userDetails(callbackOne, userData, add_user_result);
                        }
                    ], function (err, result) {
                        callback(err, result); 
                    });
                }, // Create FannyPack
                fannyPackCreate: function (callback) {
                    async.waterfall([
                        function (callbackTwo) {
                            create_schema_user_fannyPack(callbackTwo, userData, add_user_result);
                        },
                        function (prev, callbackTwo) {
                            create_table_account_records(callbackTwo, userData, add_user_result);
                        },
                        function (prev, callbackTwo) {
                            create_table_account_category(callbackTwo, userData, add_user_result);
                        },
                        function (prev, callbackTwo) {
                            create_table_account_types(callbackTwo, userData, add_user_result);
                        },
                        function (prev, callbackTwo) {
                            add_newFannyPack_to_fannypacks_table(callbackTwo, userData, add_user_result);
                        }
                    ], function (err, result) {
                        callback(err, result);
                    });
                }
            }, function (err, results) {
                callback(err, results);
            });
        }
        // FinalResultz
        FinalResult (function (err, result) {

            if (add_user_result.add_user_to_userAuth.checked != "checked" || 
                add_user_result.add_user_to_userDetails.checked != "checked" || 
                add_user_result.create_schema_fannyPack.checked != "checked" || 
                add_user_result.create_table_account_category.checked != "checked" || 
                add_user_result.create_table_account_records.checked != "checked" || 
                add_user_result.create_table_account_types.checked != "checked" || 
                add_user_result.add_newFannyPack_to_fannypacks_table.checked != "checked" ){
                console.log("RECOLLA");
                console.log('\n\nerr FINAL:' + JSON.stringify(err));
                console.log('\n\nresult FINAL:' + JSON.stringify(result));
                console.log("\n\nFINAL: " + JSON.stringify(add_user_result));
            }

            /*
            add_user_result = {
                add_user_to_userAuth: "",
                add_user_to_userDetails: "",
                create_schema_fannyPack: "",
                create_table_account_category: "",
                create_table_account_records: "",
                create_table_account_types: "",
                add_newFannyPack_to_fannypacks_table: ""
            };
            */


           
        });

        /*

        // Async Action #fire
        async.waterfall([
                // Add user | Register user
            function (callback) {
                // Add to user_auth
                add_user_to_userAuth(callback, userData, add_user_result.add_user_to_userAuth);
            },
            function (userAuth_result, callback) {
                // Add to user_details
                add_user_to_userDetails(callback, userData, add_user_result.add_user_to_userDetails);
                console.log("\nadd_user_result.add_user_to_userDetails" + JSON.stringify(add_user_result));
            }, 
            function (userDetails_result, callback) {
                // if add to user_auth == good
                if (userDetails_result.checked == "checked") {
                    // Added to user_details
                    create_schema_user_fannyPack(callback, userData, add_user_result.create_schema_fannyPack);
                } else { // if error with validation
                    // pageMessage
                    pageMessage = {
                        title: "Create_schema_user_fannyPack", 
                        checked: userDetails_result.checked, 
                        message: userDetails_result.checked, 
                        results: "Error - Did not procced with user_add_to_userDetails" 
                    }; add_user_result.create_schema_fannyPack = pageMessage;
                    callback(null, pageMessage);
                }
            },
            function (userFannySchema_result, callback) {
                // if add to user_auth == good
                if (userFannySchema_result.checked == "checked") {
                    // Added to user_details
                    create_table_account_category(callback, userData, add_user_result.create_schema_fannyPack);
                } else { // if error with validation
                    // pageMessage
                    pageMessage = {
                        title: "create_table_account_category", 
                        checked: userFannySchema_result.checked, 
                        message: userFannySchema_result.checked, 
                        results: "Error - Did not procced with user_add_to_userDetails" 
                    }; add_user_result.create_schema_fannyPack = pageMessage;
                    callback(null, pageMessage);
                }
            },
            function (createTableAccountCategory_result, callback) {
                // Added to user_details
                create_table_account_records(callback, userData, add_user_result.create_table_account_category);
            },
            function (createTableAccountRecord_result, callback) {
                // Added to user_details
                create_table_account_types(callback, userData, add_user_result.create_table_account_records);
            },
            function (createTableAccountType_result, callback) {
                // Added to user_details
                add_newFannyPack_to_fannypacks_table(callback, userData, add_user_result.create_table_account_types);
            },
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
                addUserResult: add_user_result
            })
        });

        */


    }
}
module.exports = register;
