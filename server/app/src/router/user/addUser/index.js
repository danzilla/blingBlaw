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
add_user_to_userDetails(user_serial, userData)
*/
/* Register user | Keep it minimal */
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time
// bling
const add_user_to_userAuth = require("./utli/add_user_to_userAuth");
const add_user_to_userDetails = require("./utli/add_user_to_userDetails");
// #r
// POST - add user module
const register = function (req, res, next) {
    // Collect add_user_results 
    let add_user_result = []
    // Register user - pageMessage
    let pageMessage = { title: "add_user", checked: "", message: "", results: "" }
    // prepare userData
    let userData = {
        userSerial: uuidv5(req.body.userName, uuidv1()),
        userName: req.body.userName,
        userPwdHash: req.body.password,
        userPwdSalt: req.body.fannyPack + req.body.userName,
        userFannyPack: req.body.fannyPack,
        userCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
    // If req.body == Empty 
    if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
        pageMessage.checked = "";
        pageMessage.message = "Error! cannot be empty fields";
        res.send({ pageMesage: pageMesage, addUserResult: "nada" });
    } else {
        // Async Action #fire
        async.waterfall([
                // Add user | Register user
            function (callback) {
                // Add to user_auth
                add_user_to_userAuth(callback, userData, add_user_result, pageMessage)
            },  // Add to user_details
            function (userAuth_result, callback) {
                   // if add to user_auth == good
                if (userAuth_result[0].checked == "checked"){
                    // Added to user_details
                    add_user_to_userDetails(callback, userData, add_user_result, pageMessage)
                } else {
                    pageMessage.title = "add_user_to_userDetails"
                    pageMessage.checked = userAuth_result[0].checked
                    pageMessage.message = userAuth_result[0].message
                    pageMessage.results = "Error - Did not procced with user_add_to_userDetails"
                    add_user_result.push(pageMessage)
                    callback(null, add_user_result)
                }
            }
        ], function (err, Results) {
            // prepare - pageMessage
            if (add_user_result[0].checked == "checked" && 
                add_user_result[1].checked == "checked" ) {
                // if Validation and Update is good
                pageMessage.checked = Results[0].checked
                pageMessage.message = Results[0].message
                pageMessage.results = Results[0].results
            } else {
                // if Validation and Update is bad
                // Get the First-Obj message
                pageMessage.checked = Results[0].checked
                pageMessage.message = Results[0].message
                pageMessage.results = Results[0].results
            }
            console.log("\n\npageMessage Final" + JSON.stringify(add_user_result[0]));
            console.log("\n\npageMessage Final" + JSON.stringify(add_user_result[1]));
            // #brrrr
            res.send({
                pageMessage: pageMessage,
                addUserResult: add_user_result
            })
        });
    }
}
module.exports = register;
