import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';

import AccoutsType from "../AccountType"
import AccountsView from "./view";

import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;
// Account Tab
const Account = (props) => {
  // Change FannyPack
  const changeAccount = (account) => {
    if(account == "view_acc"){
      message.success( "FannyPack " + props.data.sessionReducers.active_fannyPack.fannypack_name + " overview", 2)
    } else {
      account = JSON.parse(account)
      let sessionID = account.account_owner_serial;
      let fannyID = props.data.sessionReducers.active_fannyPack.fannypack_serial;
      let accountID = account.account_serial;
      // Switch Fanny and Refresh to Get AccountInfo
      props.dispatch(ACTION_REFRESH(sessionID, fannyID, accountID))
      props.dispatch(ACTION_SET_ACTIVE_ACCOUNT(account))
      message.success("Account changed! " + account.account_name, 2)
    }
  }
  // Fire
  return (props.data.sessionReducers.user_accounts ?
    (<Select
      size="large"
      style={{ width: 200 }}
      onChange={changeAccount}
      defaultValue="view_acc"
      dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <AccountsView />
          <AccoutsType />
        </div>
      )}>
      {props.data.sessionReducers.user_accounts.data[0].rows.map((account, index) => (
        <Option key={index} value={JSON.stringify(account)}> {account.account_name} </Option>
      ))}
      <Option value="view_acc"><Button type="link"><CreditCardOutlined />View {props.data.sessionReducers.active_fannyPack.fannypack_name} accounts</Button></Option>
    </Select>)
    : "Error aquiring FannyPack and Accountz"
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Account);