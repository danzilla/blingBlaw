import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Avatar, Divider, message, Button, Select } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { emojify } from 'react-emojione';
import AccoutsType from "../4AccountType"
import AccountsView from "./view";
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../../redux/actions/sessionAction';
const { Option } = Select;
// Account Tab
const Account = (props) => {
  let emojiList = ["😗", "🙄", "😚", "🤪", "😜", "😝", "😛", "😋", "😉", "🤣"];
  let emojifyOptions = { style: { height: '45' } }
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
  // Change Account
  const changeAccount = (account) => {
    if(account == "view_acc"){
      props.dispatch(ACTION_SET_ACTIVE_ACCOUNT(null))
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
    : <Avatar
        className="mx-1"
        style={{ backgroundColor: "#FFF" }}
        size={50} shape="square"
        icon={emojify(randomEmoji, emojifyOptions)} /> // "Error aquiring FannyPack and Accountz"
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Account);