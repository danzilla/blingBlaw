/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

// Global Config
const config = require("../../../modules/config");

// Logout page
// redirect to root / home login page

module.exports = {
  logOutAll: function(req, res) {
    // get session info and set config.pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "POST";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Logout";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");

    req.session.destroy(function(e, f) {
      if (e) {
        console.log("error log out: " + e)
      }
      // logout
      //set session for the user and redirect to /user page
      console.log("\n Bye ~ logged off ~ \n");
      res.redirect('/');
    });
  }
}
