import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Row, Col, Menu, Icon, Button, Tooltip, Dropdown, message } from 'antd';
// axios-post 
import axios from 'axios';
// AppNavigation
function AppNavigation(props){
  // React-hookz - navCurrentPosition
  const [navCurrentPosition, setNavCurrentPosition] = useState("");
  // handleClick
  const handleClick = (e) => {
  // setNavCurrentPosition(e.key);
    message.info('Click on left button.');
  };
  // AppNavigation
  const { SubMenu } = Menu;
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1">
        <Icon type="user" />
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" />
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="user" />
        3rd item
      </Menu.Item>
    </Menu>
  );
  // emojifyOptions
  const emojifyOptions = {
    style: {
        height: 70,
    }
  };
  return (
    <Row type="flex" justify="center" align="middle">
      {/* App Settings Menu */ }
      <Col xs={24} sm={24} md={24} lg={24}>
        <Row type="flex" justify="end" align="middle">
          <Dropdown overlay={menu}>
            <a> 
              {emojify(':rocket:', emojifyOptions)} 
              <Icon type="caret-down" />
            </a>
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
}
export default withRouter(AppNavigation);