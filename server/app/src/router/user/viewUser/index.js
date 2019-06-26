/* View user
 * Keep it minimal
 */
module.exports = {
  // POST
  // viewUser module
  viewUser: function(req, res, next) {
    // View Users - pageMessage
    let pageInfo = {
      pageCode: "",
      pageMessage: ""
    };
    // Request DB conections
    const danzillaDB = require("../../../modules/danzillaDB");
    let query = 'SELECT * FROM users.user_auth;';
    // Blaaaaze #yee
    danzillaDB.pool.query(query, function (err, result) {
      if (result.rows && result.rowCount >= 1) { // if results
        pageInfo.pageMessage = result.rows;
        pageInfo.pageCode = result.rowCount;
      } else if (err) { // if err
        pageInfo.pageMessage = err;
        pageInfo.pageCode = err.code;
      }
      // fire
      res.send({ pageInfo: pageInfo });
    });
  }
}
