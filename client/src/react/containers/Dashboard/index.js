'use strict';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
// Load module
import { ACTION_REFRESH, ACTION_SET_ACTIVE_SESSION } from '../../../redux/actions/sessionAction';
import DashboardNavigation from "../../components/Navigation";
import DashboardContent from "../../components/Content";
// Ant Design
import { Row, Col, Layout, message } from 'antd';
const { Content } = Layout;
// Dashboard
const Dashboard = (props) => {
  // React on Active_User
  let session;
  useEffect(() => {
    session = JSON.parse(sessionStorage.getItem('session'))
    if (session === null || !session.user_serial) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5)
      props.history.push("/")
    } else if(session.user_serial){
      // Dispatch Refresh to get FannyList
      props.dispatch(ACTION_SET_ACTIVE_SESSION(session))
      props.dispatch(ACTION_REFRESH(session.user_serial))
      message.success("Session active!: " + session.user_name, 2.5)
    }
  }, [session]);
  // #Blaze
  return (
    <Row justify="center" align="middle">
      <Col span={20} className="m-2">
        <Layout style={{ backgroundColor: '#FFF' }}>
          <Content className="card-1 p-2">
            <DashboardNavigation />
            <DashboardContent />
          </Content>
        </Layout>
      </Col>
    </Row>
  );
}
// Redux connect to store
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Dashboard);