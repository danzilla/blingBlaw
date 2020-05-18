import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import { Form, Input, message, Button, Menu, Dropdown } from 'antd';
import { Table, Modal, Typography } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { fetch_fannyPack_add } from '../../../api/index';
import {ACTION_REFRESH } from '../../../redux/actions/sessionAction';
const moment = require('moment');
const { Search } = Input;
const { Title } = Typography;
// FannyTab
const AccountFannyView = (props) => {
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
      onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}
      centered visible={ModalVisible} footer={null}>
      <Row justify="center">
        <Form layout="inline">
          <Form.Item>
            <Search
              placeholder="New FannyPack"
              enterButton="add"
              onSearch={value => { add_FannyPack(value); value = null; }}
            />
          </Form.Item>
        </Form>
      </Row>
      <Table 
        className="m-1" dataSource={dataSource} columns={fannyColumns}
        pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }} />
    </Modal>)
  // Fire
  return (
    <>
      <Button icon={<PoweroffOutlined />} type="link" onClick={() => setModalVisible(true)}>
        Add new FannyPack
      </Button>
      {FannyModal}
    </>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountFannyView);