'strict'
// Category - Router
// Category | Keep it minimal
const moment = require('moment');
const { 
    VIEW_ALL_ACCOUNT_TYPE, 
    ADD_NEW_ACCOUNT_TYPE_to_TABLE_ACCOUNT_TYPE,
    CREATE_TABLE_ACCOUNT_TYPE
} = require('../../../config/modals/Category_modal');
// Response
const RESPONSE = {
    Title: "Category, Labels, Tags",
    status: null,
    message: null,
    data: null
}
// View Table Category
const View_Category = function (req, res, next) {
    let Category_Response = Object.create(RESPONSE);
    Category_Response.Title = "View Categories and Labels";
    // Require fannyID
	if(!req.body.fannyID) {
        Category_Response.message = `FannyPack required`;
        Category_Response.status = false;
        Category_Response.data = "FannyPack required";
        res.send({ response: Category_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let fannyID = req.body.fannyID;
            try {
                let data = await CREATE_TABLE_ACCOUNT_TYPE(fannyID);
                Category_Response.message = `Fetched with ${data.rowCount} rows`;
                Category_Response.status = true;
                Category_Response.data = data;
            } catch (errr) {
                Category_Response.message = `Error fetching`;
                Category_Response.status = false;
                Category_Response.data = errr;
            } finally {
                res.send({ response: Category_Response });
            }
        } FIRE();
    }
}
// Add Category to table
const Add_Category = function (req, res, next) {
    let Category_Response = Object.create(RESPONSE);
    Category_Response.Title = "Add a Category and Label";
    // Require fannyID
	if(!req.body.fannyID) {
        Category_Response.message = `FannyPack required`;
        Category_Response.status = false;
        Category_Response.data = "FannyPack required";
        res.send({ response: Category_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let fannyID = req.body.fannyID;
            try {
                let data = await CREATE_TABLE_ACCOUNT_TYPE(fannyID);
                Category_Response.message = `Fetched with ${data.rowCount} rows`;
                Category_Response.status = true;
                Category_Response.data = data;
            } catch (errr) {
                Category_Response.message = `Error fetching`;
                Category_Response.status = false;
                Category_Response.data = errr;
            } finally {
                res.send({ response: Category_Response });
            }
        } FIRE();
    }
}
// Create Table Category
const CreateTable_Category = function (req, res, next) {
    let Category_Response = Object.create(RESPONSE);
    Category_Response.Title = "Create Table Category";
    // Require fannyID
	if(!req.body.fannyID) {
        Category_Response.message = `FannyPack required`;
        Category_Response.status = false;
        Category_Response.data = "FannyPack required";
        res.send({ response: Category_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let fannyID = req.body.fannyID;
            try {
                let data = await CREATE_TABLE_ACCOUNT_TYPE(fannyID);
                Category_Response.message = `Fetched with ${data.rowCount} rows`;
                Category_Response.status = true;
                Category_Response.data = data;
            } catch (errr) {
                Category_Response.message = `Error fetching`;
                Category_Response.status = false;
                Category_Response.data = errr;
            } finally {
                res.send({ response: Category_Response });
            }
        } FIRE();
    }
}
// Export
module.exports = { 
    CreateTable_Category: CreateTable_Category
};



