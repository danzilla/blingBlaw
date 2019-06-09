/* Login user
 * Keep it minimal
 */
module.exports = {
  // POST
  // login module
  login: function(req, res, next) {
    // Login User
    let pageMesage = "";
    let pageGood = "";

    // If req.body == Empty 
    if (!req.body.uname || !req.body.pwd) {
      pageMesage = "Error! cannot be empty fields";
      pageGood = false;
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
        if (err) { // if err
          if (err.code == "ECONNREFUSED") {
            pageMesage = "Error connecting to database - " + err.code;
            pageGood = false;
          } else { // any other error
            pageMesage = "Error: " + err; 
            pageGood = false;
          }
        } else if (result) {
          // if result = 1 and pwd match // Credentials are matched
          if (result.rowCount == 1 && result.rows[0].user_pwd_hash == req.body.pwd) {
            pageMesage = "Logged in! " + result.rows[0].user_name;
            pageGood = true;
          } else {  // if password and row count is NOT one
            pageMesage = "Incorrect password";
            pageGood = false;
          }
        }
        // fire
        res.send({ pageMesage: pageMesage, pageGood: pageGood });
        console.log(pageMesage);
      });
    }
    
  }
}
