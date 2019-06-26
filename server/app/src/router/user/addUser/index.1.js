/* Register user
 * Keep it minimal
 */
const async = require('async');
// #r
module.exports = {
    // POST
    // POST - add user module
    register: function (req, res, next) {
        // Register user - pageMessage
        let pageInfo = {pageCode: "", pageMessage: ""};
        if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
            pageInfo.pageMesage = "Error! cannot be empty fields";
            console.log(pageInfo.pageMesage);
            res.send({ pageInfo: pageInfo });
        } else {
            // Add User
            // Requirement: User, Pwd, FannyPacks

            // DB - User_DB
            // 1st
            // Add user to user Schema
            //  Add to User_auth
            //  Add to User_record
            //  Add to User_details
            // 2nd
            // Add user to fannypacks_Schema
            //  Add user_fannypack to FannyPacks
            //  Add user_fannypack_records to fannypacks_records

            // DB - Fannypackz_DB
            // 3rd
            // Create Schema with user_seriral
            //  create_table_fannypacks_category for User
            //  create_table_fannypacks_wallet for User
            //  create_table_fannypacks_wallet_details for User

            // Check list for registerRunCheck
            const registerRunCheck = {
                addUserToAuth: false,
                addUserToRecord: false,
                addUserToDetails: false,
                addUserToFannyPack: false,
                addUserToFannyPackRecord: false,
                createShemaUserFannyPack: false,
                createTableWallet: false,
                createTableWalletRecord: false
            }

            const registerAuser = require("./util");

            // Async Waterfall 
            async.waterfall([
                // Create Users_Assets
                function (callback) {
                    console.log("Users_Assets");
                    createDatabase.createAssetsDB(callback, firstRunCheck)
                }
            ], function (err, result) {
                let pageMesage = "";
                if (!err && result) {
                    pageMesage = "Result: " + JSON.stringify(result);
                } else {
                    pageMesage = "Error: " + JSON.stringify(err);
                }
                console.log("\npageMesage: " + pageMesage);


            });




        }
    }
}
