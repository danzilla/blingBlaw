/* FirstRun
 * Async Action 
 * Keep it minimal
 */
// Async Waterfall
const async = require('async');
// POST - initial Database 
module.exports = {
    // POST - initial Database 
    initiateDB: function (req, res, next) {
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
                fannyPack: "",
                fannyRecord: ""
            }
        }
        // Careate Database
        const createDatabase = require("./createDB");
        const createSchema = require("./createSchema");
        const createTable = require("./createTable");
        // Async Waterfall 
        async.waterfall([
                // Create Users_Assets
            function (callback) {
                console.log("Users_Assets");
                createDatabase.createAssetsDB(callback, firstRunCheck)
            },  // Create Fanny_Packs
            function (resultAssetDB, callback) {
                if (resultAssetDB) { console.log("Fanny_Packs"); }
                createDatabase.createFannyPacksDB(callback, firstRunCheck)
            }, // Create Schema - create_schema_users
            function (resultFannyPacksDB, callback) {
                if (resultFannyPacksDB) { console.log("create_schema_users"); }
                createSchema.create_schema_users(callback, firstRunCheck)
            }, // Create Schema - create_schema_fannyPack
            function (resultUserSchema, callback) {
                if (resultUserSchema) { console.log("create_schema_fannyPack"); }
                createSchema.create_schema_fannyPack(callback, firstRunCheck)
            }, // Create Table - create_table_userGroup
            function (resultfannyPackSchema, callback) {
                if (resultfannyPackSchema) { console.log("create_table_userGroup"); }
                createTable.create_table_userGroup(callback, firstRunCheck)
            }, // Create Table - create_table_userAuth
            function (resultTableUserGroup, callback) { 
                if (resultTableUserGroup) { console.log("create_table_userAuth"); }
                createTable.create_table_userAuth(callback, firstRunCheck)
            }, // Create Table - create_table_userDetails
            function (resultTableUserAuth, callback) { 
                if (resultTableUserAuth) { console.log("create_table_userDetails"); }
                createTable.create_table_userDetails(callback, firstRunCheck)
            }, // Create Table - create_table_userRecords
            function (resultTableUserDetails, callback) {
                if (resultTableUserDetails) { console.log("create_table_userRecords"); }
                createTable.create_table_userRecords(callback, firstRunCheck)
            }, // Create Table - create_table_fannypacks_fannypacks
            function (resultTableFannyPackz, callback) {
                if (resultTableFannyPackz) { console.log("create_table_fannypacks_fannypacks"); }
                createTable.create_table_fannypacks_fannypacks(callback, firstRunCheck)
            }, // Create Table - create_table_fannypacks_records
            function (resultTableFannyRecords, callback) {
                if (resultTableFannyRecords) { console.log("create_table_fannypacks_records"); }
                createTable.create_table_fannypacks_records(callback, firstRunCheck)
            }
        ], function (err, result) {
            let pageMesage = "";
            if (!err && result){
                pageMesage = "Result: " + JSON.stringify(result);
            } else {
                pageMesage = "Error: " + err;
            }
            console.log("\npageMesage: " + pageMesage);

            // Database 
            console.log("\n firstRunCheck.database: ");
            console.log(firstRunCheck.database);
            // Schema
            console.log("\n firstRunCheck.Schema: ");
            console.log(firstRunCheck.schema);
            // Table 
            console.log("\n firstRunCheck.Table: ");
            console.log(firstRunCheck.table);

            res.send({
                pageMesage: pageMesage,
                firstRunCheck: firstRunCheck,
            })
            
        });
    }
}


