'strict'
// AccountType - Router
// AccountType | Keep it minimal
const moment = require('moment');
const { 
    VIEW_ALL_ACCOUNT_TYPE, 
    ADD_NEW_ACCOUNT_TYPE_to_TABLE_ACCOUNT_TYPE,
    CREATE_TABLE_ACCOUNT_TYPE
} = require('../../../config/modals/accounts/accountType_modal');
// Response
const RESPONSE = {
    Title: "Account Types",
    status: null,
    message: null,
    data: null
}
// View AccountType
const View_AccountType = function (req, res, next) {
    let AccountType_Response = Object.create(RESPONSE);
    AccountType_Response.Title = "Account Type view";
    // Require fannyID
	if(req.body.fannyID) {
        AccountType_Response.message = `FannyPack required`;
        AccountType_Response.status = false;
        AccountType_Response.data = "FannyPack required";
        res.send({ response: AccountType_Response });
	} else {
        async function FIRE() {
            try {
                let fannyID = req.body.fannyID;
                let data = await VIEW_ALL_ACCOUNT_TYPE(fannyID);
                AccountType_Response.message = `Fetched with ${data.rowCount} rows`;
                AccountType_Response.status = true;
                AccountType_Response.data = data;
            } catch (errr) {
                AccountType_Response.message = `Error fetching`;
                AccountType_Response.status = false;
                AccountType_Response.data = errr;
            } finally {
                res.send({ response: AccountType_Response });
            }
        } FIRE();
    }
}
// Add AccountType
const Add_AccountType = function (req, res, next) {
    let AccountType_Response = Object.create(RESPONSE);
    AccountType_Response.Title = "Add Account Type";
    // Require fannyID
	if(!req.body.fannyID || !req.body.accountTypeName) {
        AccountType_Response.message = `FannyPack and Account type labels are required`;
        AccountType_Response.status = false;
        AccountType_Response.data = "FannyPack required";
        res.send({ response: AccountType_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let fannyID = req.body.fannyID;
            let accountTypeName = req.body.accountTypeName;
            let accounTypeCreated = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            let accounTypeLastModify = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            try {
                let data = await ADD_NEW_ACCOUNT_TYPE_to_TABLE_ACCOUNT_TYPE(fannyID, accountTypeName, accounTypeCreated, accounTypeLastModify);
                AccountType_Response.message = `Fetched with ${data.rowCount} rows`;
                AccountType_Response.status = true;
                AccountType_Response.data = data;
            } catch (errr) {
                AccountType_Response.message = `Error fetching`;
                AccountType_Response.status = false;
                AccountType_Response.data = errr;
            } finally {
                res.send({ response: AccountType_Response });
            }
        } FIRE();
    }
}
// Create Table AccountType
const CreateTable_AccountType = function (req, res, next) {
    let AccountType_Response = Object.create(RESPONSE);
    AccountType_Response.Title = "Create Table Account Type";
    // Require fannyID
	if(!req.body.fannyID) {
        AccountType_Response.message = `FannyPack required`;
        AccountType_Response.status = false;
        AccountType_Response.data = "FannyPack required";
        res.send({ response: AccountType_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let fannyID = req.body.fannyID;
            try {
                let data = await CREATE_TABLE_ACCOUNT_TYPE(fannyID);
                AccountType_Response.message = `Fetched with ${data.rowCount} rows`;
                AccountType_Response.status = true;
                AccountType_Response.data = data;
            } catch (errr) {
                AccountType_Response.message = `Error fetching`;
                AccountType_Response.status = false;
                AccountType_Response.data = errr;
            } finally {
                res.send({ response: AccountType_Response });
            }
        } FIRE();
    }
}
// Export
module.exports = { 
    CreateTable_AccountType: CreateTable_AccountType,
    View_AccountType: View_AccountType,
    Add_AccountType: Add_AccountType
};



