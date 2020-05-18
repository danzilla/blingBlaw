import React, { useState } from 'react';
import { connect } from "react-redux";

import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';

import Account from '../../Account';
import AccountType from '../../AccountType';
import AccountFanny from '../../AccountFanny';
import AccountCategory from '../../AccountCategory';

const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;

const DashboardContent = (props) => {
  // State
  const [activeFanny, setFanny] = useState(null)
  const [activeAccount, setAccount] = useState(null)
  const [activeAccountAdds, setAccountAdds] = useState(null)

  return (
    <Row align="middle" justify="start" className="card-3 m-1 p-1">
      <Input.Group compact size="large">
        {/* FannyPacks */}
        <AccountFanny />
        <Account />

        {/* AccountAdds */}
        {!props.data.sessionReducers.user_account_transaction.status ?
          (<Select defaultValue="view_acc_trans" onChange={(value) => setAccount(value)} style={{ width: 200 }} size="large">
            <Option value="view_acc_trans"><a><PlusOutlined /> View {} transactions</a></Option>
            <Option value="acc_labels"><a><PlusOutlined /> Tags, Labels and Category</a></Option>
          </Select>)
          : "Error aquiring FannyPack and Account and transactionz"
        }
      </Input.Group>
    </Row>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);