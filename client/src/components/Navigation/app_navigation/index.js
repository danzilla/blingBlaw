import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Input, Row, Col, Menu, Icon, Button, Tooltip, Dropdown, message, Select, Breadcrumb } from 'antd';
// axios-post 
import axios from 'axios';
// App user session Nav
function AppNavigation(props){
  // React-hookz - navCurrentPosition
  const [navCurrentPosition, setNavCurrentPosition] = useState("");
  // handleClick
  const handleClick = (e) => {
  // setNavCurrentPosition(e.key);
  };
  // - User - Contains FannyPacks
  // - FannyPacks - Contains Account, Account Types and category
  // - Account - Contains Account Statement information
  const style1 = {
    backgroundColor: 'rgba(233, 30, 99,0.8)'
  }
  const style2 = {
    height: '150px',
    fontSize: '50em'
  }
  const { Option } = Select;
  const InputGroup = Input.Group;
  const menuFannyPack = (
    <Menu>
      <Menu.Item> <a> FannyPackz 1</a></Menu.Item>
      <Menu.Item> <a> FannyPackz 2</a></Menu.Item>
      <Menu.Item> <a> FannyPackz 3</a></Menu.Item>
      <Menu.Item> <a> FannyPackz 4</a></Menu.Item>
    </Menu>
  );
  const menuAccount = (
    <Menu>
      <Menu.Item> <a> Accounts overview</a></Menu.Item>
      <Menu.Item> <a> Categories and labes</a></Menu.Item>
    </Menu>
  );
  return (
    <Breadcrumb separator={<Icon type="right" />}>
      <Breadcrumb.Item>BlingBlaw</Breadcrumb.Item>
      <Breadcrumb.Item overlay={menuFannyPack}><Icon type="home" /> View all fannyPackz</Breadcrumb.Item>
      <Breadcrumb.Item overlay={menuAccount}><Icon type="home" /> Account</Breadcrumb.Item>
      <Breadcrumb.Item href=""><Icon type="user" /> Overview</Breadcrumb.Item>
    </Breadcrumb>
  );
}
export default withRouter(AppNavigation);