/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
module.exports = {
  // POST - Create Table
  addDummyData: function(req, res, next) {
    // request DB conections
    const danzillaDB = require("../../danzillaDB");
    const apple = require("./Table");
    console.log(apple.apple);

    let query = 'SELECT NOW()';

    //DBPG - DataBase postgress
    danzillaDB.pool.query(query, function (err, result) {
      if (err) {
        // if err - redirect to login page
        console.log(err);
        res.send({ pageMesage: err});
      } else {
        console.log(result);
        console.log(apple.apple);
        res.send({ pageMesage: result});
      }
    });

  }
}
