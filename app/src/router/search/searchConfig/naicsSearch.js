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
  naicsSearch: function(req, res, next) {
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



      // OEED - query all naics
      const oeedDB = require("../../../modules/oeedDB");
      // import from QI - /search/naics
      let code = req.query.code;
      let keyword = req.query.keyword;
      if ((!code && !keyword) || (code && keyword)) {
        res.send("empty request");
      } else {
        //var query = code ? "select * from naics where code = "+code :  "select * from naics where classtitle like '%"+keyword + "%'"
        let query = code ? "select * from naics where code = " + code + ";" : "select * from naics where classtitle @@ to_tsquery('" + keyword + "');"
        console.log("psql query command: " + query);
        oeedDB.pool.query(query, function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send({
              data: result.rows.slice(0, 10)
            });
          }
        });
      }

      

    }
  }
// end of EXPORT
}
