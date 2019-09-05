// FannyPack Page
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';

import { Layout, Row, Col } from 'antd';
import { Alert, message, Tabs, Menu, Dropdown, Icon, Tooltip } from 'antd';
import { Typography, Button, Input, Select, Modal } from 'antd';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { confirm } = Modal;
// FannyPack
function FannyPack(props) {
  // NavHeader CSS 
  let navHeader =  {overflow: 'hidden', backgroundColor: "#ffffff", zIndex:'1'};
  // emojify - Font size
  const emojifyOptions = {
    style: {
       height: '65'
    }
  };

  function showPropsConfirm() {
    confirm({
      title: 'Are you sure delete this task?',
      content: <Button>adsasdasd</Button>,
      okText: 'Yes',
      okType: 'danger',
      okButtonProps: {
        disabled: false,
      },
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // BlingBlaw - Fannypackz
  const FannypackzList = (
    <Menu>
      <Menu.Item key="1"> Add New Fannypack </Menu.Item>
      <Menu.Divider />
      {props.fannyPackz.map((value, key) => (

        <Menu.Item key={key} onClick={() => props.changeActiveFannyPack(value.fannypack_serial, value.fannypack_name)}> 
          <Tooltip title={JSON.stringify(value)}> 
            <a>{value.fannypack_name} - {value.fannypack_serial}</a>
          </Tooltip>
        </Menu.Item>

      ))}
    </Menu>
  );
  // NavBar - Menu
  const NavBarMenu = (
    <Menu>
      <Menu.Item> <a href="#"> 1 item </a> </Menu.Item>
      <Menu.Item> <a href="#"> 2 item </a> </Menu.Item>
      <Menu.Item> <a href="#"> 3 item </a> </Menu.Item>
    </Menu>
  );
  // FannyPack - Header
  return (
    <Header className="card-2 my-1" style={navHeader}>
      <Row type="flex" justify="center" align="middle" style={navHeader}>
        <Col span="12">
          <InputGroup compact>
            <Title level={2} style={{ display: 'inline'}}>{emojify(':purse:')} FannyPack </Title>
            <Dropdown overlay={FannypackzList}>
              <Button size="large" type="primary" ghost>
                Fannypack 1 item <Icon type="caret-down" />
              </Button>
            </Dropdown>
            <ButtonGroup>
              <Button type="primary" size="large" icon="sync" onClick={showPropsConfirm}  />
            </ButtonGroup>
          </InputGroup>
        </Col>
        <Col push={10} span={12}>
          <Dropdown overlay={NavBarMenu}>
            <a className="ant-dropdown-link" href="#">
              {emojify(':rocket:', emojifyOptions)} <Icon type="caret-down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
export default withRouter(FannyPack);