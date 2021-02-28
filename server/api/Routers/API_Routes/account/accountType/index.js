'strict'
// AccountType - Router
// AccountType | Keep it minimal
const moment = require('moment');
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token

const { add_newAccountType_to_accountType, view_ALL_accountType } = require('../../../SQL_Statement/accountType_sql_statement');
const { blingblaw, postgresDefault, database_labels } = require('../../../../app.config');
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
// Add AccountType
const Add_AccountType = function (req, res, next) {
    let AccountType_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    AccountType_Response.Title = "Add Account Type";
    // Require fannyID
	if(!req.body.fannyID || !req.body.accountTypeName) {
        AccountType_Response.message = `FannyPack and Account type labels are required`;
        AccountType_Response.status = false;
        AccountType_Response.data = "FannyPack required";
        res.send(AccountType_Response);
	} else {
        async function FIRE() {
            // PayLoads
            let payLoad = {
                fannyPack_serial: req.body.fannyID,
                account_type_name: req.body.accountTypeName,
                account_type_serial: Token.generate(),
                account_type_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                account_type_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }
            try {
                await bling_actionz(add_newAccountType_to_accountType.sql(payLoad)).then(res => { collect_results.push(res) });
                AccountType_Response.message = `Inserted!`;
                AccountType_Response.status = true;
                AccountType_Response.data = collect_results;
            } catch (errr) {
                AccountType_Response.message = `Error adding Account type`;
                AccountType_Response.status = false;
                AccountType_Response.data = errr;
            } finally {
                res.send(AccountType_Response);
            }
        } FIRE();
    }
}
// View AccountType
const View_AccountType = function (req, res, next) {
    let AccountType_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    AccountType_Response.Title = "Account Type view";
    // Require fannyID
	if(!req.body.fannyID) {
        AccountType_Response.message = `FannyPack required`;
        AccountType_Response.status = false;
        AccountType_Response.data = "FannyPack required";
        res.send(AccountType_Response);
	} else {
        async function FIRE() {
            try {
                let payLoad = { fannyPack_serial: req.body.fannyID }
                await bling_actionz(view_ALL_accountType.sql(payLoad)).then(res => { collect_results.push(res) });
                AccountType_Response.message = `Good View!`;
                AccountType_Response.status = true;
                AccountType_Response.data = collect_results;
            } catch (errr) {
                AccountType_Response.message = `Error fetching`;
                AccountType_Response.status = false;
                AccountType_Response.data = errr;
            } finally {
                res.send(AccountType_Response);
            }
        } FIRE();
    }
}
// Export
module.exports = {
    Add_AccountType: Add_AccountType,
    View_AccountType: View_AccountType
};



