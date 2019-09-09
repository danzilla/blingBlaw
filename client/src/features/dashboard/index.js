// Dashboard Page
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Layout, message } from 'antd';
// Containers
import FannyPackContainer from '../../react/containers/dashboard/fannypack_container';
import AccountContainer from '../../react/containers/dashboard/account_container';
// Dashboard
function Dashboard(props) {
  // Dashboard - Global_State
  // Should replace with State_Management (Redux or Mobex)
  // - Redux  and Thunk
  // GET Session
  let sessionID = "FannyPack_Loading";
  if(sessionStorage.getItem('sessionID')){ sessionID = sessionStorage.getItem('sessionID'); }
  // FannyPack State
  const [fannyPackz, setFannyPackz] = useState([]);
  const [activeFannyPack, setActiveFannyPack] = useState({ fannypack_serial: sessionID, fannypack_name: "FannyPack Loading..." });
  const changeActiveFannyPack = (FannyPack) => { setActiveFannyPack(FannyPack); message.info("FannyPack changed to " + FannyPack.fannypack_name, 2.5); };
  // Refresh_FannyPack
  const Refresh_FannyPack = () => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", { userSerial: sessionID })
    .then((data) => { 
      setFannyPackz(data.data.pageMessage.result);
      setActiveFannyPack(data.data.pageMessage.result.pop());
      message.info("FannyPack fatched!", 1.5);
    })
    .catch((err) => { 
      message.error("Fetched faild :(", 2.5);
      message.error(err.message, 2.5);
      props.history.push("/");
    });
  };
  // useEffect() - with array for RUN-ONCE
  useEffect(() => { Refresh_FannyPack(); }, [sessionID]);
  // Dashboard view
  const DashboardView = <Layout className="p-2" style={{ overflow: 'hidden', height: '100vh', backgroundColor: "#ffffff" }}>
                          <FannyPackContainer 
                            activeFannyPack={activeFannyPack} 
                            fannyPackz={fannyPackz}
                            changeActiveFannyPack={changeActiveFannyPack}
                            Refresh_FannyPack={Refresh_FannyPack}/>
                          <AccountContainer 
                            activeFannyPack={activeFannyPack}
                            fannyPackz={fannyPackz} />
                        </Layout>;
  // Session check
  // useEffect() => Check if localstorage is Fat and good
  useEffect(() => {
    // let localInfo = JSON.parse(localStorage.getItem('sessionID'));
    if (!sessionID) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5);
      message.warning("Session is empty", 2.5);
      props.history.push("/");
    }
  });
  // Dashboard view
  return (DashboardView);
}
export default withRouter(Dashboard);