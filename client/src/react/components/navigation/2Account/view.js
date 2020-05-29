import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Form, Input, message, Button, Table, Modal, Typography, Row, Select, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetch_account_add } from '../../../../api/index';
import AccoutsType from "../4AccountType";
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../../redux/actions/sessionAction';
const moment = require('moment');
const { Title } = Typography;
const { Option } = Select;
// Account Tab
const AccountsView = (props) => {
  // Add Account
  const [accountType, setAccountType] = useState(null)
  const [accountName, setAccountName] = useState(null)
  const add_Account = (accountName) => {
    {/* sessionID, fannyID, accountName, accountType */ }
    let sessionID = props.data.sessionReducers.active_session.user_serial
    let fannyID = props.data.sessionReducers.active_fannyPack.fannypack_serial
    fetch_account_add(sessionID, fannyID, accountName, accountType)
      .then((data) => {
        message.success(data.message, 2.5)
        // Refresh fannyPackz
        props.dispatch(ACTION_REFRESH(sessionID, fannyID))
        setAccountType(null)
        setAccountName(null)
      })
      .catch((error) => {
        message.error(error.message, 2.5)
      })
  };
  // View FannyPacks
  let dataSource = new Array();
  props.data.sessionReducers.user_accounts &&
    props.data.sessionReducers.user_accounts.data[0].rows.map((accounts) => (
      dataSource.push({
        key: accounts.account_serial,
        label: accounts.account_name,
        accountType: accounts.account_type_id,
        modified: moment(accounts.account_lastmodify).format('MM/DD/YYYY h:mm a')
      })
    ))
  let fannyColumns = [{
    title: 'Account label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Type',
    dataIndex: 'accountType',
    key: 'accountType',
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
  // Fire
  return (
    <>
      <Button icon={<PlusOutlined />} type="link" onClick={() => setModalVisible(true)}>Add Accounts</Button>
      <Modal
        title={<Title level={3}>Accounts</Title>}
        centered visible={ModalVisible} footer={null}
        onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <Row justify="center">
          <Form layout="inline">
            <Form.Item>
              <Input.Group compact>
                <Select
                  style={{ width: '35%' }}
                  size={"large"}
                  defaultValue="pickMe"
                  onChange={(value) => setAccountType(value)}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <AccoutsType />
                    </div>
                  )}>
                  <Option key="00" value="pickMe">Account Type</Option>
                  {props.data.sessionReducers.user_account_type &&
                    props.data.sessionReducers.user_account_type.data[0].rows.map((accountType) => (
                      <Option key={accountType.account_type_id} value={accountType.account_type_serial}>{accountType.account_type_name}</Option>
                    ))
                  }
                </Select>
                <Input
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  style={{ width: '40%' }}
                  size={"large"}
                  placeholder={"Account Name"} />
                <Button
                  style={{ width: '15%' }}
                  size={"large"}
                  type="primary" danger onClick={() => add_Account(accountName)}> <PlusOutlined />
                </Button>
              </Input.Group>
            </Form.Item>
          </Form>
        </Row>
        <Table
          pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
          className="m-1" dataSource={dataSource} columns={fannyColumns} />
      </Modal>
    </>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountsView);