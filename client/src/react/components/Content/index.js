import React, { useState } from 'react';
import { connect } from "react-redux";

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';
import DashboardNavigation from '../Navigation/contentNavigation';
import DashboardNavigationV2 from '../Navigation/v2';

import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;
const DashboardContent = (props) => {
  // State
  const [activeFanny, setFanny] = useState(null)
  const [activeAccount, setAccount] = useState(null)
  const [activeAccountAdds, setAccountAdds] = useState(null)

  return (
    <Content className="card-1 p-2">
      <DashboardNavigationV2 />
      {/*  <DashboardNavigation /> */}

      <h1>props.data.sessionReducers.active_account</h1>
      <TextArea
        value={JSON.stringify(props.data.sessionReducers.active_account)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
      <h1>props.data.sessionReducers.active_fannyPack</h1>
      <TextArea
        value={JSON.stringify(props.data.sessionReducers.active_fannyPack)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
      <h1>props</h1>
      <TextArea
        value={JSON.stringify(props)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
    </Content>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);
