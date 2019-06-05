/* FirstRun
 * Async Action 
 * Keep it minimal
 */
const async = require('async');
// POST - initial Database 
module.exports = {
    // POST - initial Database 
    initDB: function (req, res, next) {
        // Careate Database
        const createDatabase = require("./createDB");
  
        // Async Waterfall 
        // 
        async.waterfall([
            function (callback) {
                console.log("\n1: createAssetsDB");
                createDatabase.createAssetsDB(callback)
            },
            function (arg1, callback) {
                console.log("\n2: createFannyPacksDB");
                createDatabase.createFannyPacksDB(callback)
            }
        ], function (err, result) {
            if (!err && result){
                console.log("result: " + JSON.stringify(result));
            } else {
                console.log("err: " + err);
            }
            res.send({
                pageMesage: result.FannyPacks.message,
                firstRun: {
                    fannyPack: result.FannyPacks.checked,
                    assets: result.UserAssets.checked
                }
            })
        });
    }
}


