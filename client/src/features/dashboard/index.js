// Dashboard Page
import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, message, Menu, Icon } from 'antd';
// Componts
import AppNavigation from '../../components/Navigation/app_navigation';
import UserSettingNavigation from '../../components/Navigation/user_setting_navigation';
// Contents 
import UserPage from '../../containers/dashboard/user_page';
import FannyPackPage from '../../containers/dashboard/fannyPack_page';
import AccountPage from '../../containers/dashboard/account_page';
import { emojify } from 'react-emojione/lib/react-emojione';

import axios from 'axios';

// Dashboard
function Dashboard(props) {
  // Dashboard - Global_State
  // Should replace with State_Management (Redux or Mobex)
  // - Redux  and Thunk
  // React-hookz
  const [userSessionInfo, setUserSessionInfo] = useState([]);
  const [userSessionHistory, setUserSessionHistory] = useState([]);


  const [userFannyPacks, setUserFannyPacks] = useState([{
    activeFannyPack: "", userFannyPacks: []
  }])
  const [userAccounts, setUserAccounts] = useState([{
    activeAccount: "", userAccounts: []
  }])
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

  // Fetch only FannyPack

  // Fetch other seperatley or onRefresh

  // - Fetch - users fannypacks
  const fetch_userFannyPack = (userData) => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", {
      userSerial: userData
    })
    .then((data) => {
      console.log(JSON.stringify(data.data.pageMessage.result));
      setUserFannyPacks({
        ...userFannyPacks, activeFannyPack: data.data.pageMessage.result[0].fannypack_serial, userFannyPacks:data.data.pageMessage.result 
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
  }
  // - Fetch - users Accounts
  const fetch_userAccounts = (userData) => {
    // axios_fetch_post
    axios.post("http://localhost:5000/account/view", {
      fannyPack: userData
    })
    .then((data) => {
      console.log(JSON.stringify(data));
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
  }

  // useEffect() => Check if localstorage is Fat and good
  useEffect(() => {
    // let localInfo = JSON.parse(localStorage.getItem('sessionID'));
    let sessInfo = sessionStorage.getItem('sessionID');
    console.log("sessInfo: " + sessInfo);
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
    console.log("Session: " + sessionInfo);
    // setState 
    setUserSessionInfo(sessionInfo)
    // Refresh userFannyPacks list
    fetch_userFannyPack(sessionID);
    fetch_userAccounts("8uLxrCZWqbS48MoQYdg9AF");
  }, []);
  // Dashboard view
  return (
    <Row type="flex" justify="center" align="middle">
      {/* Navigation Bar */}
      <Col xs={20} sm={20} md={15} lg={15} className="p-2">
        <Row type="flex" justify="center" align="middle">
          {/* Breadcrumb */ }
          <Col xs={16} sm={16} md={16} lg={16}>
            <Row type="flex" justify="start" align="middle">
              <AppNavigation userFannyPacks={userFannyPacks} />
            </Row>
          </Col>
          {/* App Settings Menu */ }
          <Col xs={8} sm={8} md={8} lg  ={8}>
            <Row type="flex" justify="end" align="middle">
              <UserSettingNavigation />
            </Row>
          </Col>
        </Row>
      </Col>
      {/* Display Page */}
      <Col xs={20} sm={20} md={15} lg={15} className="card-2 p-1">
        {displayPage}
      </Col>
      {/* Blank Space */}
      <Col xs={24} sm={24} md={24} lg={24} className="p-1">
      </Col>
    </Row>
  );
}
export default withRouter(Dashboard);