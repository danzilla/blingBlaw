'strict'
// FirstRun - Router
// Install | Keep it minimal
const { blingblaw, postgresDefault, database_labels } = require('../../../config/app.config');

const { is_app_Database, create_app_Database, create_app_Schema } = require('../../../config/statement/firstRun_sql_statement');
const { create_Table_UserAuth, create_Table_UserDetails } = require('../../../config/statement/user_sql_statement');
const { create_Table_fannyPackz } = require('../../../config/statement/fannyPack_sql_statement');

// Response
const RESPONSE = {
    Title: "User",
    status: null,
    message: null,
    data: null
}
// Query Actions
bling_actionz_default = function (statement) {
    const bling = new Promise(function (resolve, reject) {
        postgresDefault.connect(function (error, client, release) {
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
// Create User
/* 
	create_Database
    create_Schema
	create_Table_UserAuth
	create_Table_UserDetails
	create_Table_fannyPackz
*/
const Install = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    User_Response.Title = "Intiate App";
    // Is_app exit
    bling_actionz_default(is_app_Database.sql)
        .then(function (result_is_db_exits) {
            if (result_is_db_exits.rowCount == 0) {
                collect_results.push(result_is_db_exits)
                // Create db_app
                bling_actionz_default(create_app_Database.sql)
                    .then(function (result_createDB) {
                        collect_results.push(result_createDB);
                        async function Fire() {
                            try {
                                // create teables
                                await bling_actionz(create_app_Schema.sql).then(res => { collect_results.push(res) });
                                await bling_actionz(create_Table_UserAuth.sql).then(res => { collect_results.push(res) });
                                await bling_actionz(create_Table_UserDetails.sql).then(res => { collect_results.push(res) });
                                await bling_actionz(create_Table_fannyPackz.sql).then(res => { collect_results.push(res) });
                                User_Response.message = `Databse Initiated!`;
                                User_Response.status = true;
                                User_Response.data = collect_results;
                            } catch (error) {
                                User_Response.message = `Error: Somethingelse x3`;
                                User_Response.status = false;
                                User_Response.data = error;
                            } finally { res.send(User_Response); console.log(User_Response.message); }
                        } Fire();
                    })
                    .catch((error) => {
                        User_Response.message = `Error: Somethingelse x2`;
                        User_Response.status = false;
                        User_Response.data = error;
                        res.send(User_Response);
                    })
            } else if (result_is_db_exits.rowCount == 1) {
                User_Response.message = `Databse with similar name Exits!`;
                User_Response.status = false;
                User_Response.data = result_is_db_exits;
                res.send(User_Response);
            }
        })
        .catch((error) => {
            console.log("err: " + JSON.stringify(error));
            User_Response.message = `Error: Somethingelse x1`;
            User_Response.status = false;
            User_Response.data = error;
            res.send(User_Response);
        })
}
// Export
module.exports = { Install: Install };