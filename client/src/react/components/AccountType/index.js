import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Form, Row, Input, message, Button, Table, Modal, Typography } from 'antd';
import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';
import { fetch_account_type_add } from '../../../api/index';
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
const moment = require('moment');
const { Search } = Input;
const { Text, Title } = Typography;
// Account Types
const AccountType = (props) => {
  // add account_type
  const [accountTypeName, setAccountTypeName] = useState(null)
  const add_account_type = (accountTypeName) => {
    if (!props.data.sessionReducers.active_fannyPack) {
      message.error("FannyPack required", 2.5)
    } else if (props.data.sessionReducers.active_fannyPack.fannypack_serial) {
      fetch_account_type_add(props.data.sessionReducers.active_fannyPack.fannypack_serial, accountTypeName)
        .then((data) => {
          props.dispatch(ACTION_REFRESH(
            props.data.sessionReducers.active_session, 
            props.data.sessionReducers.active_fannyPack.fannypack_serial))
          message.success(data.message, 2.5)
          setAccountTypeName(null)
        })
        .catch((error) => { message.error(error.message, 2.5) })
    }
  };
  const [ModalVisible, setModalVisible] = useState(false)
  // React on user_account_type
  // View FannyPacks
  let dataSource = new Array();
  props.data.sessionReducers.user_account_type &&
    props.data.sessionReducers.user_account_type.data[0].rows.map((accountType) => (
      dataSource.push({
        key: accountType.account_type_id,
        labels: accountType.account_type_name,
        created: moment(accountType.account_type_created).format('MM/DD/YYYY h:mm a'),
        modified: moment(accountType.account_type_lastmodify).format('MM/DD/YYYY h:mm a')
      })
    ));
  let Columns = [{
    title: 'Labels',
    dataIndex: 'labels',
    key: 'labels',
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
  return (
    <>
      <Button type="link" onClick={() => setModalVisible(true)}><PlusOutlined />Account Types </Button>
      <Modal title={<Title level={3}>Account Types</Title>}
        centered visible={ModalVisible} footer={null}
        onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <Row justify="center">
          <Form layout="inline">
            <Form.Item>
              <Input
                value={accountTypeName}
                onChange={(e) => setAccountTypeName(e.target.value)}
                style={{ width: '60%' }}
                size={"large"}
                placeholder={"Ex: Saving or vacation or House saving"} />
              <Button
                style={{ width: '30%' }}
                size={"large"}
                type="primary" danger onClick={() => add_account_type(accountTypeName)}> <PlusOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Table
          pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
          className="m-1" dataSource={dataSource} columns={Columns} />
      </Modal>
    </>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountType);
