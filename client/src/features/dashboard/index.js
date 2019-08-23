// Dashboard Page
import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, message, Menu, Icon } from 'antd';
// Componts
import AppNav from '../../components/Navigation/app_nav';
import AppSessionNav from '../../components/Navigation/app_session_nav';
// Contents 
import UserPage from '../../containers/dashboard/user_page';
import FannyPackPage from '../../containers/dashboard/fannyPack_page';
import AccountPage from '../../containers/dashboard/account_page';
import { emojify } from 'react-emojione/lib/react-emojione';
// Dashboard
function Dashboard(props) {
  // Dashboard - Global_State
  // Should replace with State_Management (Redux or Mobex)
  // - Redux  and Thunk
  // React-hookz
  const [userSessionInfo, setUserSessionInfo] = useState([]);
  const [userSessionHistory, setUserSessionHistory] = useState([]);
  // Dashboard - Display contents
  //
  // React-hookz - dashboardDisplay
  const [dashboardDisplay, setDashboardDisplay] = useState({
    isBlankPage: true, isUserPage: true, isFannyPackPage: false, isAccountPage: false
  });
  // Display triggers - activeBlankContent
  const activeBlankContent = () => {
    setDashboardDisplay({
      ...dashboardDisplay, isBlankPage: true, isUserPage: false, isFannyPackPage: false, isAccountPage:false 
    });
  };
  // Display triggers - activeUserContent
  const activeUserContent = () => {
    setDashboardDisplay({
      ...dashboardDisplay, isBlankPage: false, isUserPage: true, isFannyPackPage: false, isAccountPage:false 
    });
  };
  // Display triggers - activeAccountContent
  const activeAccountContent = () => {
    setDashboardDisplay({
      ...dashboardDisplay, isBlankPage: false, isUserPage: false, isFannyPackPage: false, isAccountPage:true 
    });
  };
  // Display triggers - activeFannyPackContent
  const activeFannyPackContent = () => {
    setDashboardDisplay({
      ...dashboardDisplay, isBlankPage: false, isUserPage: false, isFannyPackPage: true, isAccountPage:false 
    });
  };
  // Active_Triggers 
  const activeTrigger = {
    activeBlankContent:activeBlankContent,
    userContent: activeUserContent,
    accountContent: activeAccountContent,
    fannyPackContent: activeFannyPackContent
  };
  // Shuffle through which page to display
  let displayPage;
  if (dashboardDisplay.isBlankPage === true) {
    displayPage = <UserPage 
                    activeTrigger={activeTrigger} 
                    userSessionInfo={userSessionInfo} />
  } else if (dashboardDisplay.isUserPage === true) {
    displayPage = <UserPage 
                    activeTrigger={activeTrigger} 
                    userSessionInfo={userSessionInfo} />
  } else if (dashboardDisplay.isFannyPackPage === true) {
    displayPage = <FannyPackPage 
                    activeTrigger={activeTrigger} 
                    userSessionInfo={userSessionInfo} />
  } else if (dashboardDisplay.isAccountPage === true) {
    displayPage = <AccountPage 
                    activeTrigger={activeTrigger} 
                    userSessionInfo={userSessionInfo} />
  }
  // Return Display
  // Effect() => Check if localstorage is Fat and good
  useEffect(() => {
    // let localInfo = JSON.parse(localStorage.getItem('blingblaw'));
    let sessInfo = JSON.parse(sessionStorage.getItem('blingblaw'));
    console.log(JSON.stringify(sessInfo));
    if (!sessInfo) {
      // Bad entry
      message.error("Unauthorized visit! Required valid authentication", 2.5);
      message.warning("Session is empty", 2.5);
      props.history.push("/");
    }
  });
   // emojifyOptions
  const emojifyOptions = {
    style: {
        height: 80,
    }
  };
  // Dashboard view
  return (
    <Row type="flex" justify="center" align="middle">
      {/* Navigation Bar */}
      <Col xs={20} sm={20} md={15} lg={15} className="p-1">
        <AppNav />
      </Col>
      {/* Session Progress */}
      <Col xs={20} sm={20} md={15} lg={15} className="card-2 p-2 my-1">
        <AppSessionNav />
      </Col>
      {/* Display Page */}
      <Col xs={20} sm={20} md={15} lg={15} className="card-2 p-1">
        {displayPage}
      </Col>
      {/* Blank Space */}
      <Col xs={24} sm={24} md={24} lg={24} className="p-1"></Col>
    </Row>
  );
}
export default withRouter(Dashboard);