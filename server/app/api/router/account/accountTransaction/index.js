'strict'
// Transaction - Router
// Transaction | Keep it minimal
const moment = require('moment');
const { ADD_NEW_TRANSACTION_to_TABLE_TRANSACTION, VIEW_ALL_TRANSACTIONS } = require('../../../config/modals/accounts/accountTransaction_modal');
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
                let fannyID = req.body.fannyID;
                let accountID = req.body.accountID;
                let transactions = req.body.transactions;
                
                let data = await ADD_NEW_TRANSACTION_to_TABLE_TRANSACTION(fannyID, accountID, transactions);
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
                let fannyID = req.body.fannyID;
                let accountID = req.body.accountID;
                let data = await VIEW_ALL_TRANSACTIONS(fannyID, accountID);
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



