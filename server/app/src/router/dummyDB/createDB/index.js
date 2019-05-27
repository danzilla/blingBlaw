/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
module.exports = {
  // POST - Create Table
  createDB: function(req, res, next) {

    const blingBlaw = require('./blingBlaw')
    const fannyPack = require('./fannyPack')

    // set Async - payload
    async function initDatabase() {
      try {
          const blingBlawResult = await blingBlaw();
          const fannyPackResult = await fannyPack();
          console.log("blingBlawResult: " + blingBlawResult);
          console.log("fannyPackResult: " + fannyPackResult);
      } catch (err) {
        let pageMesage = err;
        console.log("3: " + pageMesage);
        res.send({ pageMesage: pageMesage});
        // End postgres-pool connection 
        danzillaDB.pool.end;
      }
    }
    // View all async actions - data
    initDatabase(); 
  }
}
