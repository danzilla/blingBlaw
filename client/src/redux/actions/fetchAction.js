import store from "../store";

const fetch_post = () => {
  return {
    type: "FETCH_USER",
    data: "loooodin"
  };
};
const receive_post = post => {
  return {
    type: "FETCHED_USER",
    data: post
  };
};
const receive_error = () => {
  return {
    type: "RECEIVE_ERROR",
    data: "eeeeeero"
  };
};

//  Buzz is here - ACTIONS
export const thunk_action_creator = username => {
    // strip userName 
    const user = username.replace(/\s/g, "");
    // 1.0 - Start fetch_post() - Start
    store.dispatch(fetch_post());
    // 2.0 - During - return
    return function(dispatch, getState) {
      return fetch(`https://api.github.com/users/${user}`)
        .then(data => data.json())
        .then(data => { // 2.1 - when got data vs didnt get data
          if (data.message === "Not Found") {
            throw new Error("No such user found!!");
          } else dispatch(receive_post(data)); // 2.2 - when got data dispatch with receive_post(data) -> callback
        })
        .catch(err => dispatch(receive_error())); // 3 - else receive_error()
    };
};
//  Buzz is here - ACTIONS
export const thunk_action_clear = () => {
  // 1 - Start fetch_post() - Start
  store.dispatch(fetch_post());
  // 2.0 - During - return
  return function(dispatch, getState) {
    console.log("dispatch: " + JSON.stringify(dispatch));
    console.log("getState: " + JSON.stringify(getState));
    
    dispatch(receive_post("Clear"));
    dispatch(receive_error());
    console.log("Cleaned");
    console.log(JSON.stringify(getState));
    
  };
};