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

add_user_to_userAuth(userData)
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
            async.waterfall([
                function (callback_user) {
                    async.waterfall([
                        function (callbackOne) {
                            add_user_to_userAuth(callbackOne, userData, add_user_result);
                        },
                        function (prev, callbackOne) {
                            if (prev.checked != "checked"){ callbackOne(null, "nada") } else {
                                add_user_to_userDetails(callbackOne, userData, add_user_result);
                            }
                        }
                    ], function (err, result) {
                        callback_user(err, result);
                    });
                },
                function (prev, callback_fannyPack) {
                    if (prev.checked == "checked") {
                        // Second Waterfall - FannyPackz
                        // Create Fanny
                        async.waterfall([
                            function (callbackTwo) {
                                create_schema_user_fannyPack(callbackTwo, userData, add_user_result);
                            },
                            function (prev, callbackTwo) {
                                if (prev.checked != "checked"){ callbackTwo(null, "nada") } else {
                                    create_table_account_records(callbackTwo, userData, add_user_result);
                                }
                            },
                            function (prev, callbackTwo) {
                                if (prev.checked != "checked"){ callbackTwo(null, "nada") } else {
                                    create_table_account_category(callbackTwo, userData, add_user_result);
                                }
                            },
                            function (prev, callbackTwo) {
                                if (prev.checked != "checked"){ callbackTwo(null, "nada") } else {
                                    create_table_account_types(callbackTwo, userData, add_user_result);
                                }
                            },
                            function (prev, callbackTwo) {
                                if (prev.checked != "checked"){ callbackTwo(null, "nada") } else {
                                    add_newFannyPack_to_fannypacks_table(callbackTwo, userData, add_user_result);
                                }
                            }
                        ], function (err, result) {
                            callback_fannyPack(err, result);
                        });
                    }// if there is any error other than CHECKED
                    else {
                        // if Validation and Update is good
                        // Get the First-Obj message
                        pageMessage.title = add_user_result.add_user_to_userAuth.title;
                        pageMessage.checked = add_user_result.add_user_to_userAuth.checked;
                        pageMessage.message = add_user_result.add_user_to_userAuth.message;
                        pageMessage.results = add_user_result.add_user_to_userAuth.results;
                        callback_fannyPack(null, pageMessage)
                    }
                }
            ], function (err, result) {
                callback(err, result);
            });
        }
        // FinalResultz
        FinalResult (function (err, result) {
           if (result){
                // if Validation and Update is good
                // Get the First-Obj message
                pageMessage.title = add_user_result.add_user_to_userAuth.title;
                pageMessage.checked = add_user_result.add_user_to_userAuth.checked;
                pageMessage.message = add_user_result.add_user_to_userAuth.message;
                pageMessage.results = add_user_result.add_user_to_userAuth.results;
            } else if (err || add_user_result.add_user_to_userAuth.checked != "checked") {
                // if err
                pageMessage.title = pageMessage.title;
                pageMessage.checked = "Internal-error " + pageMessage.title;
                pageMessage.message = "Internal-error " + pageMessage.title;
                pageMessage.results = "Internal-error " + pageMessage.title;
            }
            // #brrrr
            res.send({
                pageMessage: pageMessage,
                addUserResult: add_user_result
            })
        });
    }
}
module.exports = register;
