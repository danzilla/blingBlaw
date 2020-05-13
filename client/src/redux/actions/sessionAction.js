import store from "../store";
import {
  fetch_user_info,
  fetch_fannyPack_info,
  fetch_fanny_account_info
} from "../../api";

const fetch_post = () => { return { type: "FETCH", data: "Loading...'" }; };
const fetched_post = () => { return { type: "FETCHED", data: "Done with task!'" }; };
const receive_error = (post) => { return { type: "RECEIVE_ERROR", data: post }; };

const active_session = (post) => { return { type: "ACTIVE_Session", data: post }; };
const active_fannyPack = (post) => { return { type: "ACTIVE_FannyPack", data: post }; };
const active_account = (post) => { return { type: "ACTIVE_Account", data: post }; };

const fetched_user = (post) => { return { type: "FETCHED_USER", data: post }; };
const fetched_user_fannyPacks = (post) => { return { type: "FETCHED_USER_FANNYPACKS", data: post }; };
const fetched_user_accounts = (post) => { return { type: "FETCHED_USER_ACCOUNTS", data: post }; };
const fetched_user_category = (post) => { return { type: "FETCHED_USER_ACCOUNTS_CATEGORY", data: post }; };
const fetched_user_types = (post) => { return { type: "FETCHED_USER_ACCOUNTS_TYPES", data: post }; };
// Start 
// - Start with UserID
//    - get userInfo - set_Fetch
//    - get userInfo - set_fetched
//    - if err - set_error
// - Use UserID and get FannyPack
//    - get userFanny - set_Fetch
//    - get userFanny - set_Fetched
//    - if err - set_error
// - Use FannyID to get Account [Category, Type, Record]
//    - get userFannyAccount - set_Fetch
//    - get userFannyAccount - set_Fetched
//    - if err - set_error
//  Active Sessions
export const ACTION_SET_ACTIVE_USER = (userID) => {
  return function (dispatch, getState) { dispatch(active_session(userID)) };
};
export const ACTION_SET_ACTIVE_FANNY = (fannyID) => {
  return function (dispatch, getState) { dispatch(active_fannyPack(fannyID)) };
};
export const ACTION_SET_ACTIVE_ACCOUNT = (accountID) => {
  return function (dispatch, getState) { dispatch(active_account(accountID)) };
};
//  ACTIONS_REFRESH
// 1. With UserID get FannyID
// 2. With FannyID get Account Lists
// 3. With FannyID, AccountID get Transaction 
let user_result, fanny_result, account_resultst;
// 1 Get Fanny
const getFannny = (dispatch, userID) => {
  async function Fire() {
    try {
      user_result = await fetch_user_info(userID)
        .then(data => { return data })
        .catch(err => { return err })
      fanny_result = await fetch_fannyPack_info(userID)
        .then(data => { return data })
        .catch(err => { return err })
    } catch (error) {
      dispatch(receive_error(error))
    } finally {
      dispatch(fetched_user(user_result))
      dispatch(fetched_user_fannyPacks(fanny_result))
      dispatch(active_session(user_result.data[0].rows[0]))
      dispatch(active_fannyPack(fanny_result.data[0].rows[0]))
    }
  } Fire();
}
// 2 Get Account
const getAccount = (dispatch, userID, fannyID) => {
  async function Fire() {
    try {
      account_resultst = await fetch_fanny_account_info(fannyID)
        .then(data => { return data })
        .catch(err => { return err })
    } catch (error) {
      dispatch(receive_error(error))
    } finally {
      dispatch(fetched_user_accounts(account_resultst.fannyAccounts.data))
      dispatch(fetched_user_category(account_resultst.fannyCategory.data))
      dispatch(fetched_user_types(account_resultst.fannyType.data))
    }
  } Fire();
}
// Refresh
export const ACTION_REFRESH = (userID, fannyID, accountID) => {
  return function (dispatch, getState) {
    dispatch(fetch_post());
    if (userID && fannyID && accountID) { // 3 IF - user - Fanny - Account = Show Transactions
      console.log("Got userID, fannyID, accountID - Getting Transactions: " + JSON.stringify(userID) + "\n" + JSON.stringify(fannyID) + "\n" + JSON.stringify(accountID));
    } else if (userID && fannyID) { // 2 IF - User + Fanny = Show Accounts_records_and_extras
      console.log("Got userID, fannyID - Getting AccountInfos " + JSON.stringify(userID) + "\n" + JSON.stringify(fannyID));
      getAccount(dispatch, userID, fannyID);
    } else if (userID) {
      console.log("Got userID - Getting FannyPacks " + JSON.stringify(userID));
      getFannny(dispatch, userID);
    } else {
      dispatch(receive_error("Error while Refresh()"))
    }
    dispatch(fetched_post());
  };
};