/* Register user
 * Keep it minimal
 */
module.exports = {
    // POST
    // POST - add user module
    register: function (req, res, next) {
        // Register user - pageMessage
        let pageInfo = {
            pageCode: "",
            pageMessage: ""
          };
        if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
            pageInfo.pageMesage = "Error! cannot be empty fields";
            console.log(pageInfo.pageMesage);
            res.send({ pageInfo: pageInfo });
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
            let user_email = req.body.userName + "@cool.me";
            // let user_auth_token = uuidv5('Hello!', saltTime);
            // let user_crated = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            // Query Insert 
            const userAddQuery = 'INSERT INTO users.user_auth(' +
                'user_serial, user_name, user_pwd_salt, user_pwd_hash, user_email' +
                ') VALUES($1, $2, $3, $4, $5) RETURNING *';
            // Insert Data
            const userAddData = [ 
                user_serial, user_name, user_pwd_salt, user_pwd_hash, user_email
            ];
            // DB Connections
            const danzillaDB = require("../../../modules/danzillaDB");
            // Blaze_up
            danzillaDB.pool.query(userAddQuery, userAddData)
            .then(data => {
                if (data.rowCount === 1){
                    // records been inserted
                    pageInfo.pageMessage = "User added! #yeee " + data.rows[0].user_name;
                    pageInfo.pageCode = true;
                    res.send({ pageInfo: pageInfo });
                    console.log(JSON.stringify(pageInfo));
                }
            })
            .catch(err => {
                // if err
                pageInfo.pageMessage = err;
                if (err.code == "ECONNREFUSED" || err.code == "ENOTFOUND") {
                    pageInfo.pageMessage = "Trouble connecting to database - Is it [prod or dev?] - " + err.code;
                }
                else if (err.code == "3D000" || err.code == "42P01") {
                    pageInfo.pageMessage = "Database not inintialize " + err.code;
                }
                else if (err.code == "23505"){
                    pageInfo.pageMessage = err.detail + " " + err.code;
                }
                pageInfo.pageCode = err.code;
                res.send({ pageInfo: pageInfo });
                console.log(pageInfo.pageMessage);
            });
        }
    }
}
