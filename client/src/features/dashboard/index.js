// Dashboard Page
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import { Layout, message } from 'antd';

import FannyPackContainer from '../../react/containers/dashboard/fannypack_container';
import AccountContainer from '../../react/containers/dashboard/account_container';

// Dashboard
function Dashboard(props) {
  // Dashboard - Global_State
  
  // Should replace with State_Management (Redux or Mobex)
  // - Redux  and Thunk

  // React-hookz
  const [fannyPackz, setFannyPackz] = useState([]);

  // Change FannyPack - callback
  const changeActiveFannyPack = (fannyPackSerial, fannyPackName) => {
    let xx = "changeActiveFannyPack " + fannyPackSerial + fannyPackName;
    message.warning(xx, 2.5);
  }

  // - Fetch - users fannypacks
  const fetch_userFannyPack = (userData) => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", {
      userSerial: userData
    })
    .then((data) => {
      console.log(JSON.stringify(data))
      setFannyPackz(data.data.pageMessage.result);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
  };


  // useEffect() => Check if localstorage is Fat and good
  useEffect(() => {
    // let localInfo = JSON.parse(localStorage.getItem('sessionID'));
    let sessInfo = sessionStorage.getItem('sessionID');
    if (!sessInfo) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5);
      message.warning("Session is empty", 2.5);
      props.history.push("/");
    }
  });
  // useEffect() - with array for RUN-ONCE
  useEffect(() => {
    let sessionID = sessionStorage.getItem('sessionID');
    // let sessionInfo = sessionStorage.getItem('sessionInfo');
    // Refresh userFannyPacks list
    fetch_userFannyPack(sessionID);
  }, []);
  // Dashboard view
  let mainLayout = { overflow: 'hidden', height: '100vh', backgroundColor: "#ffffff" };
  return (
    <Layout className="p-2" style={mainLayout}>
      <FannyPackContainer changeActiveFannyPack={changeActiveFannyPack} fannyPackz={fannyPackz} />
      <AccountContainer fannyPackz={fannyPackz} />
    </Layout>
  );
}
export default withRouter(Dashboard);