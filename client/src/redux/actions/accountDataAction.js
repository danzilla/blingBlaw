import store from "../store";
import { 
  fetch_fanny_account_info, 
  fetch_fannyPack_view_all,
  fetch_fannyPack_info
} from "../../api";

const fetch_post = () => {
  return {
    type: "FETCH_REQUEST",
    data: "Loading..."
  };
};
const receive_post_fanny = (post) => {
  return {
    type: "FETCHED_RESPONSE_FANNY",
    data: post
  };
};
const receive_post_account = (post) => {
  return {
    type: "FETCHED_RESPONSE_ACCOUNT",
    data: post
  };
};
const receive_error = (post) => {
  return {
    type: "ERROR_REQUEST",
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

// FETCH_FANNY_DATA
export const FETCH_FANNY_DATA = (sessionID) => {
  // strip userName 
  if(!sessionID) { return receive_error("Incorrect request - Session required"); }
  sessionID = sessionID.replace(/\s/g, "");
  // 1.0 - Start fetch_post() - Start
  store.dispatch(fetch_post());
  // 2.0 - During - return
  return function(dispatch, getState) {
    fetch_fannyPack_view_all(sessionID)
      .then(data => { dispatch(receive_post_fanny(data)); })
      .catch(err => { dispatch(receive_error(err)); });
  };
};
// FETCH_ACCOUNT_DATA
export const FETCH_ACCOUNT_DATA = (sessionID, fannyID) => {
  // strip userName 
  if(!sessionID || !fannyID) { return receive_error("Incorrect request - Fanny and Sess are required"); }
  sessionID = sessionID.replace(/\s/g, "");
  // 1.0 - Start fetch_post() - Start
  store.dispatch(fetch_post());
  // 2.0 - During - return
  return function(dispatch, getState) {
    fetch_fanny_account_info(sessionID, fannyID)
      .then(data => { dispatch(receive_post_account(data)); })
      .catch(err => { dispatch(receive_error(err)); })
  };
};