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
  const [activeFannyPack, setActiveFannyPack] = useState({
    fannypack_serial:"FannyPack_Loading", fannypack_name: "FannyPack Loading..."
  });
  // - Fetch - users fannypacks
  const fetch_userFannyPack = (userData) => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", {
      userSerial: userData
    })
    .then((data) => { setFannyPackz(data.data.pageMessage.result); })
    .catch((err) => { message.error(JSON.stringify(err), 3); });
  };
  // Change FannyPack - callback
  const changeActiveFannyPack = (activeFanny) => {
    setActiveFannyPack(activeFanny);
    message.info("FannyPack changed to " + activeFanny.fannypack_name, 2.5);
  };
  // useEffect() => Check if localstorage is Fat and good
  let sessInfo, sessionID;
  useEffect(() => {
    // let localInfo = JSON.parse(localStorage.getItem('sessionID'));
    sessInfo = sessionStorage.getItem('sessionID');
    if (!sessInfo) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5);
      message.warning("Session is empty", 2.5);
      props.history.push("/");
    }
  });
  // useEffect() - with array for RUN-ONCE
  // - First Startup boooost - TODO
  useEffect(() => {
    sessionID = sessionStorage.getItem('sessionID');
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", {
      userSerial: sessionID
    })
    .then((data) => { 
      setFannyPackz(data.data.pageMessage.result);
      setActiveFannyPack(data.data.pageMessage.result.pop());
    })
    .catch((err) => { 
      message.error("Fetched faild :(", 2.5);
      message.error(err.message, 2.5);
      props.history.push("/");
    });
  }, []);

  let mainLayout = { overflow: 'hidden', height: '100vh', backgroundColor: "#ffffff" };
  const DashboardView = <Layout className="p-2" style={mainLayout}>
                          <FannyPackContainer 
                            activeFannyPack={activeFannyPack}
                            changeActiveFannyPack={changeActiveFannyPack} 
                            fannyPackz={fannyPackz}
                            refreshFannyPackz={fetch_userFannyPack}/>
                          <AccountContainer 
                            activeFannyPack={activeFannyPack}
                            fannyPackz={fannyPackz} />
                        </Layout>;
  // Dashboard view
  return (DashboardView);
}
export default withRouter(Dashboard);