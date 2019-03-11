/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

//  config.pageInfo | flashData |
const config = require("../../../modules/config");

// // TODO:
module.exports = {
  // GET - classtitleSearch
  classtitleSearch: function(req, res, next) {
    // get session info
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Search:classtitleSearch:";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session user is empty
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nSession incorrect - going Home\n");
    } else { // else
      console.log("Active session: " + req.session.user);

      //
      // OEED - query all naics
      const oeedDB = require("../../../modules/oeedDB");
      // import from QI - /search/classtitles
      //no query processing, this is used as training data for spell correction.
      console.log("getting all data from database")
      oeedDB.pool.connect(function(err, client, done) {
        if (err) {
          console.log("not able to get connection " + err);
          res.send(err);
        } else {
          var query = "select classtitle from naics; "
          console.log("psql query command: " + query);
          client.query(query, function(err, result) {
            done(); // closing the connection;
    
            if (err) {
              console.log(err);
              res.send(err);
            } else { //time consuming when database gets big !!
              rows = []
              result.rows.forEach(element => {
                rows.push(element.classtitle)
              });
              console.log(rows)
              res.json({
                data: rows
              });
            }
          });
        }
      });

    }
  }
// end of EXPORT
}
