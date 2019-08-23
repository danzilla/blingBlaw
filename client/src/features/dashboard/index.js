// Dashboard Page
import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, message, Menu, Icon, Breadcrumb } from 'antd';
// Componts

// Contents 
import UserPage from '../../containers/dashboard/user_page';
import FannyPackPage from '../../containers/dashboard/fannyPack_page';
import AccountPage from '../../containers/dashboard/account_page';
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
  // Menu
  const { SubMenu } = Menu;
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          General
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Layout
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Navigation
        </a>
      </Menu.Item>
    </Menu>
  );
  // Dashboard view
  return (
    <Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">

      <Col xs={20} sm={15} md={15} lg={15} className="card-1 p-2">
        <Breadcrumb>
          <Breadcrumb.Item>blingblaw</Breadcrumb.Item>
          <Breadcrumb.Item overlay={menu}>FannyPack</Breadcrumb.Item>
          <Breadcrumb.Item overlay={menu}>Account</Breadcrumb.Item>
          <Breadcrumb.Item>Category</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col xs={20} sm={15} md={15} lg={15} className="card-2 p-2">

        {displayPage}

        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
      </Col>
    </Row>
  );
}
export default withRouter(Dashboard);