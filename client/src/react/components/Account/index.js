import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import { Form, Input, message, Button, Menu, Dropdown } from 'antd';
import { Table, Modal, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AccountsView from "./view";
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
// Account Tab
const Account = (props) => {
  // Change FannyPack
  const changeAccount = (account) => {
    let sessionID = account.account_owner_serial;
    let fannyID = props.data.sessionReducers.active_fannyPack.fannypack_serial;
    let accountID = account.account_serial;
    // Switch Fanny and Refresh to Get AccountInfo
    // props.dispatch(ACTION_REFRESH(sessionID, fannyID, accountID))
    props.dispatch(ACTION_REFRESH(sessionID, fannyID))
    props.dispatch(ACTION_SET_ACTIVE_ACCOUNT(account))
    message.success("Account changed! " + account.account_name, 2)
  }
  // Fire
  return (
    <Dropdown overlay={
      <Menu>
        {props.data.sessionReducers.user_accounts.data ? (
          props.data.sessionReducers.user_accounts.data[0].rows.map((account, index) => {
            return <Menu.Item onClick={() => changeAccount(account)} key={account.account_serial}>
              <Button type="link" onClick={e => e.preventDefault()}> {account.account_name} </Button></Menu.Item>
          })
        ) : (<Menu.Item key="01"> <h1>Empty Accounts</h1> </Menu.Item>)}
        <Menu.Divider />
        <Menu.Item key="00"> <AccountsView /> </Menu.Item>
      </Menu>
    }>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        {
          !props.data.sessionReducers.active_fannyPack ? "EMPTY_FANNY"
            : !props.data.sessionReducers.active_account ? "Overview"
              : props.data.sessionReducers.active_account ? props.data.sessionReducers.active_account
                : "Error aquiring FannyPack"
        } <DownOutlined />
      </a>
    </Dropdown>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Account);