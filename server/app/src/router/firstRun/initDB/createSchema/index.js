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

    let pageMsg_noDB = "3D000 - Database not initialize - trying with default settings";
    let pageMsg_noTable = "3D000 - Table not initialize - trying with default settings";

    let pageMsg_DB_good = "Database initialized!"; 
    let pageMsg_DB_bad = "Ewww... Database not initialize"; 

    
    // Create database for assets
    danzillaDB.pool.query(createDatabase, function (err, res) {
      // if err = throw
      if (err) {
        console.log("______________________");
        console.log("1-err: " + err);
        console.log("______________________");
      } // If error = 3D000 = No default DB exit
      if (err.code === "3D000") {
        // Log pageMsg_noDB
        console.log(pageMsg_noDB);
        // trying with default_postgres_settings
        danzillaDB.postgresDefault.query(createDatabase, function (err, Results2) {
          if (err) {
            // Still error creating DB
            console.log(pageMsg_DB_bad);
          } else {
            console.log(pageMsg_DB_good);
            console.log("2: Result: " + JSON.stringify(Results2));
          }
        });
      } if (err.code === "42P04"){
        console.log(err.code);
        console.log("3: " + err);
      }
      else {
        console.log(pageMsg_DB_good);
        console.log("1 Results: " + res);
      }
    });

  }
}
