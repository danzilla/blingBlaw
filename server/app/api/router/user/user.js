'strict'
// User - Router
// User | Keep it minimal
const moment = require('moment');
const {
    ADD_NEW_USER_to_TABLE_USER_AUTH,
    ADD_NEW_USER_to_TABLE_USER_DETAILS, 
    VIEW_USER, 
    VIEW_ALL_USERS,
    VALIDATE_USER_LOGIN,
    UPDATE_USER_LOGIN } = require('../../config/modals/user/user_modal');
const { 
    CREATE_SCHEMA_USER_FANNYPACK,
    ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK } = require('../../config/modals/fannyPack/fannyPack_modal');
const { CREATE_TABLE_CATEGORY } = require('../../config/modals/accounts/accountCategory_modal');
const { CREATE_TABLE_ACCOUNT_TYPE } = require('../../config/modals/accounts/accountType_modal');
const { CREATE_TABLE_RECORD } = require('../../config/modals/accounts/accountRecords_modal');

// Response
const RESPONSE = {
    Title: "User",
    status: null,
    message: null,
    data: null
}

// Login
// validate_user_login (usr, pwd)
// update_userDetails (userTime)
const Login = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "Login";
    // Require User and Pwd
	if(req.body.user || req.body.password) {
        User_Response.message = `User and password are required`;
        User_Response.status = false;
        User_Response.data = "Credentials required";
        res.send({ response: User_Response });
	} else {
        let Final_results = [];
        async function FIRE() {
            // PayLoads
            let user = req.body.user;
            let password = req.body.password;
            try {
                let data_login = await VALIDATE_USER_LOGIN(user, password);
                let data_updateUser =  await UPDATE_USER_LOGIN(user, password);
                console.log("data_login: " + JSON.stringify(data_updateUser));


                User_Response.message = `Fetched with ${data_login.rowCount} rows`;
                User_Response.status = true;
                User_Response.data = Final_results;
            } catch (error) {
                console.log("EEE: " + JSON.stringify(error));
                User_Response.message = `Error fetching`;
                User_Response.status = false;
                User_Response.data = error;
            } finally {
                
            }
        } FIRE();
        res.send({ response: Final_results });
    }
}

// View User
const View_a_user = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "View a User";
    // Require User
	if(!req.body.user) {
        User_Response.message = `User required`;
        User_Response.status = false;
        User_Response.data = "Valid user required";
        res.send({ response: User_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let user = req.body.user;
            try {
                let data = await VIEW_USER(user);
                User_Response.message = `Fetched with ${data.rowCount} rows`;
                User_Response.status = true;
                User_Response.data = data;
            } catch (errr) {
                User_Response.message = `Error fetching`;
                User_Response.status = false;
                User_Response.data = errr;
            } finally {
                res.send({ response: User_Response });
            }
        } FIRE();
    }
}

// View All User
const View_all_user = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "View All User";
    // Require User
	if(!req.body.user) {
        User_Response.message = `User required`;
        User_Response.status = false;
        User_Response.data = "Valid user required";
        res.send({ response: User_Response });
	} else {
        async function FIRE() {
            // PayLoads
            let user = req.body.user;
            try {
                let data = await VIEW_ALL_USERS(user);
                User_Response.message = `Fetched with ${data.rowCount} rows`;
                User_Response.status = true;
                User_Response.data = data;
            } catch (errr) {
                User_Response.message = `Error fetching`;
                User_Response.status = false;
                User_Response.data = errr;
            } finally {
                res.send({ response: User_Response });
            }
        } FIRE();
    }
}

// Create User
/* 
	add_user_to_userAuth
	add_user_to_userDetails
	create_schema_user_fannyPack
	create_table_account_category
	create_table_account_records
	create_table_account_types
	add_newFannyPack_to_fannypacks_table
*/
const Add_user = function (req, res, next) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "Add User";
    // Require User and Pwd
	if(!req.body.user || !req.body.password || req.body.fannyPack) {
        User_Response.message = `User Details required`;
        User_Response.status = false;
        User_Response.data = "User Info required";
        res.send({ response: User_Response });
	} else {
        async function FIRE() {
            // PayLoads
            const payLoad = {
                user_serial: uuidv5(req.body.user, uuidv1()),
                user_name: req.body.user,
                user_pwd_salt: Token.generate(),
                user_pwd_hash: req.body.password,
                user_auth_token: Token.generate(),
                user_full_name: "",
                user_email: "",
                user_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                user_modify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                user_lastLogged: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                get user_auth_serial(){ return this.user_serial },
                fannyPack_serial: Token.generate(),
                fannyPack_name: req.body.fannyPack,
                fannyPack_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                fannyPack_lastmodify: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                fannyPack_lastUpdated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                get fannyPack_owner_serial(){ return this.user_serial }
            };
            try {
                let Final_results = [];
                let add_user_to_userAuth = await ADD_NEW_USER_to_TABLE_USER_AUTH(payLoad);
                let add_user_to_userDetails = await ADD_NEW_USER_to_TABLE_USER_DETAILS(payLoad);
                let create_schema_user_fannyPack = await CREATE_SCHEMA_USER_FANNYPACK(payLoad.fannyPack_serial);
                let create_table_account_category = await CREATE_TABLE_CATEGORY(payLoad.fannyPack_serial);
                let create_table_account_records = await CREATE_TABLE_RECORD(payLoad.fannyPack_serial);
                let create_table_account_types = await CREATE_TABLE_ACCOUNT_TYPE(payLoad.fannyPack_serial);
                let add_newFannyPack_to_fannypacks_table = await ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK(payLoad);

                User_Response.message = `Fetched with ${data_add_userTableAuth.rowCount} rows`;
                User_Response.status = true;
                User_Response.data = Final_results;
            } catch (errr) {
                User_Response.message = `Error fetching`;
                User_Response.status = false;
                User_Response.data = errr;
            } finally {
                res.send({ response: User_Response });
            }
        } FIRE();
    }
}

// Export
module.exports = {
    Login: Login,
    Add_user: Add_user,
    View_a_user: View_a_user,
    View_all_user: View_all_user
};