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

add_user_to_userAuth(userName, userPassword)
add_user_to_userDetails(user_serial, userData)

create_schema_fannyPack(fannyPackName, userSerial, )
 */
// Register a FannyPack | Keep it minimal
const async = require('async');
// Generate - unique_id 
// https://www.npmjs.com/package/uuid
const uuidv5 = require('uuid/v5'); //string + salt
const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time
// blingBlaw
const create_schema_user_fannyPack = require("../../../modules/statements/fannyPack/addFannyPack/create_schema_user_fannyPack");
const create_table_account_types = require("../../../modules/statements/fannyPack/addFannyPack/create_table_account_types");
const create_table_account_category = require("../../../modules/statements/fannyPack/addFannyPack/create_table_account_category");
const create_table_account_record = require("../../../modules/statements/fannyPack/addFannyPack/create_table_account_record");
const add_newFannyPack_to_fannypacks_table = require("../../../modules/statements/fannyPack/addFannyPack/add_newFannyPack_to_fannypacks_record");
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
    
    console.log(create_schema_user_fannyPack("adsadasdasdasdasd"));

    // pageMessage
    pageMessage = {
        checked: "Empty-field",
        message: "Cannot be empty fields",
        results: "nada"
    }; 
    res.send({ pageMessage: pageMessage, addFannyPackResult: userData });
}
module.exports = addNewFannyPack;





