import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Form, Input, message, Button, Menu, Dropdown, Table, Modal, Typography, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetch_fannyPack_add } from '../../../api/index';
import { ACTION_REFRESH } from '../../../redux/actions/sessionAction';
const moment = require('moment');
const { Title } = Typography;
// FannyTab
const AccountFannyView = (props) => {
  // Modal
  const [ModalVisible, setModalVisible] = useState(false);
  const [fannyName, setFannyName] = useState(null);
  // Add FannyPack
  let session;
  const add_FannyPack = (fannyName) => {
    session = JSON.parse(sessionStorage.getItem('session'))
    fetch_fannyPack_add(session.user_serial, fannyName)
      .then((data) => {
        props.dispatch(ACTION_REFRESH(session.user_serial))
        message.success(data.message, 2.5)
        setFannyName(null)
      })
      .catch((error) => { message.error(error.message, 2.5); setFannyName(null); })
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
  return (
    <>
      <Button icon={<PlusOutlined />} type="link" onClick={() => setModalVisible(true)}>FannyPackz</Button>
      <Modal
        title={<Title level={3}>FannyPackz</Title>}
        onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}
        centered visible={ModalVisible} footer={null}>
        <Row justify="center">
          <Form layout="inline">
            <Form.Item>
              <Input.Group compact>
                <Input
                  style={{ width: '70%' }}
                  onChange={(e) => setFannyName(e.target.value)}
                  size={"large"}
                  value={fannyName}
                  placeholder={"FannyPack Name"}
                />
                <Button
                  size={"large"}
                  style={{ width: '30%' }}
                  type="primary" danger onClick={() => add_FannyPack(fannyName)}> <PlusOutlined />
                </Button>
              </Input.Group>
            </Form.Item>
          </Form>
        </Row>
        <Table
          className="m-1" dataSource={dataSource} columns={fannyColumns}
          pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }} />
      </Modal>
    </>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountFannyView);