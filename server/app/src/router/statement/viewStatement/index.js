/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
    // GET
    viewStatement: function (req, res, next) {
        // get session info and set config.pageInfo
        config.pageInfo.request = "GET";
        config.pageInfo.page = "view-Statement";
        console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");        
        // Query View all 
        const userView = 'SELECT * FROM category_DB.category;';
        // DB Connections
        const danzillaDB = require("../../../modules/danzillaDB");
        // Blaze_up
        danzillaDB.pool.query(userView)
            .then(data => {
                if (data.rowCount) {
                    // return results 
                    let pageMesage = "User Total Count: " + data.rowCount;
                    console.log(pageMesage);
                    res.send({ pageMesage: pageMesage, rowCount: data.rowCount, data: data.rows });
                }
            })
            .catch(error => {
                // Error, no records to show
                let pageMesage = "Error! " + error.detail;
                console.log(pageMesage);
                res.send({ pageMesage: pageMesage });
            });
    }
}



