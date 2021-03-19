import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Card, Col, Row } from 'antd';
import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Divider, Layout, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Tabs, Space } from 'antd';

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';

import AccountsView from "../../Navigation/2Account/view";
import AccountType from '../../Navigation/4AccountType';import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../../redux/actions/sessionAction';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
const { Meta } = Card;

const FannyContent = (props) => {

  const [addAccount, setAddAccount] = useState("Loading...")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (props.data.sessionReducers.active_fannyPack) {
      setAddAccount("Add new account to " + props.data.sessionReducers.active_fannyPack.fannypack_name)
      setLoading(false)
    } else {
      setAddAccount("Loading...")
      setLoading(true)
    }
  }, [props.data.sessionReducers.active_account]);

  // Change Account
  const changeAccount = (account) => {
    if(account == "view_acc"){
      props.dispatch(ACTION_SET_ACTIVE_ACCOUNT(null))
      message.success( "FannyPack " + props.data.sessionReducers.active_fannyPack.fannypack_name + " overview", 2)
    } else {
      let sessionID = account.account_owner_serial;
      let fannyID = props.data.sessionReducers.active_fannyPack.fannypack_serial;
      let accountID = account.account_serial;
      // Switch Fanny and Refresh to Get AccountInfo
      props.dispatch(ACTION_REFRESH(sessionID, fannyID, accountID))
      props.dispatch(ACTION_SET_ACTIVE_ACCOUNT(account))
      message.success("Account changed! " + account.account_name, 2)
    }
  }
  // Account Card
  const accountz = [];
  if (props.data.sessionReducers.user_accounts && props.data.sessionReducers.user_account_type) {
    props.data.sessionReducers.user_accounts.data[0].rows.map((account, index) => (
      props.data.sessionReducers.user_account_type.data[0].rows.map((accountType, index) => {
        // If Account and AccountType are match -> Blaze
        if (accountType.account_type_serial == account.account_type_id) {
          accountz.push(
            <Col className="m-1 p-1">
              <Card 
                key={index} hoverable 
                style={{ width: 240 }}
                actions={[<Button onClick={() => changeAccount(account)} type="primary" danger>View </Button>]}>
                  <Meta title={"Account " + account.account_name}
                    description={
                      <>
                        <p>Created: {account.account_created}</p>
                        <p>Modified: {account.account_lastmodify}</p>
                        <p>Account Type: {account.account_type_id}</p>
                        <p>Account Type Name: {accountType.account_type_name}</p>
                        <p>Account Type ID: {accountType.account_type_serial}</p>
                      </>
                    } />
              </Card>
            </Col>
          )
        }
      })
    ))
  }
  // FannyPack Content
  return (
    <Row className="m-1 p-1">
      {props.data.sessionReducers.user_accounts 
        ? accountz 
        : <Card hoverable loading={true} style={{ width: 240 }}><Meta title={"Loading... Accounts"} /></Card>
      }
      <Col className="m-1 p-1">
        <Card hoverable loading={loading} style={{ width: 240 }}>
          <Meta title={addAccount} description={<AccountsView />} />
        </Card>
      </Col>
    </Row>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(FannyContent);
