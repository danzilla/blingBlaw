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
    View - User FannyPack
    - Requirement
        - > userSerialID
    - View
        - View FannyPack_info FROM users_assets.fannypacks_table

view_fannyPackz_by_user_serial(userData)
 */
// Register a FannyPack | Keep it minimal
const async = require('async');
// blingBlaw
const view_fannyPackz_by_user_serial = require("../../../modules/statements/fannyPack/viewFannyPack/view_fannyPackz_by_user_serial");
// pageMessage
let pageMessage = {
    title: "add_fannyPack",
    checked: "",
    message: "",
    results: ""
};
// Collect add_fannyPack_results
let view_fannyPack_results = {
    view_fannyPackz_by_user_serial: []
};
// POST - add FannyPack module
// #raaaawr
const view_fannyPackz = function (req, res, next) {
    // prepare userData
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
        // req = user_serial and FannyPack_name
        let userData = {
            userSerial: req.body.userSerial
        };
        // Async Actionz
        async.parallel([
            function (callback) { 
                view_fannyPackz_by_user_serial(callback, userData, view_fannyPack_results);
             }], 
            function(err, results) {
                // prepare - pageMessage
                if (err) {
                    // if err
                    pageMessage.title = pageMessage.title;
                    pageMessage.checked = "Internal-error " + pageMessage.title;
                    pageMessage.message = "Internal-error " + pageMessage.title;
                    pageMessage.results = "Internal-error " + pageMessage.title;
                } else if (results) {
                    // if Validation and Update is good
                    // Get the First-Obj message
                    pageMessage.title = view_fannyPack_results.view_fannyPackz_by_user_serial.title;
                    pageMessage.checked = view_fannyPack_results.view_fannyPackz_by_user_serial.checked;
                    pageMessage.message = view_fannyPack_results.view_fannyPackz_by_user_serial.message;
                    pageMessage.results = view_fannyPack_results.view_fannyPackz_by_user_serial.results;
                } res.send({ pageMessage: pageMessage});
            }
        );
    }
}
module.exports = view_fannyPackz;





