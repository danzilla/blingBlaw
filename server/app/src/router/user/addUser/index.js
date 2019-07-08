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

// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time

const add_user_to_userAuth = require("./utli/add_user_to_userAuth");
const add_user_to_userDetails = require("./utli/add_user_to_userDetails");

/* Register user
 * Keep it minimal
 */
const async = require('async');
// #r
// POST - add user module
const register = function (req, res, next) {
    // Register user - pageMessage
    let pageInfo = { pageCode: "", pageMessage: "" };
    if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
        pageInfo.pageMesage = "Error! cannot be empty fields";
        res.send({ pageInfo: pageInfo });
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

        let add_user_result = []

        async.waterfall([
            function (callback) { // Add to user_auth
                add_user_to_userAuth(callback, userData, add_user_result)
            }, 
            function (userAuth_result, callback) { // Add to user_auth
                add_user_to_userDetails(callback, userData, add_user_result)
            }
        ], function (err, Results) {

            let pageMesage = "Add user~"
            if (Results){
                pageMesage = "User added!"
            } else if (err) { pageMesage = "Error, while, Initiating first run!" }
            

            console.log("\n\n\n\n Test");
            console.log(JSON.stringify(add_user_result));
            
            res.send({
                pageMesage: pageMesage,
                addUserResult: add_user_result
            })

        });

    }
}
module.exports = register;
