/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

//  config.pageInfo | flashData |
const config = require("../../../modules/config");

// // TODO:
// // TODO: ALL DATABASE - USE JOIN and COMBINE ALL into ONE TABLE - for view
module.exports = {
  // GET - viewUser
  viewSearch: function(req, res, next) {
    // get session info
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Search:ALL:";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session user is empty
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nSession incorrect - going Home\n");
    } else { // else
      console.log("Active session: " + req.session.user);

      // OEED - query all Users
      const oeedDB = require("../../../modules/oeedDB");
      let query = "SELECT * FROM naics;";
      //DBPG - DataBase postgress
      oeedDB.pool.query(query, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.render('search/index', {
            pageInfo: config.pageInfo,
            data: result
          });
        }
      });

    }
  }
// end of EXPORT
}
