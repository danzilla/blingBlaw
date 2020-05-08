import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import { Form, Input, message, Button, Menu, Dropdown } from 'antd';
import { Table, Modal, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { fetch_fannyPack_add } from '../../../api/index';
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
const moment = require('moment');
const { Search } = Input;
const { Title } = Typography;
// FannyTab
function AccountFanny(props) {
  // GET and SET User_Fanny_Account
  const getAccount = (userID, fannyPack) => {
    props.dispatch(ACTION_SET_ACTIVE_FANNY(fannyPack))
    props.dispatch(ACTION_REFRESH(userID, fannyPack.fannypack_serial))
  };
  // Everytime Active fannyChanges - props.data.sessionReducers.active_fannyPack
  useEffect(() => {
    if (!props.data.sessionReducers.active_fannyPack) {
      // On-Start - If Active_fanny is Empty - pop()
      props.dispatch(ACTION_SET_ACTIVE_FANNY(props.data.sessionReducers.user_fannyPack.data[0].rows[0]))
      message.warning("FannyPack pop(): " + props.data.sessionReducers.user_fannyPack.data[0].rows[0].fannypack_name, 1.5)
    } else if(props.data.sessionReducers.active_fannyPack) {
      message.success("FannyPack changed: " + props.data.sessionReducers.active_fannyPack.fannypack_name, 2.5)
    }
  }, [props.data.sessionReducers.active_fannyPack]);
  // Add FannyPack
  let sessionID = sessionStorage.getItem('sessionID');
  const add_FannyPack = (fannyPack) => {
    fetch_fannyPack_add(sessionID, fannyPack)
      .then((data) => {
        props.dispatch(ACTION_REFRESH(sessionID))
        message.success(data.message, 2.5)
      })
      .catch((error) => { message.error(error.message, 2.5) })
  };
  // View FannyPacks
  let dataSource = new Array();
  Object.keys(props.data.sessionReducers.user_fannyPack).length > 0 &&
    props.data.sessionReducers.user_fannyPack.data[0].rows.map((fannypack) => (
      dataSource.push({
        key: fannypack.fannypack_serial,
        FName: fannypack.fannypack_name,
        created: moment(fannypack.fannypack_created).format('MM/DD/YYYY h:mm a'),
        modified: moment(fannypack.fannypack_lastupdated).format('MM/DD/YYYY h:mm a')
      })
    ))
  let fannyColumns = [{
    title: 'FannyPack',
    dataIndex: 'FName',
    key: 'FName',
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
  const FannyModal =
  (<Modal title={<Title level={3}>FannyPackz</Title>}
    centered visible={ModalVisible} footer={null}
    onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
    <Row justify="center">
      <Form layout="inline">
        <Form.Item>
          <Search
            placeholder="New FannyPack"
            enterButton="add"
            onSearch={value => add_FannyPack(value)}
          />
        </Form.Item>
      </Form>
    </Row>
    <Table
      pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
      className="m-1" dataSource={dataSource} columns={fannyColumns} />
  </Modal>)
  // Fire
  return (
    Object.keys(props.data.sessionReducers.user_fannyPack).length > 0 &&
    <Dropdown overlay={
      <Menu>
        {props.data.sessionReducers.user_fannyPack.data[0].rows.map((fannypack, user_serial) => (
          <Menu.Item key={user_serial}>
            <Button block type="link" onClick={() => { getAccount(fannypack.fannypack_owner_serial, fannypack) }}>
              {fannypack.fannypack_name}
            </Button>
          </Menu.Item>
        ))} {/* Add FannyButton */}
        <Menu.Item>
          <Button type="link" block onClick={() => setModalVisible(true)}>Add new FannyPack</Button>
          {FannyModal}
        </Menu.Item>
      </Menu>}>
      <Button type="link" size="large">
        {
          props.data.sessionReducers.active_fannyPack ? props.data.sessionReducers.active_fannyPack.fannypack_name
            : !props.data.sessionReducers.active_fannyPack ? "Loadding..."
              : "Error aquiring FannyPack"
        }
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountFanny);