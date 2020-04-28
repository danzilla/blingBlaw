'strict'
// AccountRecord - Router
// AccountRecord | Keep it minimal
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const moment = require('moment'); // Time
const { ADD_NEW_RECORD_to_TABLE_RECORD, VIEW_ALL_RECORDS } = require('../../../config/modals/accounts/accountRecords_modal');
const { CREATE_TABLE_TRANSACTION } = require('../../../config/modals/accounts/accountTransaction_modal');

// Response
const RESPONSE = {
    Title: "Account Record",
    status: null,
    message: null,
    data: null
}

// Create Account
// Create_table_transaction (fannyID, account_id)
// Add_table_info_to_Account_Record (fannyID, account_info)
const Create_Account = function (req, res, next) {
    let AccountRecord_Response = Object.create(RESPONSE);
    AccountRecord_Response.Title = "Create AccountRecord";
    // Require fannyID
	if(!req.body.fannyID || !!req.body.accountName || req.body.accountType) {
        AccountRecord_Response.message = `FannyPack required`;
        AccountRecord_Response.status = false;
        AccountRecord_Response.data = "FannyPack required";
        res.send({ response: AccountRecord_Response });
	} else {
        async function FIRE() {
            try {
                let Final_results = [];
                // PayLoads
                let fannyID = req.body.fannyID;
                let payLoad = {
                    accountOwnerSerial: req.body.sessionID,
                    accountID: Token.generate(),
                    accountName: req.body.accountName,
                    accountCreated : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    accountLastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    accountTypeId: req.body.accountType,
                }
                let data_AccountRecord_add = await ADD_NEW_RECORD_to_TABLE_RECORD(fannyID, payLoad);
                let data_AccountTransaction_create = await CREATE_TABLE_TRANSACTION(fannyID, payLoad.accountID);
                Final_results.push(data_AccountRecord_add);
                Final_results.push(data_AccountTransaction_create);

                AccountRecord_Response.message = `Fetched with ${data.rowCount} rows`;
                AccountRecord_Response.status = true;
                AccountRecord_Response.data = results;
            } catch (errr) {
                AccountRecord_Response.message = `Error fetching`;
                AccountRecord_Response.status = false;
                AccountRecord_Response.data = errr;
            } finally {
                res.send({ response: AccountRecord_Response });
            }
        } FIRE();
    }
}

// View Account Records
const View_AccountRecords = function (req, res, next) {
    let AccountRecord_Response = Object.create(RESPONSE);
    AccountRecord_Response.Title = "Account Records view";
    // Require fannyID
	if(!req.body.fannyID) {
        AccountRecord_Response.message = `FannyPack required`;
        AccountRecord_Response.status = false;
        AccountRecord_Response.data = "FannyPack required";
        res.send({ response: AccountRecord_Response });
	} else {
        async function FIRE() {
            try {
                // PayLoads
                let fannyID = req.body.fannyID;
                let data = await VIEW_ALL_RECORDS(fannyID);
                AccountRecord_Response.message = `Fetched with ${data.rowCount} rows`;
                AccountRecord_Response.status = true;
                AccountRecord_Response.data = data;
            } catch (errr) {
                AccountRecord_Response.message = `Error fetching`;
                AccountRecord_Response.status = false;
                AccountRecord_Response.data = errr;
            } finally {
                res.send({ response: AccountRecord_Response });
            }
        } FIRE();
    }
}

// Export
module.exports = { 
    Create_Account: Create_Account,
    View_AccountRecords: View_AccountRecords   
};



