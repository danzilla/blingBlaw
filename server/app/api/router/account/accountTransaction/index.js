'strict'
// Transaction - Router
// Transaction | Keep it minimal
const moment = require('moment');
const { add_newTransaction_to_accountTransaction_table, view_ALL_accountTransaction } = require('../../../../config/statement/accountTransaction_sql_statement');
const { blingblaw, postgresDefault, database_labels } = require('../../../../config/app.config');

// Response
const RESPONSE = {
    Title: "Transaction",
    status: null,
    message: null,
    data: null
}
// Add Transaction
const Add_Transactions = function (req, res, next) {
    let Transaction_Response = Object.create(RESPONSE);
    Transaction_Response.Title = "Add Transaction";
    // Require fannyID
	if(!req.body.fannyID || !!req.body.accountID || !req.body.transactions) {
        Transaction_Response.message = `FannyPack required`;
        Transaction_Response.status = false;
        Transaction_Response.data = "FannyPack required";
        res.send({ response: Transaction_Response });
	} else {
        async function FIRE() {
            try {
                // PayLoads
                /* 
                    [
                        Token.generate(),
                        result.transaction_Date,
                        result.transaction_Desc,
                        result.transaction_Deposits,
                        result.transaction_Withdrawls,
                        result.transaction_Balance,
                        `{${result.transaction_Category}}`,
                        result.transaction_Comments,
                        `{${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}}`,
                        req.body.userSerial
                    ]
                */
                await bling_actionz(add_newTransaction_to_accountTransaction_table.sql(payLoad)).then(res => { collect_results.push(res) });
                Transaction_Response.message = `Fetched with ${data.rowCount} rows`;
                Transaction_Response.status = true;
                Transaction_Response.data = data;
            } catch (errr) {
                Transaction_Response.message = `Error fetching`;
                Transaction_Response.status = false;
                Transaction_Response.data = errr;
            } finally {
                res.send({ response: Transaction_Response });
            }
        } FIRE();
    }
}
// View Transaction
const View_Transactions = function (req, res, next) {
    let Transaction_Response = Object.create(RESPONSE);
    Transaction_Response.Title = "Transaction view";
    // Require fannyID
	if(!req.body.fannyID || !req.body.accountID) {
        Transaction_Response.message = `FannyPack required`;
        Transaction_Response.status = false;
        Transaction_Response.data = "FannyPack required";
        res.send({ response: Transaction_Response });
	} else {
        async function FIRE() {
            try {
                // PayLoads
                let payLoad = {
                    fannyPack_serial: req.body.fannyID,
                    account_serial: req.body.accountID
                }
                await bling_actionz(view_ALL_accountTransaction.sql(payLoad)).then(res => { collect_results.push(res) });
                Transaction_Response.message = `Fetched with ${data.rowCount} rows`;
                Transaction_Response.status = true;
                Transaction_Response.data = data;
            } catch (errr) {
                Transaction_Response.message = `Error fetching`;
                Transaction_Response.status = false;
                Transaction_Response.data = errr;
            } finally {
                res.send({ response: Transaction_Response });
            }
        } FIRE();
    }
}
// Export
module.exports = { 
    Add_Transactions: Add_Transactions,
    View_Transactions: View_Transactions   
};



