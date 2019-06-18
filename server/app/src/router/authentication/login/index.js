/* Login user
 * Keep it minimal
 */
module.exports = {
  // POST
  // login module
  login: function(req, res, next) {
    // Login User - pageMessage
    let pageInfo = {
      pageCode: "",
      pageMessage: ""
    };
    // If req.body == Empty 
    if (!req.body.uname || !req.body.pwd) {
      pageInfo.pageMessage = "Error! cannot be empty fields";
      pageInfo.pageGood = false;
    } // if fields are good
    else if (req.body.uname && req.body.pwd) {
      // Request DB conections
      const danzillaDB = require("../../../modules/danzillaDB");
      // TO DO - LIMIT search collumn - * - testing
      let query = 'SELECT * FROM users.user_auth ' +
        'WHERE user_name = $1 AND user_pwd_hash = $2 LIMIT 1;';
      // NEED TO Validate and Optimize 
      let loginPayLoad = [
        req.body.uname,
        req.body.pwd
      ]
      // Blaaaaze #yee
      danzillaDB.pool.query(query, loginPayLoad, function (err, result) {
        if (err) {
          // if err
          pageInfo.pageMessage = err;
          if (err.code == "ECONNREFUSED" || err.code == "ENOTFOUND") {
            pageInfo.pageMessage = "Trouble connecting to database - Is it [prod or dev?] - " + err.code;
          }
          else if (err.code == "3D000" || err.code == "42P01") {
            pageInfo.pageMessage = "Database not inintialize " + err.code;
          }
          pageInfo.pageCode = err.code;
        } else if (result) {
          // if result = 1 and pwd match // Credentials are matched
          if (result.rowCount == 1 && result.rows[0].user_pwd_hash == req.body.pwd) {
            pageInfo.pageMessage = "Logged in! " + result.rows[0].user_name;
            pageInfo.pageCode = true;
          } else {  // if password and row count is NOT one
            pageInfo.pageMessage = "Incorrect password";
            pageInfo.pageCode = false;
          }
        }
        // fire
        res.send({ pageInfo: pageInfo});
        console.log(JSON.stringify(pageInfo));
      });
    }
  }
}
