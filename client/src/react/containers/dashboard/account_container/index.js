// Account  Container
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';

import { Layout, Row, Col } from 'antd';
import { Alert, message, Tabs, Menu, Dropdown, Icon, Form } from 'antd';
import { Typography, Button, Input, Select } from 'antd';
import { List, Avatar, Skeleton } from 'antd';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Text } = Typography;
// Account Container
function Account (props) {
  // FannyPack State
  const [fannyPackz, setFannyPackz] = useState([]);
  const [fannyAccountz, setFannyAccountz] = useState([]);
  const [fannyAccountCategory, setFannyCategory] = useState([]);
  const [fannyAccountType, setFannyAccountType] = useState([]);
  // useEffect() - with array for RUN-ONCE
  // - First Startup boooost - TODO
  // User Effect and pass => props with []
  useEffect(() => {
    // Fetch all
    axios.all([
      axios.post("http://localhost:5000/account/view", { fannyPack: props.activeFannyPack.fannypack_serial }),
      axios.post("http://localhost:5000/account/type/view", { fannyPack: props.activeFannyPack.fannypack_serial }),
      axios.post("http://localhost:5000/account/category/view", { fannyPack: props.activeFannyPack.fannypack_serial })
    ])
    .then(axios.spread((fannyAccounts, fannyCategory, fannyType) => {
      // GET fetch_data and setState
      setFannyAccountz(fannyAccounts.data.pageMessage.result);
      setFannyCategory(fannyCategory.data.pageMessage.result);
      setFannyAccountType(fannyType.data.pageMessage.result);
    }))
    .catch((err) => { console.log("\nerr" + JSON.stringify(err)); });
  }, [props.activeFannyPack.fannypack_serial]);



  const FannyAccountz = <List
                          className=""
                          loading={false}
                          itemLayout="horizontal"
                          dataSource={fannyAccountz}
                          renderItem={item => (
                            <List.Item actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                              <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{JSON.stringify(item)}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                  />
                              </Skeleton>
                            </List.Item>
                        )}/>



  // emojify - Font size
  const emojifyOptions = { style: { height: '20px', paddingRight: "2px" } };
  // Account  view
  let subLayout = { overflow: 'auto', backgroundColor: "#ffffff", zIndex:'1000' };
  let dummyData = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus";
  return (
    <Content className="p-2 card-3" style={subLayout}>
        <Tabs size="large" defaultActiveKey="1">
          <TabPane tab={
            <span> 
              <Icon type="android" /> 
              FannyPack 
              <Text underline strong> {props.activeFannyPack.fannypack_name} </Text>
              overview 
            </span>} key="1">
            <Row className="overflowY" style={{ height: '69vh' }} type="flex" justify="center" align="middle">
              <Col span={24}>

                <Row className="p-1" type="flex" justify="center" align="middle">
                  
                  <Col span={12} className="p-1 overflowY">
                    {FannyAccountz}
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
  );
}
export default withRouter(Account );