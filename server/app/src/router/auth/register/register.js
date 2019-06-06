/* Register user
 * Keep it minimal
 */
module.exports = {
    // POST
    // POST - add user module
    register: function (req, res, next) {
        // Register user
        let pageMesage = "";

        if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
            pageMesage = "Error! cannot be empty fields";
            console.log(pageMesage);
            res.send({ pageMesage: pageMesage, code: "bad" });
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
            const userAddQuery = 'INSERT INTO user_DB.user_auth(' +
                'user_serial, user_name, user_pwd_salt, user_pwd_hash' +
                ') VALUES($1, $2, $3, $4) RETURNING *';
            // Insert Data
            const userAddData = [ 
                user_serial, user_name, user_pwd_salt, user_pwd_hash
            ];


            // DB Connections
            const danzillaDB = require("../../../modules/danzillaDB");
            // Blaze_up
            danzillaDB.pool.query(userAddQuery, userAddData)
            .then(data => {
                if (data.rowCount === 1){
                    // records been inserted
                    pageMesage = "User added! #yeee " + data.rows[0].user_name;
                    res.send({ pageMesage: pageMesage, code: "good" });
                    console.log(pageMesage);
                }
            })
            .catch(error => {
                let pageMesage = "err";
                if (error.code == "ECONNREFUSED") {
                    pageMesage = "Error connecting to database - " + error.code;
                } else {
                    pageMesage = "Error-Reg: " + error;
                }
                // Error, no records inserted
                // code - 3D000 - No Databases
                // code - 42P01 - No Tables 
                res.send({ pageMesage: pageMesage, code: error.code });
                console.log(pageMesage);
            });
        }


    }
}
