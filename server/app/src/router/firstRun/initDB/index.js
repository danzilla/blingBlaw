/* FirstRun
 * Async Action 
 * Keep it minimal
 */
const async = require('async');
// POST - initial Database 
module.exports = {
    // POST - initial Database 
    initDB: function (req, res, next) {
        // Check list for firstRun
        const firstRunCheck = {
            database: {
                usersDB: "",
                fannyDB: ""
            },
            schema: {
                usersSchema: "",
                fannypackSchema: ""
            },
            table: {
                userAuth: "",
                userDetails: "",
                userRecord: "",
                userGroup: "",
                fannypack: ""
            }
        }
        // Careate Database
        const createDatabase = require("./createDB");
        const createSchema = require("./createSchema");
        const createTable = require("./createTable");

        // Async Waterfall 
        async.waterfall([
            function (callback) { // Create Users_Assets
                createDatabase.createAssetsDB(callback, firstRunCheck)
            }, function (resultAssetDB, callback) { // Create Fanny_Packs
                createDatabase.createFannyPacksDB(callback, firstRunCheck)
            }, function (resultFannyPacksDB, callback) { // Create Schema - create_schema_users
                createSchema.create_schema_users(callback, firstRunCheck)
            }, function (resultUserSchema, callback) { // Create Schema - create_schema_fannyPack
                createSchema.create_schema_fannyPack(callback, firstRunCheck)
            }, function (resultfannyPackSchema, callback) { // Create Schema - create_schema_fannyPack
                createTable.create_table_userAuth(callback, firstRunCheck)
            }
        ], function (err, result) {

            let pageMesage = ""
            if (!err && result){
                pageMesage = "result: " + JSON.stringify(result);
            } else {
                pageMesage = "err: " + err;
            }

            console.log("\npageMesage: " + pageMesage);
            console.log("\nfirstRunCheck: " + JSON.stringify(firstRunCheck));
            console.log("\n firstRunCheck.database: " + JSON.stringify(firstRunCheck.database));
            
            res.send({
                pageMesage: pageMesage,
                firstRunCheck: firstRunCheck,
                firstRun: {
                    fannyPack: firstRunCheck.database.fannyDB.checked,
                    assets: firstRunCheck.database.usersDB.checked
                }
            })
            
        });
    }
}


