import React, { useState } from 'react';
import { connect } from "react-redux";

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';
import DashboardNavigation from '../Navigation/contentNavigation';

import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Tabs, Space } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;

const DashboardContent = (props) => {
  // State
  const [activeFanny, setFanny] = useState(null)
  const [activeAccount, setAccount] = useState(null)
  const [activeAccountAdds, setAccountAdds] = useState(null)

  const [defaultTabPosition, setDefaultTabPosition] = useState("left")

  return (
    <Row>

      <h1>1</h1>
      {JSON.stringify(props.data.sessionReducers.active_session)}
      <h1>2</h1>
      {JSON.stringify(props.data.sessionReducers.active_fannyPack)}
      <h1>3</h1>
      {JSON.stringify(props.data.sessionReducers.active_account)}

      <div>
        <Space style={{ marginBottom: 16 }}>
          Tab position：
          <Select
            value={defaultTabPosition}
            onChange={(value) => setDefaultTabPosition(value)}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </Space>
        <Tabs tabPosition={defaultTabPosition}>
          <TabPane tab="Tab 1" key="1">
            <h1>props.data.sessionReducers.active_account</h1>
            <TextArea
              value={JSON.stringify(props.data.sessionReducers.active_account)}
              autoSize={{ minRows: 2, maxRows: 10 }}
            />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <h1>props.data.sessionReducers.active_fannyPack</h1>
            <TextArea
              value={JSON.stringify(props.data.sessionReducers.active_fannyPack)}
              autoSize={{ minRows: 2, maxRows: 10 }}
            />
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            <h1>props</h1>
            <TextArea
              value={JSON.stringify(props)}
              autoSize={{ minRows: 2, maxRows: 10 }}
            />
          </TabPane>
        </Tabs>
      </div>

    </Row>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);
