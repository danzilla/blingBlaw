const initialState = {
  userData: {},
  isFetching: false,
  isError: false
};

const fetchReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return Object.assign({}, state, {
        isFetching: true,
        userData: action.data,
        isError: false
      });
    case "FETCHED_USER":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false
      });
    case "RECEIVE_ERROR":
      return Object.assign({}, state, {
        userData: action.data,
        isError: true,
        isFetching: false
      });
    default:
      return state;
  }
};

export default fetchReducers;