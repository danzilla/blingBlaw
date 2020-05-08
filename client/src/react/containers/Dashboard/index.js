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
function Dashboard(props) {
  // Dashboard
  // - Loading
  // - Fetch_Fanny with userID
  let sessionID;
  useEffect(() => {
    sessionID = sessionStorage.getItem('sessionID')
    if (!sessionID) { // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5)
      props.history.push("/")
    } else { // Dispatch Refresh to get FannyList
      props.dispatch(ACTION_REFRESH(sessionID))
      props.dispatch(ACTION_SET_ACTIVE_USER(sessionID))
      message.success("Session active!: " + sessionID, 1.5)
    } // Good entry - rework #yee
  }, [sessionID]);
  return (
    <Row justify="center" align="middle">
      <Col span={20} className="m-2">
        <Layout style={{ backgroundColor: '#FFF' }}>
          {/* <SideNavigation /> */}
          <Skeleton 
            active loading={!props.data.sessionReducers.user_fannyPack.status}
            paragraph={{ rows: 10 }}>
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