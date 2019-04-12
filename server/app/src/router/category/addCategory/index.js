/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
    // POST
    // POST - add Category module
    addCategory: function (req, res, next) {
        // get session info and set config.pageInfo
        config.pageInfo.request = "POST";
        config.pageInfo.page = "Category-react";
        console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
        /*
            CREATE TABLE category_DB.category (
            category_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            category_serial VARCHAR(36) NOT NULL UNIQUE,
            category_name VARCHAR(254) NOT NULL,
            category_parent VARCHAR(36) NOT NULL,
            category_created TIMESTAMP,
            category_updated TIMESTAMP
            );
        */

        // generate - unique_id 
        // https://www.npmjs.com/package/uuid
        const uuidv1 = require('uuid/v1'); //Time_based - saltTime
        const moment = require('moment'); // Time
        const uuidv5 = require('uuid/v5'); //string + salt

        // Prepare - data
        category_name = req.body.categoryName;
        category_parent = req.body.categoryParent;
        category_created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        category_serial = uuidv5(req.body.categoryName, uuidv1());

        // categoryAddData - payload
        const categoryAddData = [
            category_serial, category_name, category_parent, category_created
        ]
        // categoryAddQuery - Query
        const categoryAddQuery = 'INSERT INTO category_db.category(' +
            'category_serial, category_name, category_parent, category_created' +
            ') VALUES($1, $2, $3, $4) RETURNING *';
        // DB Connections
        const danzillaDB = require("../../../modules/danzillaDB");
        // Blaze_up
        danzillaDB.pool.query(categoryAddQuery, categoryAddData)
        .then(data => {
            if (data.rowCount === 1) {
                // records been inserted
                let pageMesage = "Category added! " + data.rows[0].category_name;
                res.send({ pageMesage: pageMesage });
                console.log(pageMesage);
            }
        })
        .catch(error => {
            // Error, no records inserted
            let pageMesage = "Error! " + error;
            res.send({ pageMesage: pageMesage });
            console.log(pageMesage);
        });
    }
}
