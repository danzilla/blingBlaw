'use strict';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Skeleton, Row, Col, Layout, message } from 'antd';
// Actions
import { ACTION_REFRESH, ACTION_SET_ACTIVE_USER } from '../../../redux/actions/sessionAction';
// React components
import SideNavigation from "../../components/Navigation/sideNavigation";
import Content from "../../components/Content";
// Dashboard
//  Navigation
//  Content
//  Footer
const Dashboard = (props) => {
  // Dashboard
  // - Loading
  // - Fetch_Fanny with userID
  let sessionID;
  // React on Active_User
  useEffect(() => {
    sessionID = sessionStorage.getItem('sessionID')
    if (!sessionID) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5)
      props.history.push("/")
    } else if (sessionID) {
      // Good entry - rework #yee
      // Dispatch Refresh to get FannyList
      // Set Active_User and Active_Fanny
      props.dispatch(ACTION_REFRESH(sessionID))
      props.dispatch(ACTION_SET_ACTIVE_USER(sessionID))
      message.success("Session active!: " + sessionID, 1.5)
    }
  }, [sessionID]);
  // React on Active_Fanny
  useEffect(() => {
    if (props.data.sessionReducers.active_fannyPack) {
        props.dispatch(ACTION_REFRESH(
          props.data.sessionReducers.active_fannyPack.fannypack_owner_serial,
          props.data.sessionReducers.active_fannyPack.fannypack_serial))
    }
    message.success("FannyPack refreshed!!", 1.5)
  }, [props.data.sessionReducers.active_fannyPack]);
  // #Blaze
  return (
    <Row justify="center" align="middle">
      <Col span={20} className="m-2">
        <Layout style={{ backgroundColor: '#FFF' }}>
          {/* <SideNavigation /> */}
          <Skeleton active paragraph={{ rows: 24 }}
            loading={!props.data.sessionReducers.user_fannyPack.status}>
            <Content />
          </Skeleton>
        </Layout>
      </Col>
    </Row>
  );
}
// Redux connect to store
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Dashboard);