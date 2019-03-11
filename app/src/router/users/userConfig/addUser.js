/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // GET
  // GET user - if request = GET - redirect to register
  addUserGET: function(req, res, next) {
    // get session info
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "register";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    console.log("Active session: " + req.session.user);
    res.render('auth/index', {
      pageInfo: config.pageInfo
    });
  },
  // end of addUserGET

  // POST
  // POST - add user module
  addUserPOST: function(req, res, next) {
    // get session info and set pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.body.username || !req.body.pwd) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nSession incorrect - going home\n");
    } else { // else - session good - redirect to user


      // TODO: JOIN Tables Insert - Map Groups and Permissions
      // API: Store

      // user_group table 
      // generate - unique_id 
      // https://www.npmjs.com/package/uuid
      const uuidv5 = require('uuid/v5'); //string + salt
      const uuidv1 = require('uuid/v1'); //Time_based
      const moment = require('moment'); // Time

      // prepare data
      // random Salt from Time
      let saltTime = uuidv1();
      // get ready user input data
      let user_serial = uuidv5(req.body.username, saltTime);
      let user_name = req.body.username;
      let user_email = req.body.useremail;
      let user_pwd_salt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      // NEED TO BE ENCRYPT AND ADD SALT
      let user_pwd_hash = req.body.pwd; 

      // let user_auth_token = uuidv5('Hello!', saltTime);
      // let user_crated = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

      // Query Insert 
      const userAddQuery = 'INSERT INTO user_DB.user_auth(' + 
                    'user_serial, user_name, user_email, user_pwd_salt, user_pwd_hash' +
                    ') ' +
                    'VALUES($1, $2, $3, $4, $5) RETURNING *';
      // insert Data
      const userAddData = [
        user_serial,
        user_name,
        user_email,
        user_pwd_salt,
        user_pwd_hash
      ];

      // DB Connections
      const danzillaDB = require("../../../modules/danzillaDB");
      danzillaDB.pool.query(userAddQuery, userAddData)
      .then(data => {
        // OK, records been inserted
        console.log(data);
        console.log("User added: " + data);
        config.flashData.pageMesage = "User been created! " + req.body.username;
        config.flashData.bgColor = "success";
        config.flashData.info = data;
        req.flash('flashData', config.flashData);
        res.redirect('/users');
      })
      .catch(error => {
        // Error, no records inserted
        console.log(error);
        config.flashData.pageMesage = "Error Inserting data";
        config.flashData.bgColor = "danger";
        config.flashData.info = error;
        req.flash('flashData', config.flashData);
        res.redirect('/users');
      });

    }
  }
}
