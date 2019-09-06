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
    fannyPackName: "FannyPack Loadding...", fannyPackID: "FannyPack empty..."
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
  const changeActiveFannyPack = (fannyPackID, fannyPackName) => {
    setActiveFannyPack({...activeFannyPack, fannyPackName: fannyPackName, fannyPackID: fannyPackID});
    message.info("FannyPack changed to " + fannyPackName, 2);
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
      let lastItem = data.data.pageMessage.result.pop();
      setFannyPackz(data.data.pageMessage.result);
      setActiveFannyPack({...activeFannyPack, fannyPackName: lastItem.fannypack_name, fannyPackID:  lastItem.fannypack_serial});
    })
    .catch((err) => { 
      // Bad entry
      message.error("Fetched faild :(", 1.5);
      message.error(err.message, 4.5);
      props.history.push("/");
    });
  }, []);
  // Dashboard view
  let mainLayout = { overflow: 'hidden', height: '100vh', backgroundColor: "#ffffff" };
  return (
    <Layout className="p-2" style={mainLayout}>
      <FannyPackContainer 
        activeFannyPack={activeFannyPack}
        changeActiveFannyPack={changeActiveFannyPack} 
        fannyPackz={fannyPackz}
        refreshFannyPackz={fetch_userFannyPack}/>
      <AccountContainer 
        activeFannyPack={activeFannyPack}
        fannyPackz={fannyPackz} />
    </Layout>
  );
}
export default withRouter(Dashboard);