'use strict';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Row, Col, Layout, message, Button } from 'antd';
// React components
import SideNavigation from "../../components/navigation/sideNavigation";
import DashboardContent from "../../components/dashboardContent";
// Dashboard
function Dashboard(props) {

  // Requiirement 
  // - User Info from Session
  // - FannyPack View and Pass it to Child
  // - Dashboard fetch and view all FannyPack 

  // Account State
  const [user, setUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [fannyPackz, setFannyPackz] = useState([]);
  const [fannyAccountz, setFannyAccountz] = useState("");
  // axios_fetch_user_post
  async function getUserInfo(user) {
    return await axios.post("http://localhost:5000/user/view", { userSerial: user })
      .then((data) => { return data.data })
      .catch((err) => { return err; })
  }
  // axios_fetch_user_FannyPackz
  async function getUserFannyPackz(user) {
    return await axios.post("http://localhost:5000/fannypack/view", { userSerial: user })
      .then((data) => { return data.data; })
      .catch((err) => { return err; })
  }
  // axios_fetch_user_FannyAccountz
  async function getUserFannyAccountz(fannyID) {
    return await axios.all([
      axios.post("http://localhost:5000/account/view", { fannyPack: fannyID }),
      axios.post("http://localhost:5000/account/type/view", { fannyPack: fannyID }),
      axios.post("http://localhost:5000/account/category/view", { fannyPack: fannyID })
    ])
      .then(axios.spread((fannyAccounts, fannyType, fannyCategory) => { return { fannyAccounts, fannyType, fannyCategory }; }))
      .catch((err) => { console.log(JSON.stringify(err.message)); });
  }
  // Refresh_FannyPack
  const Refresh = () => {
    const sessionID = sessionStorage.getItem('sessionID');
    setUser(sessionID);
    // User_info
    getUserInfo(sessionID)
      .then((data) => {
        if (data.pageMesage.result.user_serial) {
          setUserInfo(data.pageMesage);
          // UserFannyPackz with user_serial
          getUserFannyPackz(data.pageMesage.result.user_serial)
            .then((data) => {
              setFannyPackz(data.pageMessage);
              if (data.pageMessage.result[0].fannypack_serial) {
                // UserFannyPackzAccount with user_serial
                getUserFannyAccountz(data.pageMessage.result[0].fannypack_serial)
                  .then((data) => { setFannyAccountz(data) })
                  .catch((err) => { setFannyAccountz(err) });
              } else { setFannyPackz("Error Getting FannyAccount with FannyPackz: " + JSON.stringify(data)); }
            })
            .catch((err) => { setFannyPackz(err); });
        } else { setUserInfo("Error Getting user_serial for FannyPackz: " + JSON.stringify(data)); }
      })
      .catch((err) => { setUserInfo(err); console.log("\n Error Getting UserInfo: " + JSON.stringify(err)); });
  };
  // useEffect()
  useEffect(() => {
    Refresh();
    if (!user) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5);
      message.warning("Session is empty", 2.5);
      // props.history.push("/");
    } else { message.warning("Session: " + user, 2.5); }
  }, [user]);
  // 
  return (
    <Row justify="center" align="middle">
      <Col span={20} className="m-2">

        <Layout style={{ backgroundColor: '#FFF' }}>
          <SideNavigation />
          
          <Button onClick={() => Refresh()}>Refresh</Button>
          <DashboardContent
            user={user}
            userInfo={userInfo}
            fannyPackz={fannyPackz}
            fannyAccountz={fannyAccountz} />
            
        </Layout>

      </Col>
    </Row>
  );
}
// Redux connect to store
const mapStateToProps = state => { return { data: state }; };
// Export
export default connect(mapStateToProps)(Dashboard);
