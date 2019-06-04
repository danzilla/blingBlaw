/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

// 1. Create DB_
// If - Failed - Try with default_settings
// else - Create 
module.exports = {
    // POST - initial Database 
    initDB: function (req, res, next) {

        console.log("REQ: " + JSON.stringify(req.body));


        const createDatabase = require("./createDB");

        createDatabase.createAssetsDB()
        createDatabase.createFannyPacksDB()


        // Compile functions | results and rejects
        res.send({
            pageMesage: "looola",
            firstRun: {
                fannyPack: "checked",
                assets: "checked"
            }
        })

    }
}


