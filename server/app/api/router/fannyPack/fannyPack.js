'strict'
// User - Router
// User | Keep it minimal
const moment = require('moment');
const { 
    CREATE_SCHEMA_USER_FANNYPACK,
    ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK,
    VIEW_USER_FANNYPACK,
    VIEW_ALL_FANNYPACK } = require('../../config/modals/fannyPack/fannyPack_modal');
const { CREATE_TABLE_CATEGORY } = require('../../config/modals/accounts/accountCategory_modal');
const { CREATE_TABLE_ACCOUNT_TYPE } = require('../../config/modals/accounts/accountType_modal');
const { CREATE_TABLE_RECORD } = require('../../config/modals/accounts/accountRecords_modal');

// Response`
const RESPONSE = {
    Title: "FannyPack",
    status: null,
    message: null,
    data: null
}

const Add_FannyPack = function (req, res, next) {
    let FannyPack_Response = Object.create(RESPONSE);
    FannyPack_Response.Title = "Add FannyPack";
    // Require User and Pwd
	if(!req.body.user || !req.body.password || req.body.fannyPack) {
        FannyPack_Response.message = `User Details required`;
        FannyPack_Response.status = false;
        FannyPack_Response.data = "User Info required";
        res.send({ response: FannyPack_Response });
	} else {
        async function FIRE() {
            // PayLoads
            const payLoad = {
                fannyPack_serial: Token.generate(),
                fannyPack_name: req.body.fannyPack,
                fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                fannyPack_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                fannyPack_owner_serial: req.body.sessionID
            };
            try {
                let Final_results = [];
                let create_schema_user_fannyPack = await CREATE_SCHEMA_USER_FANNYPACK(payLoad.fannyPack_serial);
                let create_table_account_category = await CREATE_TABLE_CATEGORY(payLoad.fannyPack_serial);
                let create_table_account_records = await CREATE_TABLE_RECORD(payLoad.fannyPack_serial);
                let create_table_account_types = await CREATE_TABLE_ACCOUNT_TYPE(payLoad.fannyPack_serial);
                let add_newFannyPack_to_fannypacks_table = await ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK(payLoad);

                FannyPack_Response.message = `Fetched with ${data_add_userTableAuth.rowCount} rows`;
                FannyPack_Response.status = true;
                FannyPack_Response.data = Final_results;
            } catch (errr) {
                FannyPack_Response.message = `Error fetching`;
                FannyPack_Response.status = false;
                FannyPack_Response.data = errr;
            } finally {
                res.send({ response: FannyPack_Response });
            }
        } FIRE();
    }
}

// View User FannyPack
const View_user_fannyPack = function (req, res, next) {
    let FannyPack_Response = Object.create(RESPONSE);
    FannyPack_Response.Title = "View a User";
    // Require User
	if(!req.body.user) {
        FannyPack_Response.message = `User required`;
        FannyPack_Response.status = false;
        FannyPack_Response.data = "Valid user required";
        res.send({ response: FannyPack_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let sessionID = req.body.user;
            try {
                let data = await VIEW_USER_FANNYPACK(sessionID);
                FannyPack_Response.message = `Fetched with ${data.rowCount} rows`;
                FannyPack_Response.status = true;
                FannyPack_Response.data = data;
            } catch (errr) {
                FannyPack_Response.message = `Error fetching`;
                FannyPack_Response.status = false;
                FannyPack_Response.data = errr;
            } finally {
                res.send({ response: FannyPack_Response });
            }
        } FIRE();
    }
}

// View All FannyPack
const View_all_fannyPack = function (req, res, next) {
    let FannyPack_Response = Object.create(RESPONSE);
    FannyPack_Response.Title = "View All FannyPack";
    // Require User
	if(!req.body.user) {
        FannyPack_Response.message = `User required`;
        FannyPack_Response.status = false;
        FannyPack_Response.data = "Valid user required";
        res.send({ response: FannyPack_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let sessionID = req.body.user;
            try {
                let data = await VIEW_ALL_FANNYPACK(sessionID);
                FannyPack_Response.message = `Fetched with ${data.rowCount} rows`;
                FannyPack_Response.status = true;
                FannyPack_Response.data = data;
            } catch (errr) {
                FannyPack_Response.message = `Error fetching`;
                FannyPack_Response.status = false;
                FannyPack_Response.data = errr;
            } finally {
                res.send({ response: FannyPack_Response });
            }
        } FIRE();
    }
}

// Export
module.exports = {
    Add_FannyPack: Add_FannyPack,
    View_user_fannyPack: View_user_fannyPack,
    View_all_fannyPack: View_all_fannyPack
};