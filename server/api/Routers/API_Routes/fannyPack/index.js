'strict'
// FannyPack - Router
// FannyPack | Keep it minimal
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time

const { blingblaw, postgresDefault, database_labels } = require('../../../app.config');

const { create_schema_user_fannyPack, add_newFannyPack_to_fannypacks_table, view_user_fannyPackz, view_ALL_fannyPackz } = require('../../SQL_Statement/fannyPack_sql_statement');
const { create_accountCategory_table } = require('../../SQL_Statement/accountCategory_statement');
const { create_accountRecords_table } = require('../../SQL_Statement/accountRecord_sql_statement');
const { create_accounType_table } = require('../../SQL_Statement/accountType_sql_statement');

// Response
const RESPONSE = {
    Title: "FannyPack",
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
// Create FannyPack
/* 
	create_schema_user_fannyPack
	create_table_account_category
	create_table_account_records
	create_table_account_types
	add_newFannyPack_to_fannypacks_table
*/
const Add_Fanny = function (req, res, next) {
    let Fanny_Response = Object.create(RESPONSE);
    Fanny_Response.Title = "Add FannyPack";
    // Require FannyPack and User
    if (!req.body.user || !req.body.fannyPack) {
        Fanny_Response.message = `FannyPack Details required`;
        Fanny_Response.status = false;
        Fanny_Response.data = "FannyPack Info required";
        res.send(Fanny_Response);
    } else {
        // PayLoads Math.random().toString(36).substring(7)
        const user_ID = req.body.user;
        const fannyPack = req.body.fannyPack;
        const fannyPack_ID = Token.generate();
        const dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const payLoad = {
            user_serial: user_ID,
            get user_auth_serial() { return this.user_serial },
            fannyPack_serial: fannyPack_ID,
            fannyPack_name: fannyPack,
            fannyPack_created: dateTime,
            fannyPack_lastmodify: dateTime,
            fannyPack_lastUpdated: dateTime,
            get fannyPack_owner_serial() { return this.user_serial }
        };
        let collect_results = new Array();
        bling_actionz(add_newFannyPack_to_fannypacks_table.sql(payLoad))
            .catch((error) => {
                if (error.code == "23505") {
                    Fanny_Response.message = `Duplicate Fanny exits`;
                } else { Fanny_Response.message = `Error: Somethingelse`; }
                Fanny_Response.status = false;
                Fanny_Response.data = error;
                res.send(Fanny_Response);
            })
            .then(function (result_Fanny) {
                collect_results.push(result_Fanny);
                async function Fire() {
                    try {
                        await bling_actionz(create_schema_user_fannyPack.sql(payLoad)).then(res => { collect_results.push(res) });
                        await bling_actionz(create_accountCategory_table.sql(payLoad)).then(res => { collect_results.push(res) });
                        await bling_actionz(create_accountRecords_table.sql(payLoad)).then(res => { collect_results.push(res) });
                        await bling_actionz(create_accounType_table.sql(payLoad)).then(res => { collect_results.push(res) });
                        Fanny_Response.message = `FannyPack added!`;
                        Fanny_Response.status = true;
                        Fanny_Response.data = collect_results;
                    } catch (error) {
                        Fanny_Response.message = `Error: Somethingelse`;
                        Fanny_Response.status = false;
                        Fanny_Response.data = error;
                    } finally { res.send(Fanny_Response); console.log(Fanny_Response.message); }
                } Fire();
            });
    }
}
// View FannyPack
const View_user_fanny = function (req, res, next) {
    let Fanny_Response = Object.create(RESPONSE);
    Fanny_Response.Title = "FannyPack info - view fanny";
    // Require FannyPack
    if (!req.body.user) {
        Fanny_Response.message = `FannyPack required`;
        Fanny_Response.status = false;
        Fanny_Response.data = "Valid fanny required";
        res.send(Fanny_Response);
    } else {
        async function FIRE() {
            // PayLoads
            let collect_results = new Array();
            let payLoad = { user_serial: req.body.user }
            try {
                await bling_actionz(view_user_fannyPackz.sql(payLoad)).then(res => { collect_results.push(res) });
                Fanny_Response.message = `Good`;
                Fanny_Response.status = true;
                Fanny_Response.data = collect_results;
            } catch (error) {
                Fanny_Response.message = `Error fetching`;
                Fanny_Response.status = false;
                Fanny_Response.data = error;
            } finally {
                res.send(Fanny_Response);
            }
        } FIRE();
    }
}
// View FannyPack
const View_all_user_fanny = function (req, res, next) {
    let Fanny_Response = Object.create(RESPONSE);
    Fanny_Response.Title = "FannyPack info - view fanny";
    // Require FannyPack
    if (!req.body.user) {
        Fanny_Response.message = `User required`;
        Fanny_Response.status = false;
        Fanny_Response.data = "Valid user required";
        res.send(Fanny_Response);
    } else {
        async function FIRE() {
            // PayLoads
            let collect_results = new Array();
            let payLoad = { user_serial: req.body.user }
            try {
                await bling_actionz(view_ALL_fannyPackz.sql(payLoad)).then(res => { collect_results.push(res) });
                Fanny_Response.message = `Good`;
                Fanny_Response.status = true;
                Fanny_Response.data = collect_results;
            } catch (error) {
                Fanny_Response.message = `Error fetching`;
                Fanny_Response.status = false;
                Fanny_Response.data = error;
            } finally {
                res.send(Fanny_Response);
            }
        } FIRE();
    }
}
// Export
module.exports = {
    Add_Fanny: Add_Fanny,
    View_user_fanny: View_user_fanny,
    View_all_user_fanny: View_all_user_fanny
};