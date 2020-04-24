const sessionState = {
  sessionInfo: {},
  fannyInfo: {},
  accountInfo: {},
  categoryInfo: {},
  typeInfo: {}
}
const initialState = {
  userData2: {},
  isFetching2: false,
  isError2: false
};
const sessionReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER1":
      return Object.assign({}, state, {
        userData2: action.data,
        isFetching2: true,
        isError2: false
      });
    case "FETCHED_USER1":
      return Object.assign({}, state, {
        userData2: action.data,
        RANDOM: "RANDOM",
        isFetching2: false,
        isError2: false
      });
    case "RECEIVE_ERROR1":
      return Object.assign({}, state, {
        userData2: action.data,
        isError2: true,
        isFetching2: false
      });
    default:
      return state;
  }
};
export default sessionReducers;