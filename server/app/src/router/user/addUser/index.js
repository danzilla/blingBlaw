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

const add_user_to_userAuth = require("./utli/add_user_to_userAuth");
const add_user_to_userDetails = require("./utli/add_user_to_userDetails");

// #r
// POST - add user module
const register = function (req, res, next) {
    // Register user - pageMessage
    let pageMesage = "Register user - pageMessage ~"
    if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
        pageMesage = "Error! cannot be empty fields";
        res.send({ pageMesage: pageMesage });
    } else {
        // prepare userData
        let userData = {
            userSerial: uuidv5(req.body.userName, uuidv1()),
            userName: req.body.userName,
            userPwdHash: req.body.password,
            userPwdSalt: req.body.fannyPack + req.body.userName,
            userFannyPack: req.body.fannyPack,
            userCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }
        // Collect add_user_results 
        // {title: "", checked: "", result: ""}
        let add_user_result = []
        // Async Action #fire
        async.waterfall([
            function (callback) { // Add to user_auth
                add_user_to_userAuth(callback, userData, add_user_result)
            }, 
            function (userAuth_result, callback) { // Add to user_auth
                add_user_to_userDetails(callback, userData, add_user_result)
            }
        ], function (err, Results) {

            if (Results[0].checked == "checked"){
                pageMesage = "User added! " + req.body.userName
            } else if (Results[0].checked == "") {
                pageMesage = "Internal Error! " + Results[0].results
            } else if (err) {
                pageMesage = "Error! Error! - " + err
            } else {
                pageMesage = "Internal Error! - " + Results[0].results
            }

            res.send({
                pageMesage: pageMesage,
                addUserResult: add_user_result
            })

        });
    }
}
module.exports = register;
