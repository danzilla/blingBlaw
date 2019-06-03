/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const assets_database = require('../../../../../config/firstRun/assets_sql');
const danzillaDB = require("../../../../modules/danzillaDB");

module.exports = {
  // POST - Create initial Database 
  createDB: function(req, res, next) {

    // Statement - Create Database user_assets
    let createDatabase = assets_database.create_db;
    console.log("createDatabase: " + createDatabase);

    danzillaDB.pool.query(createDatabase, function (err, results) {
      if (err) {
        console.log(err);
        res.send({
          pageMesage: err,
          firstRun: {
            fannyPack: "checked",
            assets: ""
          }
        })
      }
      else if (results) {
        console.log(results);
        res.send({
          pageMesage: results,
          firstRun: {
            fannyPack: "checked",
            assets: ""
          }
        })
      }
    });
    
  }
}


