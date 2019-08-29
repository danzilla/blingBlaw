// Dashboard Page
import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, message } from 'antd';
// Contents
import UserPage from '../../react/containers/dashboard/user_page';
// axios fire
import axios from 'axios';
// Dashboard
function Dashboard(props) {
  // Dashboard - Global_State
  // Should replace with State_Management (Redux or Mobex)
  // - Redux  and Thunk
  // React-hookz
  // - Fetch - users fannypacks
  const fetch_userFannyPack = (userData) => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", {
      userSerial: userData
    })
    .then((data) => {
      console.log(JSON.stringify(data));
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
    let sessionInfo = sessionStorage.getItem('sessionInfo');
    // Refresh userFannyPacks list
    fetch_userFannyPack(sessionID);
  }, []);
  // Dashboard view
  return (
    <Row type="flex" justify="center" align="middle">
      {/* Display Page */}

      <Col>
        {JSON.stringify(props)}
      </Col>
      <Col xs={20} sm={20} md={15} lg={15} className="p-1"> <UserPage /> </Col>
      {/* Blank Space */}
      <Col xs={24} sm={24} md={24} lg={24} className="p-1"></Col>
    </Row>
  );
}
export default withRouter(Dashboard);