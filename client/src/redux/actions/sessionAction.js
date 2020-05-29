import store from "../store";
import {
  fetch_user_info,
  fetch_fannyPack_info,
  fetch_fanny_account_info
} from "../../api";
// Error management
const fetch_post = () => { return { type: "FETCH", data: "Loading...'" }; };
const fetched_post = () => { return { type: "FETCHED", data: "Done with task!'" }; };
const receive_error = (post) => { return { type: "RECEIVE_ERROR", data: post }; };
//  Active_States
export const ACTION_SET_ACTIVE_SESSION = (post) => { return { type: "ACTIVE_Session", data: post }; };
export const ACTION_SET_ACTIVE_FANNY = (post) => { return { type: "ACTIVE_FannyPack", data: post }; };
export const ACTION_SET_ACTIVE_ACCOUNT = (post) => { return { type: "ACTIVE_Account", data: post }; };
// Fetched_Results
const fetched_user = (post) => { return { type: "FETCHED_USER", data: post }; };
const fetched_user_fannyPacks = (post) => { return { type: "FETCHED_USER_FANNYPACKS", data: post }; };
const fetched_user_accounts = (post) => { return { type: "FETCHED_USER_ACCOUNTS", data: post }; };
const fetched_user_account_types = (post) => { return { type: "FETCHED_USER_ACCOUNTS_TYPES", data: post }; };
const fetched_user_account_category = (post) => { return { type: "FETCHED_USER_ACCOUNTS_CATEGORY", data: post }; };
const fetched_user_account_transaction = (post) => { return { type: "FETCHED_USER_ACCOUNTS_TRANSACTION", data: post }; };
// Logout
export const LOG_OUT = () => { return { type: "LOG_OUT" }; };
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
//
//  ACTIONS_REFRESH
// 1. With UserID get FannyID
// 2. With FannyID get Account Lists
// 3. With FannyID, AccountID get Transaction 
let user_result, fanny_result, account_resultst;
//
// Refresh()
//
export const ACTION_REFRESH = (userID, fannyID, accountID) => {
  return function (dispatch, getState) {
    dispatch(fetch_post());
    // 3 IF - user - Fanny - Account = Show Transactions
    if (userID && fannyID && accountID) {
      console.log("Got userID, fannyID, accountID - Getting Transactions: " + JSON.stringify(userID) + "\n" + JSON.stringify(fannyID) + "\n" + JSON.stringify(accountID));
    }
    // 2 IF - User + Fanny = Show Accounts_records_and_extras 
    else if (userID && fannyID) {
      console.log("Got userID, fannyID - Getting AccountInfos " + JSON.stringify(userID) + "\n" + JSON.stringify(fannyID));
      async function Fire() {
        try {
          // Clear every time getting accounts
          dispatch(ACTION_SET_ACTIVE_ACCOUNT(null))
          dispatch(fetched_user_accounts(null))
          dispatch(fetched_user_account_types(null))
          dispatch(fetched_user_account_category(null))
          dispatch(fetched_user_account_transaction(null))
          // fetch acc_results
          account_resultst = await fetch_fanny_account_info(fannyID)
            .then(data => { return data })
            .catch(err => { return err })
        } catch (error) {
          dispatch(receive_error(error))
        } finally {
          dispatch(ACTION_SET_ACTIVE_ACCOUNT("overview-" + fannyID))
          dispatch(fetched_user_accounts(account_resultst.fannyAccounts.data))
          dispatch(fetched_user_account_types(account_resultst.fannyType.data))
          dispatch(fetched_user_account_category(account_resultst.fannyCategory.data))
          dispatch(fetched_post())
        }
      } Fire()
    }
    // 1 IF - User = Show FannyAccount
    else if (userID) {
      console.log("Got userID - Getting FannyPacks " + JSON.stringify(userID));
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
          // Get User and Fanny
          dispatch(fetched_user(user_result))
          dispatch(fetched_user_fannyPacks(fanny_result))
          // if Active_fanny is empty -> get the FirstRow
          if (!store.getState().sessionReducers.active_fannyPack) {
            dispatch(ACTION_SET_ACTIVE_FANNY(store.getState().sessionReducers.user_fannyPack.data[0].rows[0]))
          }
          dispatch(fetched_post())
        }
      } Fire()
    } else { // If the Refresh(EMPTY)
      console.log("Error Refreshing")
      dispatch(receive_error("Error while Refresh()"))
      dispatch(fetched_post())
    }
  }
}
//
// THE APP 
//
/* 

  HOW TO Control
  - CONTROL 

  When Login - Coming with userID 

The reason its seems complex beacuse you are mixing the bussines logic with the presentation 

  Make the Login in Navigation!
  Dashboard and Content are = Presentation! 

*/