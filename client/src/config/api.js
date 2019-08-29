// BlingBlaw - API - REST
const fetch_api_url = "http://localhost:5000";
// Build Database
const first_run = fetch_api_url + "/firstrun";
// User login
const auth_login = fetch_api_url + "/user/login";
const add_user = fetch_api_url + "/user/add";
const get_user = fetch_api_url + "/user/view";
const get_all_users = fetch_api_url + "/user/view/all";
// User FannyPack
const add_user_fannyPack = fetch_api_url + "/fannypack/add";
const get_user_fannyPack = fetch_api_url + "/fannypack/view";   // req-serial
const get_all_fannyPack = fetch_api_url + "/fannypack/view/all";
// User_account_category
const add_category = fetch_api_url + "/account/category/add";
const get_category = fetch_api_url + "/account/category/view";
// User_account_type
const add_account_type = fetch_api_url + "/account/type/add";
const get_account_type = fetch_api_url + "/account/type/view";
// User_account_transaction
const add_transaction = fetch_api_url + "/account/transaction/add";
const get_transaction = fetch_api_url + "/account/transaction/view";

