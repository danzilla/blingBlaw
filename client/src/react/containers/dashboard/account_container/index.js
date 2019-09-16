// Account  Container
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {  Layout, Row, Col, Typography, message, Tabs, Icon } from 'antd';
// Container
import AccountRecords from './account_records';
import AccountTypes from './account_types';
import AccountCategory from './account_category';
import AccountTransaction from './account_transactions';
const { Content } = Layout;
const { TabPane } = Tabs;
const { Text} = Typography;
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
    .then(axios.spread((fannyAccounts, fannyType, fannyCategory) => {
      // GET fetch_data and setState
      setFannyAccountz(fannyAccounts.data.pageMessage.result);
      setFannyAccountType(fannyType.data.pageMesage.result);
      setFannyCategory(fannyCategory.data.pageMesage.result);
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
              
              <Row>
                <Content>
                  <Col span={8}>
                    <AccountRecords 
                      Refresh_FannyPack_Account={Refresh_FannyPack_Account} 
                      activeFannyPack={props.activeFannyPack}
                      fannyAccountType={fannyAccountType}
                      fannyAccountz={fannyAccountz} />
                  </Col>
                  <Col span={8}>
                    <AccountTypes 
                      Refresh_FannyPack_Account={Refresh_FannyPack_Account} 
                      activeFannyPack={props.activeFannyPack} 
                      fannyAccountType={fannyAccountType} />
                  </Col>
                  <Col span={8}>
                    <AccountCategory 
                      Refresh_FannyPack_Account={Refresh_FannyPack_Account} 
                      activeFannyPack={props.activeFannyPack} 
                      fannyAccountCategory={fannyAccountCategory} />
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
                
                <Col span={16}>
                  <AccountTransaction
                    fannyAccountCategory={fannyAccountCategory}
                    account={account}
                    activeFannyPack={props.activeFannyPack} />
                </Col>

                <Col span={8}>
                  <Row>
                    <AccountCategory 
                      Refresh_FannyPack_Account={Refresh_FannyPack_Account} 
                      activeFannyPack={props.activeFannyPack} 
                      fannyAccountCategory={fannyAccountCategory} />
                  </Row>
                </Col>
                
              </Row>

            </TabPane>
          ))}
      </Tabs>
    </Content>
  );
}
export default withRouter(Account );