const initial_AccountData_State = {
  fannyData: {},
  accountData: {},
  errorMsg: {},
  isFetching: false,
  isError: false
};
const sessionReducers = (state = initial_AccountData_State, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return Object.assign({}, state, {
        isError: false,
        isFetching: true
        
      });
    case "FETCHED_RESPONSE_ACCOUNT":
      return Object.assign({}, state, {
        isError: false,
        isFetching: false,
        accountData: action.data
      });
    case "FETCHED_RESPONSE_FANNY":
      return Object.assign({}, state, {
        isError: false,
        isFetching: false,
        fannyData: action.data
      });
    case "ERROR_REQUEST":
      return Object.assign({}, state, {
        isError: true,
        isFetching: false,
        errorMsg: action.data
      });
    default:
      return state;
  }
};
export default sessionReducers;