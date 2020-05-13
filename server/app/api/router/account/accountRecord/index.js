'strict'
// AccountRecord - Router
// AccountRecord | Keep it minimal
const moment = require('moment');
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const { add_newAccount_to_accountRecord, view_ALL_accountRecord } = require('../../../../config/statement/accountRecord_sql_statement');
const { create_accountTransaction_table } = require('../../../../config/statement/accountTransaction_sql_statement');
const { blingblaw, postgresDefault, database_labels } = require('../../../../config/app.config');

// Response
const RESPONSE = {
    Title: "Account Types",
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
// Add AccountRecord
const Add_AccountRecord = function (req, res, next) {
    let AccountRecord_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    AccountRecord_Response.Title = "Add Account Record";
    // Require fannyID
	if(!req.body.fannyID || !req.body.sessionID || !req.body.accountName || !req.body.accountType) {
        AccountRecord_Response.message = `Account records`;
        AccountRecord_Response.status = false;
        AccountRecord_Response.data = "FannyPack required";
        res.send(AccountRecord_Response);
	} else {
        async function FIRE() {
            // PayLoads
            let payLoad = {
                fannyPack_serial: req.body.fannyID,
                account_type_id: req.body.accountType,
                account_owner_serial: req.body.sessionID,
                account_name: req.body.accountName,
                account_serial: Token.generate(),
                account_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                account_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }
            let collect_results = new Array();
            try {
                await bling_actionz(add_newAccount_to_accountRecord.sql(payLoad)).then(res => { collect_results.push(res) });
                await bling_actionz(create_accountTransaction_table.sql(payLoad)).then(res => { collect_results.push(res) });
                AccountRecord_Response.message = `Inserted!`;
                AccountRecord_Response.status = true;
                AccountRecord_Response.data = collect_results;
            } catch (errr) {
                AccountRecord_Response.message = `Error adding Account type`;
                AccountRecord_Response.status = false;
                AccountRecord_Response.data = errr;
            } finally {
                res.send(AccountRecord_Response);
            }
        } FIRE();
    }
}
// View AccountRecord
const View_AccountRecord = function (req, res, next) {
    let AccountRecord_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    AccountRecord_Response.Title = "Account Record view";
    // Require fannyID
	if(!req.body.fannyID) {
        AccountRecord_Response.message = `FannyPack required`;
        AccountRecord_Response.status = false;
        AccountRecord_Response.data = "FannyPack required";
        res.send(AccountRecord_Response);
	} else {
        async function FIRE() {
            try {
                let payLoad = { fannyPack_serial: req.body.fannyID }
                await bling_actionz(view_ALL_accountRecord.sql(payLoad)).then(res => { collect_results.push(res) });
                AccountRecord_Response.message = `Good View!`;
                AccountRecord_Response.status = true;
                AccountRecord_Response.data = collect_results;
            } catch (errr) {
                AccountRecord_Response.message = `Error fetching`;
                AccountRecord_Response.status = false;
                AccountRecord_Response.data = errr;
            } finally {
                res.send(AccountRecord_Response);
            }
        } FIRE();
    }
}
// Export
module.exports = {
    Add_AccountRecord: Add_AccountRecord,
    View_AccountRecord: View_AccountRecord
};



