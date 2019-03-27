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
  viewUser: function(req, res, next) {
    // get session info
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Users";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session user is empty
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nSession incorrect - going Home\n");
    } else { // else
      console.log("Active session: " + req.session.user);


      // OEED - query all Users
      const danzillaDB = require("../../../modules/danzillaDB");
      let query = 'SELECT * FROM user_db.user_auth;';
      //DBPG - DataBase postgress
      danzillaDB.pool.query(query, function (err, result) {
        if (err) {
          config.flashData.pageMesage = "Error removing user: " + req.body.userName;
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', config.flashData);
          res.redirect('/');
        }
        else {
          res.render('users/index', {
            pageInfo: config.pageInfo,
            data: result
          });
        }
      });
    }
  }
// end of EXPORT
}
