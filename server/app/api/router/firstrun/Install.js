'strict'
// FirstRun - Router
// Install | Keep it minimal
const { blingblaw, postgresDefault, database_labels } = require('../../../config/app.config');
// Bling_statements
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
    async function Fire() {
        try {
            await bling_actionz_default(is_app_Database.sql)
                .then(function (res) { collect_results.push(res) });
            await bling_actionz_default(create_app_Database.sql)
                .then(function (res) { collect_results.push(res) });

            await bling_actionz(create_app_Schema.sql)
                .then(function (res) { collect_results.push(res) });

            await bling_actionz(create_Table_UserAuth.sql)
                .then(function (res) { collect_results.push(res) });
            await bling_actionz(create_Table_UserDetails.sql)
                .then(function (res) { collect_results.push(res) });
            await bling_actionz(create_Table_fannyPackz.sql)
                .then(function (res) { collect_results.push(res) });

            User_Response.status = true;
            User_Response.data = collect_results;
        } catch (error) {
            if (error.code == "42P04") {
                User_Response.message = "Databse with similar name Exits!";
            } else {
                User_Response.message = `Weird....`;
            }
            User_Response.status = false;
            User_Response.data = error;
        } finally {
            res.send(User_Response);
        }
    } Fire();
}
// Export
module.exports = { Install: Install };