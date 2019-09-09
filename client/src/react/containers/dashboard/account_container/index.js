// Account  Container
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';

import { Layout, Row, Col } from 'antd';
import { Alert, message, Tabs, Menu, Dropdown, Icon, Form } from 'antd';
import { Typography, Button, Input, Select } from 'antd';
import { List, Avatar, Skeleton, Card } from 'antd';

import AccountRecords from './account_records';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;
// Account Container
function Account (props) {
  // Account State
  const [fannyAccountz, setFannyAccountz] = useState([]);
  const [fannyAccountCategory, setFannyCategory] = useState([]);
  const [fannyAccountType, setFannyAccountType] = useState([]);
  // Refresh_FannyPack_Account
  const Refresh_FannyPack_Account = () => {
    // Fetch all
    axios.all([
      axios.post("http://localhost:5000/account/view", { fannyPack: props.activeFannyPack.fannypack_serial }),
      axios.post("http://localhost:5000/account/type/view", { fannyPack: props.activeFannyPack.fannypack_serial }),
      axios.post("http://localhost:5000/account/category/view", { fannyPack: props.activeFannyPack.fannypack_serial })
    ])
    .then(axios.spread((fannyAccounts, fannyCategory, fannyType) => {
      // GET fetch_data and setState
      setFannyAccountz(fannyAccounts.data.pageMessage.result);
      setFannyCategory(fannyCategory.data);
      setFannyAccountType(fannyType.data);
      message.info("Accounts fatched!", 1.5);
    }))
    .catch((err) => { message.info(JSON.stringify(err), 2.5); });
  }
  // useEffect() - with array for RUN-ONCE
  // User Effect and pass => props with []
  useEffect(() => {
    // Refresh FannyPack
    Refresh_FannyPack_Account();
  }, [props.activeFannyPack.fannypack_serial]);
  // Account  view
  return (
    <Content className="p-2 card-3" style={{ overflow: 'auto', backgroundColor: "#ffffff", zIndex:'1000' }}>
      <Tabs size="large" defaultActiveKey="1">
        {/* Overview Tab */}
        <TabPane tab={
          <span> 
            <Icon type="android" /> 
            FannyPack 
            <Text underline strong> {props.activeFannyPack.fannypack_name} </Text>
            overview 
          </span>} key="1">
          <Row className="overflowY" style={{ height: '69vh' }} type="flex" justify="center" align="middle">
            <Col span={24} className="p-1">
              
              <Row gutter={16} type="flex" justify="center" align="middle">
                <Content>
                  <Col span={8}>
                    <AccountRecords Refresh_FannyPack_Account={Refresh_FannyPack_Account} activeFannyPack={props.activeFannyPack} fannyAccountz={fannyAccountz} />
                  </Col>
                  <Col span={8}>
                    <AccountRecords activeFannyPack={props.activeFannyPack} fannyAccountz={fannyAccountz} />
                  </Col>
                  <Col span={8}>
                    <AccountRecords activeFannyPack={props.activeFannyPack} fannyAccountz={fannyAccountz} />
                  </Col>
                </Content>
              </Row>

            </Col>
          </Row>
        </TabPane>
        {/* View All Account Tabs */}
        {(Array.isArray(fannyAccountz)) && 
          (fannyAccountz.map(account => 
            <TabPane tab={<span> <Icon type="android" /> {account.account_name} </span>} key={account.account_serial}>
              <Row className="overflowY" style={{ height: '69vh' }} type="flex" justify="center" align="middle">
                {JSON.stringify(account)}
              </Row>
            </TabPane>
          ))}
      </Tabs>
    </Content>
  );
}
export default withRouter(Account );