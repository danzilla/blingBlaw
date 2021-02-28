'strict'
// User - Router | Keep it minimal
const moment = require('moment'); // Time
const uuidv1 = require('uuid').v1; //string + salt
const uuidv5 = require('uuid').v5; //string + salt
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token

const { blingblaw, postgresDefault, database_labels } = require('../../../app.config');
const { add_user_to_userAuth, add_user_to_userDetails, view_user, view_all_user, validate_user_login, update_userDetails } = require('../../SQL_Statement/user_sql_statement');
const { create_schema_user_fannyPack, add_newFannyPack_to_fannypacks_table } = require('../../SQL_Statement/fannyPack_sql_statement');
const { create_accountCategory_table } = require('../../SQL_Statement/accountCategory_statement');
const { create_accountRecords_table } = require('../../SQL_Statement/accountRecord_sql_statement');
const { create_accounType_table } = require('../../SQL_Statement/accountType_sql_statement');

// Response
const RESPONSE = {
    Title: "User",
    status: null,
    message: null,
    data: null
}
// Query Actions
bling_actionz = function (statement) {
    const bling = new Promise(function (resolve, reject) {
        blingblaw.connect(function (error, client, release) {
            if (error) { resolve(error); }
            else if (client) {
                client.query(statement)
                    .then(data => { resolve(data); })
                    .catch(error => { reject(error); })
                    .finally(() => { release(); })
            }
        });
    }); return bling;
};

// Add_user
/* 
	add_user_to_userAuth
	add_user_to_userDetails
	create_schema_user_fannyPack
	create_table_account_category
	create_table_account_records
	create_table_account_types
	add_newFannyPack_to_fannypacks_table
*/
const Add_user = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "Add User";
    // Require User and Pwd
    if (!req.body.user || !req.body.password || !req.body.fannyPack) {
        User_Response.message = `User Details required`;
        User_Response.status = false;
        User_Response.data = "User Info required";
        res.send(User_Response);
    } else {
        // PayLoads Math.random().toString(36).substring(7)
        let user = req.body.user;
        let pwd = req.body.password;
        const user_ID = uuidv5(user, uuidv1());
        const dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const fannyPack = req.body.fannyPack;
        const fannyPack_ID = Token.generate();
        const payLoad = {
            user_serial: user_ID,
            user_name: user,
            user_pwd_salt: Token.generate(),
            user_pwd_hash: pwd,
            user_auth_token: Token.generate(),
            user_full_name: "",
            user_email: "",
            user_created: dateTime,
            user_modify: dateTime,
            user_lastLogged: dateTime,
            get user_auth_serial() { return this.user_serial },
            fannyPack_serial: fannyPack_ID,
            fannyPack_name: fannyPack,
            fannyPack_created: dateTime,
            fannyPack_lastmodify: dateTime,
            fannyPack_lastUpdated: dateTime,
            get fannyPack_owner_serial() { return this.user_serial }
        };
        bling_actionz(add_user_to_userAuth.sql(payLoad))
            .catch((error) => {
                if (error.code == "23505") {
                    User_Response.message = `Duplicate entry exits`;
                } else {
                    User_Response.message = `Error: Somethingelse`;
                }
                User_Response.status = false;
                User_Response.data = error;
                res.send(User_Response);
            })
            .then(function (result_userAuth) {
                let collect_results = new Array();
                if(!result_userAuth) {
                    console.log(`Duplicate entry exits`);
                } else if (result_userAuth.rowCount && result_userAuth.rowCount == 1) {
                    collect_results.push(result_userAuth);
                    bling_actionz(add_newFannyPack_to_fannypacks_table.sql(payLoad))
                        .catch((error) => {
                            if (error.code == "23505") {
                                User_Response.message = `Duplicate Fanny exits`;
                            } else {
                                User_Response.message = `Error: Somethingelse`;
                            }
                            User_Response.status = false;
                            User_Response.data = error;
                            res.send(User_Response);
                        })
                        .then(function (result_Fanny) {
                            collect_results.push(result_Fanny);
                            async function Fire() {
                                try {
                                    await bling_actionz(create_schema_user_fannyPack.sql(payLoad)).then(res => { collect_results.push(res) });
                                    await bling_actionz(add_user_to_userDetails.sql(payLoad)).then(res => { collect_results.push(res) });
                                    await bling_actionz(create_accountCategory_table.sql(payLoad)).then(res => { collect_results.push(res) });
                                    await bling_actionz(create_accountRecords_table.sql(payLoad)).then(res => { collect_results.push(res) });
                                    await bling_actionz(create_accounType_table.sql(payLoad)).then(res => { collect_results.push(res) });
                                    User_Response.message = `User added!`;
                                    User_Response.status = true;
                                    User_Response.data = collect_results;
                                } catch (error) {
                                    User_Response.message = `Error: Somethingelse`;
                                    User_Response.status = false;
                                    User_Response.data = error;
                                } finally { res.send(User_Response); console.log(User_Response.message); }
                            } Fire();
                        });
                }  else { 
                    User_Response.message = `Something Else Wrong`;
                    User_Response.status = false;
                    User_Response.data = result_userAuth;
                    res.send(User_Response);
                    console.log(JSON.stringify(User_Response)); 
                }
            });
    }
}

// Login
// validate_user_login (usr, pwd)
// update_userDetails (userTime)
const Login = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "Login";
    // Require User and Pwd
    if (!req.body.user || !req.body.password) {
        User_Response.message = `User and password are required`;
        User_Response.status = false;
        User_Response.data = "Credentials required";
        res.send(User_Response);
    } else {
        let payLoad = {
            userName: req.body.user,
            userPassword: req.body.password,
            user_lastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }
        let collect_results = new Array();
        bling_actionz(validate_user_login.sql(payLoad))
            .catch((error) => {
                User_Response.message = `Error: user not found`;
                User_Response.status = false;
                User_Response.data = error;
                res.send(User_Response);
            })
            .then(function (login_result) {
                if (login_result.rowCount == 1) {
                    collect_results.push(login_result);
                    async function Fire() {
                        try {
                            payLoad.user_auth_serial = login_result.rows[0].user_serial;
                            await bling_actionz(update_userDetails.sql(payLoad)).then(res => { collect_results.push(res) });
                            User_Response.message = `Logged in Success!`;
                            User_Response.status = true;
                            User_Response.data = collect_results;
                        } catch (error) {
                            User_Response.message = `Updating user failed`;
                            User_Response.status = false;
                            User_Response.data = error;
                        } finally { res.send(User_Response); }
                    } Fire();
                } else if (login_result.rowCount == 0) {
                    User_Response.message = `User not found`;
                    User_Response.status = false;
                    User_Response.data = login_result;
                    res.send(User_Response);
                } else if (login_result.code == "3D000") { 
                    User_Response.message = `No database selected`;
                    User_Response.status = false;
                    User_Response.data = login_result;
                    res.send(User_Response);
                } else {
                    User_Response.message = `Something Else Wrong`;
                    User_Response.status = false;
                    User_Response.data = login_result;
                    res.send(User_Response);
                    console.log(JSON.stringify(User_Response.data.code)); 
                }
            })
    }
}

// View User
const View_a_user = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "User info - view user";
    // Require User
    if (!req.body.user) {
        User_Response.message = `User required`;
        User_Response.status = false;
        User_Response.data = "Valid user required";
        res.send(User_Response);
    } else {
        async function FIRE() {
            // PayLoads
            let collect_results = new Array();
            let payLoad = { user_serial: req.body.user }
            try {
                await bling_actionz(view_user.sql(payLoad)).then(res => { collect_results.push(res) });
                User_Response.message = `Good`;
                User_Response.status = true;
                User_Response.data = collect_results;
            } catch (error) {
                User_Response.message = `Error fetching`;
                User_Response.status = false;
                User_Response.data = error;
            } finally { res.send(User_Response);}
        } FIRE();
    }
}


// View All User
const View_all_user = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "View all users";
    // Require User
    if (!req.body.user) {
        User_Response.message = `User required`;
        User_Response.status = false;
        User_Response.data = "Valid user required";
        res.send(User_Response);
    } else {
        async function FIRE() {
            // PayLoads
            let collect_results = new Array();
            let payLoad = { user_serial: req.body.user }
            try {
                await bling_actionz(view_all_user.sql(payLoad)).then(res => { collect_results.push(res) });
                User_Response.message = `Good`;
                User_Response.status = true;
                User_Response.data = collect_results;
            } catch (errr) {
                User_Response.message = `Error fetching`;
                User_Response.status = false;
                User_Response.data = errr;
            } finally {
                res.send(User_Response);
            }
        } FIRE();
    }
}

// Export
module.exports = {
    Login: Login,
    Add_user: Add_user,
    View_a_user: View_a_user,
    View_all_user: View_all_user
};