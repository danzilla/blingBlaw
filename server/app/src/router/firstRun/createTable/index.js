/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const assets_database = require('../../../../config/firstRun/assets_sql');
const danzillaDB = require("../../../modules/danzillaDB");

module.exports = {
  // POST - Create initial Database 
  createDB: function(req, res, next) {

    // Statement - Create Database user_assets
    let createDatabase = assets_database.create_db;

    console.log("Adsasdasd");
    res.send({pageMesage: createDatabase})
    
  }
}
