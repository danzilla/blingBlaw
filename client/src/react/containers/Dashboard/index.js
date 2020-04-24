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
  // useEffect()
  let sessionID;
  useEffect(() => {
    sessionID = sessionStorage.getItem('sessionID');
    if (!sessionID) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5);
      message.warning("Session is empty", 2.5);
      // props.history.push("/");
    } else { message.warning("Session: " + sessionID, 2.5); }
  }, [sessionID]);
  
  // 
  return (
    <Row justify="center" align="middle">
      <Col span={20} className="m-2">

        <Layout style={{ backgroundColor: '#FFF' }}>
          <SideNavigation />
          <DashboardContent />
        </Layout>

      </Col>
    </Row>
  );
}
// Redux connect to store
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Dashboard);
