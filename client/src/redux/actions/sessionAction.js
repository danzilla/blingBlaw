import store from "../store";
import { fetch_login } from "../../api";

const fetch_post = () => {
  return {
    type: "FETCH_USER1",
    data: "loooodin-1"
  };
};
const receive_post = (post) => {
  return {
    type: "FETCHED_USER1",
    data: post
  };
};
const receive_error = (post) => {
  return {
    type: "RECEIVE_ERROR1",
    data: post
  };
};

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

//  Buzz is here - ACTIONS
export const thunk_action_creator = username => {
    // strip userName 
    const user = username.replace(/\s/g, "");
    // 1.0 - Start fetch_post() - Start
    store.dispatch(fetch_post());
    // 2.0 - During - return
    return function(dispatch, getState) {
      fetch_login()
      .then(data => { dispatch(receive_post(data)); })
      .catch(err => { dispatch(receive_error(err)); })
    };
};