/* 
Session _ State
  User
    Fanny
      Accounts
        Account
          account_type
          account_category
          account_transation
*/
const sessionState = {
  active_session: null,
  active_fannyPack: null,
  active_account: null,
  user: null,
  user_fannyPack: null,
  user_accounts: null,
  user_account_type: null,
  user_account_category: null,
  user_account_transaction: null,
  isFetching: false,
  isError: false
};
const sessionReducers = (state = sessionState, action) => {
  switch (action.type) {
    case "ACTIVE_Session":
      return Object.assign({}, state, { active_session: action.data, isError: false });
    case "ACTIVE_FannyPack":
      return Object.assign({}, state, { active_fannyPack: action.data, isError: false });
    case "ACTIVE_Account":
      return Object.assign({}, state, { active_account: action.data, isError: false });
    case "FETCH":
      return Object.assign({}, state, { isFetching: true, isError: true });
    case "FETCHED":
      return Object.assign({}, state, { isFetching: false, isError: false });
    case "RECEIVE_ERROR":
      return Object.assign({}, state, { error: action.data, isError: false });
    case "FETCHED_USER":
      return Object.assign({}, state, { user: action.data, isError: false });
    case "FETCHED_USER_FANNYPACKS":
      return Object.assign({}, state, { user_fannyPack: action.data, isError: false });
    case "FETCHED_USER_ACCOUNTS":
      return Object.assign({}, state, { user_accounts: action.data, isError: false });
    case "FETCHED_USER_ACCOUNTS_TYPES":
      return Object.assign({}, state, { user_account_type: action.data, isError: false });
    case "FETCHED_USER_ACCOUNTS_CATEGORY":
      return Object.assign({}, state, { user_account_category: action.data, isError: false });
    case "FETCHED_USER_ACCOUNTS_TRANSACTION":
      return Object.assign({}, state, { user_account_transaction: action.data, isError: false });
    case "LOG_OUT":
      return Object.assign({}, state, {
        active_session: null,
        active_fannyPack: null,
        active_account: null,
        user: null,
        user_fannyPack: null,
        user_accounts: null,
        user_account_type: null,
        user_account_category: null,
        user_account_transaction: null,
        isFetching: false,
        isError: false
      });
    default:
      return state;
  };
};
export default sessionReducers;