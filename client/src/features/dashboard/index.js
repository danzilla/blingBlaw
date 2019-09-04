// Dashboard Page
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';

import { Row, Col, message, Tabs } from 'antd';
import { Layout } from 'antd';

import { Typography, Button, Input, Select, InputNumber, DatePicker, AutoComplete, Cascader, Form } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';

import { Alert } from 'antd';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

// Dashboard
function Dashboard(props) {
  // Dashboard - Global_State
  // Should replace with State_Management (Redux or Mobex)
  // - Redux  and Thunk
  // React-hookz
  const [fannyPackz, setFannyPackz] = useState([]);
  // - Fetch - users fannypacks
  const fetch_userFannyPack = (userData) => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/view", {
      userSerial: userData
    })
    .then((data) => {
      console.log(JSON.stringify(data))
      setFannyPackz(data.data.pageMessage.result);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
  };
  // useEffect() => Check if localstorage is Fat and good
  useEffect(() => {
    // let localInfo = JSON.parse(localStorage.getItem('sessionID'));
    let sessInfo = sessionStorage.getItem('sessionID');
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
    // let sessionInfo = sessionStorage.getItem('sessionInfo');
    // Refresh userFannyPacks list
    fetch_userFannyPack(sessionID);
  }, []);
  // Dashboard view
  let mainLayout = { overflow: 'hidden', height: '100vh', backgroundColor: "#ffffff" };
  let subLayout = { overflow: 'auto', backgroundColor: "#ffffff", zIndex:'1000' };
  let navHeader =  {overflow: 'hidden', backgroundColor: "#ffffff", zIndex:'1'};
  // emojify - Font size
  const emojifyOptions = {
    style: {
       height: '65'
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  let dummyData = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus";
  return (
    <Layout className="p-2" style={mainLayout}>
      <Header className="card-2 my-1" style={navHeader}>
        <Row type="flex" justify="center" align="middle" style={navHeader}>
          <Col span="12">
            <InputGroup compact>
              <Title level={2} style={{ display: 'inline'}}>{emojify(':purse:')} FannyPack </Title>
              <Select style={{ width: '30%' }} defaultValue="1" size="large">
                <Option value="1">LolFanny</Option>
                <Option value="2">Nadddda</Option>
              </Select>
              <ButtonGroup>
                <Button type="primary" size="large" icon="sync" />
                <Button type="primary" size="large" icon="plus" />
              </ButtonGroup>
            </InputGroup>
          </Col>
          <Col push={10} span={12}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                {emojify(':rocket:', emojifyOptions)} <Icon type="caret-down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content className="p-2 card-3" style={subLayout}>
        <Tabs size="large" defaultActiveKey="1">
          <TabPane tab={<span> <Icon type="android" /> Account Overview </span>} key="1">
            
            <Row className="overflowY" style={{ height: '69vh' }} type="flex" justify="center" align="middle">
              <Col span={24}>
                
                <Row className="p-1" type="flex" justify="center" align="middle">
                  <Col span={12} className="p-1">
                    <Alert
                      message="Account Records Detatils"
                      description={dummyData}
                      type="error"
                      showIcon />
                  </Col>
                  <Col span={12} className="p-1">
                    <Alert
                      message="Account Records Type"
                      description={dummyData}
                      type="success"
                      showIcon />
                    <Alert
                      message="Account Records Category"
                      description={dummyData}
                      type="info"
                      showIcon />
                  </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <Col span={24}>
                    <Alert
                      message="Attention"
                      description={dummyData}
                      type="warning"
                      showIcon />
                  </Col>
                </Row>

              </Col>
            </Row>
              
          </TabPane>

          <TabPane tab={<span> <Icon type="android" /> Account_One </span>} key="3">
            <Row className="overflowY" style={{ height: '69vh' }} type="flex" justify="center" align="middle">
              1
              {dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}
              {dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}
              {dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}
              {dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}
              {dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}{dummyData}
              2
            </Row>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
export default withRouter(Dashboard);





/*


<Row>
      <Col span={8}
          style={{
          overflow: 'auto',
          height: '100vh'}}>
          <FannyContainer fannyPackz={fannyPackz} />
      </Col>
      <Col span={16}
          style={{
          overflow: 'auto',
          height: '100vh'}}>
          <div className="p-2">
            <AccountContainer />
          </div>
      </Col>
  </Row>


*/