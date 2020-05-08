import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import { Form, Input, message, Button, Menu, Dropdown } from 'antd';
import { Table, Modal, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { fetch_account_add } from '../../../api/index';
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
const moment = require('moment');
const { Search } = Input;
const { Title } = Typography;
// Account Tab
function Account(props) {
  // GET and SET User_Fanny_Account
  const getAccount = (userID, fannyPack) => {
    props.dispatch(ACTION_SET_ACTIVE_FANNY(fannyPack))
    props.dispatch(ACTION_REFRESH(userID, fannyPack.fannypack_serial))
  };
  // Add Account
  const add_Account = (sessionID, fannyPack) => {
    {/* 
      accountType
      accountID
      accountName
      userID
      fannyID
    */}
    fetch_account_add(sessionID, fannyPack)
      .then((data) => {
        message.success(data.message, 2.5)
      })
      .catch((error) => {
        message.error(error.message, 2.5)
      })
  };
  // View FannyPacks
  let dataSource = new Array();
  Object.keys(props.data.sessionReducers.user_accounts).length > 0 &&
    props.data.sessionReducers.user_accounts.data[0].rows.map((accounts) => (
      dataSource.push({
        key: accounts.fannypack_serial,
        label: accounts.fannypack_name,
        created: moment(accounts.fannypack_created).format('MM/DD/YYYY h:mm a'),
        modified: moment(accounts.fannypack_lastupdated).format('MM/DD/YYYY h:mm a')
      })
    ))
  let fannyColumns = [{
    title: 'Account label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: 'Modified',
    dataIndex: 'modified',
    key: 'modified',
  }];
  // Modal
  const [ModalVisible, setModalVisible] = useState(false);
  const AccountModal =
    (<Modal title={<Title level={3}>FannyPackz</Title>}
      centered visible={ModalVisible} footer={null}
      onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
      <Row justify="center">
        <Form layout="inline">
          <Form.Item>
            <Search
              placeholder="New FannyPack"
              enterButton="add"
              onSearch={value => add_Account(value)}
            />
          </Form.Item>
        </Form>
      </Row>
      <Table
        pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
        className="m-1" dataSource={dataSource} columns={fannyColumns} />
    </Modal>)
  // Fire
  return (
    Object.keys(props.data.sessionReducers.user_accounts).length > 0 &&
    <Dropdown overlay={
      <Menu>
        {props.data.sessionReducers.user_accounts.data[0].rows.map((account, accountID) => (
          <Menu.Item key={accountID}>
            <Button block type="link" 
              onClick={() => { getAccount(props.data.sessionReducers.active_session, props.data.sessionReducers.active_fannyPack.fannypack_serial) }}>
              {account}
            </Button>
          </Menu.Item>
        ))} {/* Add FannyButton */}
        <Menu.Item>
          <Button type="link" block onClick={() => setModalVisible(true)}>Add new Account</Button>
          {AccountModal}
        </Menu.Item>
      </Menu>}>
      <Button type="link" size="large">
        {
          props.data.sessionReducers.active_account ? props.data.sessionReducers.active_account
            : !props.data.sessionReducers.active_account ? "Loadding..."
              : "Error aquiring FannyPack"
        }
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Account);