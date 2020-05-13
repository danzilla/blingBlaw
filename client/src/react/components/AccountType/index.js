import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row } from 'antd';
import { Form, Input, message, Button, Table, Modal, Typography } from 'antd';
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
  const add_account_type = (accountTypeName) => {
    if (!props.data.sessionReducers.active_fannyPack) {
      message.error("FannyPack required", 2.5)
    } else if (props.data.sessionReducers.active_fannyPack.fannypack_serial) {
      let activeSession = props.data.sessionReducers.active_session
      let activeFanny = props.data.sessionReducers.active_fannyPack.fannypack_serial
      fetch_account_type_add(activeFanny, accountTypeName)
        .then((data) => { 
          props.dispatch(ACTION_REFRESH(activeSession, activeFanny))
          message.success(data.message, 2.5)
        })
        .catch((error) => { message.error(error.message, 2.5) })
    }
  };
  const [ModalVisible, setModalVisible] = useState(false)
  // View FannyPacks
  let dataSource = new Array();
  Object.keys(props.data.sessionReducers.user_account_type).length > 0 &&
    props.data.sessionReducers.user_account_type.data[0].rows.map((accountType) => (
      dataSource.push({
        key: accountType.account_type_id,
        labels: accountType.account_type_name,
        created: moment(accountType.account_type_created).format('MM/DD/YYYY h:mm a'),
        modified: moment(accountType.account_type_lastmodify).format('MM/DD/YYYY h:mm a')
      })
    ))
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
      <Button type="link" onClick={() => setModalVisible(true)}> Account Types </Button>
      <Modal title={<Title level={3}>Account Types</Title>}
        centered visible={ModalVisible} footer={null}
        onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <Row justify="center">
          <Form layout="inline">
            <Form.Item>
              <Search
                placeholder="Which Type of an Account"
                enterButton="add"
                onSearch={value => add_account_type(value)}
              />
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
