// Dashboard Page
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';

import { Layout, Row, Col } from 'antd';
import { Alert, message, Tabs, Menu, Dropdown, Icon } from 'antd';
import { Typography, Button, Input, Select } from 'antd';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

// Dashboard
function Dashboard(props) {
  // Dashboard view
  let subLayout = { overflow: 'auto', backgroundColor: "#ffffff", zIndex:'1000' };
  let dummyData = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus";
  return (
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
  );
}
export default withRouter(Dashboard);