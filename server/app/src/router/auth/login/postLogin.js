/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

// pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // postLogin module
  postLogin: function(req, res, next) {
    // get session info and set config.pageInfo
    config.pageInfo.request = "POST";
    config.pageInfo.page = "Auth-login-react";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    
    // TO-DO
    // TO DO - LIMIT search collumn - * - testing
    let query = 'SELECT * FROM user_db.user_auth ' +
                'WHERE user_name = $1 AND user_pwd_hash = $2 LIMIT 1;';
    // NEED TO Validate and Optimize 
    let loginPayLoad = [
      req.body.uname,
      req.body.pwd
    ]
    
    //DBPG - DataBase postgress
    // request DB conections
    const danzillaDB = require("../../../modules/danzillaDB");
    //DBPG - DataBase postgress
    danzillaDB.pool.query(query, loginPayLoad, function (err, result) {
      if (err) {
        // if err - redirect to login page
        config.flashData.pageMesage = "Incorrect credentials -err-DB: " + err;
        console.log(config.flashData.pageMesage);
        res.send({ pageMesage: config.flashData.pageMesage, pageGood: false });
      } else {
        // if result = 1 and pwd match // Credentials are matched
        if (result.rowCount == 1 && result.rows[0].user_pwd_hash == req.body.pwd) {
          // Session ON - Set session
          //set session for the user and redirect to /user page
          req.session.user = req.body.uname;
          req.session.userId = result.rows[0].user_serial;
          
          config.flashData.pageMesage = "Logged in! " + result.rows[0].user_name;
          console.log(config.flashData.pageMesage);
          res.send({ pageMesage: config.flashData.pageMesage, pageGood: true });
        } else {
          // if password and row count is NOT one - redirect to login page
          config.flashData.pageMesage = "Incorrect password";
          console.log(config.flashData.pageMesage);
          res.send({ pageMesage: config.flashData.pageMesage, pageGood: false });
        }
      }
    });

  }
}
