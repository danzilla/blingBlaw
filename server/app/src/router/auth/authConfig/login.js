/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

// pageInfo | flashData
const config = require("../../../modules/config");

module.exports = {
  // GET
  // getLogin module
  login: function(req, res, next) {
    // get session info and set config.pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "GET";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Login";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // render - login page
      config.pageInfo.pageOption = "Login";
      res.render('auth/index', {
        pageInfo: config.pageInfo
      });
    } else { // else - session good - redirect to user
      // Session active - redirect to /user page
      console.log("Auto login - Active session: " + req.session.user);
      config.flashData.pageMesage = "Auto login! " + req.session.user;
      config.flashData.bgColor = "success";
      req.flash('flashData', config.flashData);
      res.redirect('/users');
    }
  }
}