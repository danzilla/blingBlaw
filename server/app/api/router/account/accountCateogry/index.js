'strict'
// AccountCategory - Router
// AccountCategory | Keep it minimal
const moment = require('moment');
const TokenGenerator = require('uuid-token-generator');
const Token = new TokenGenerator(); // New Token
const { add_newAccountCategory_to_accountCategory, view_ALL_accountCategory } = require('../../../../config/statement/accountType_sql_statement');
// Response
const RESPONSE = {
    Title: "Account Category",
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
// Add AccountCategory
const Add_AccountCategory = function (req, res, next) {
    let AccountCategory_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    AccountCategory_Response.Title = "Add Category, Labels, Tags";
    // Require fannyID
	if(!req.body.fannyID || !req.body.accountTypeName) {
        AccountCategory_Response.message = `FannyPack and Account type labels are required`;
        AccountCategory_Response.status = false;
        AccountCategory_Response.data = "FannyPack required";
        res.send(AccountCategory_Response);
	} else {
        async function FIRE() {
            // PayLoads
            // category_id, category_name, category_parent, category_created, category_lastmodify
            let payLoad = {
                fannyPack_serial: req.body.fannyID,
                category_id: Token.generate(),
                category_name: req.body.catName,
                category_parent: req.body.catParent,
                category_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                category_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }
            try {
                await bling_actionz(add_newAccountCategory_to_accountCategory.sql(payLoad)).then(res => { collect_results.push(res) });
                AccountCategory_Response.message = `Inserted!`;
                AccountCategory_Response.status = true;
                AccountCategory_Response.data = data;
            } catch (errr) {
                AccountCategory_Response.message = `Error adding Account type`;
                AccountCategory_Response.status = false;
                AccountCategory_Response.data = errr;
            } finally { res.send(AccountCategory_Response); }
        } FIRE();
    }
}
// View AccountCategory
const View_AccountCategory = function (req, res, next) {
    let AccountCategory_Response = Object.create(RESPONSE);
    let collect_results = new Array();
    AccountCategory_Response.Title = "Category, Labels, Tags view";
    // Require fannyID
	if(req.body.fannyID) {
        AccountCategory_Response.message = `FannyPack required`;
        AccountCategory_Response.status = false;
        AccountCategory_Response.data = "FannyPack required";
        res.send(AccountCategory_Response);
	} else {
        async function FIRE() {
            try {
                let payLoad = { fannyPack_serial: req.body.fannyID }
                await bling_actionz(view_ALL_accountCategory.sql(payLoad)).then(res => { collect_results.push(res) });
                AccountCategory_Response.message = `Inserted!`;
                AccountCategory_Response.status = true;
                AccountCategory_Response.data = data;
            } catch (errr) {
                AccountCategory_Response.message = `Error fetching`;
                AccountCategory_Response.status = false;
                AccountCategory_Response.data = errr;
            } finally { res.send(AccountCategory_Response); }
        } FIRE();
    }
}// Export
module.exports = {
    Add_AccountCategory: Add_AccountCategory,
    View_AccountCategory: View_AccountCategory
};



