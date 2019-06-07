/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
    // POST
    // POST - add user module
    addUserPOST: function (req, res, next) {
        // get session info and set config.pageInfo
        config.pageInfo.request = "POST";
        config.pageInfo.page = "Register-react";
        console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");        

        if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
            let pageMesage = "Error! cannot be empty fields";
            res.send({ pageMesage: pageMesage });
            console.log(pageMesage);
        } else { 

            // TODO: JOIN Tables Insert - Map Groups and Permissions
            // API: Store

            // user_group table 
            // generate - unique_id 
            // https://www.npmjs.com/package/uuid
            const uuidv5 = require('uuid/v5'); //string + salt
            const uuidv1 = require('uuid/v1'); //Time_based - saltTime
            const moment = require('moment'); // Time

            // prepare data
            // random Salt from Time
            let user_pwd_salt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            let user_serial = uuidv5(req.body.userName, uuidv1());
            let user_name = req.body.userName;
            let user_pwd_hash = req.body.password; // Salt!

            // let user_auth_token = uuidv5('Hello!', saltTime);
            // let user_crated = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

            // Query Insert 
            const userAddQuery = 'INSERT INTO users.user_auth(' +
                'user_serial, user_name, user_pwd_salt, user_pwd_hash' +
                ') VALUES($1, $2, $3, $4) RETURNING *';
            // Insert Data
            const userAddData = [
                user_serial,
                user_name,
                user_pwd_salt,
                user_pwd_hash
            ];
            // DB Connections
            const danzillaDB = require("../../../modules/danzillaDB");
            // Blaze_up
            danzillaDB.pool.query(userAddQuery, userAddData)
            .then(data => {
                if (data.rowCount === 1){
                    // records been inserted
                    let pageMesage = "User added! " + data.rows[0].user_name;
                    res.send({ pageMesage: pageMesage });
                    console.log(pageMesage);
                }
            })
            .catch(error => {
                // Error, no records inserted
                // code - 3D000 - No Databases
                // code - 42P01 - No Tables 
                let pageMesage = "Error-Reg: " + error;
                console.log(pageMesage);
                res.send({ pageMesage: pageMesage, code: error.code  });
            });
        }
    }
}
