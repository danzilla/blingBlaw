/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const assets_database = require('../../../modules/sqlStatements/firstRun/assets_database');
const danzillaDB = require("../../../modules/danzillaDB");

const initDB = require('./createDB/blingBlaw');


// 1. Create DB_
// If - Failed - Try with default_settings
// else - Create 
module.exports = {
    // POST - initial Database 
    initDB: function (req, res, next) {

        // Statement - Create Database user_assets
        let createDatabase = assets_database.create_db;
        let looola = "createDatabase: " + assets_database.create_schema_users
        console.log(looola);


        function resolveAfter2Seconds() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                }, 2000);
            });
        }
        async function asyncCall() {
            console.log('calling');
            var result = await resolveAfter2Seconds();
            console.log(result);
            // expected output: 'resolved'
        }

        asyncCall();

        res.send({
            pageMesage: looola,
            firstRun: {
                fannyPack: "checked",
                assets: ""
            }
        })
    }
}


