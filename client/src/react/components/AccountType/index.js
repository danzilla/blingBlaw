import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Row, Col } from 'antd';
import { Form, Divider, Avatar, Badge, Dropdown, Select, Layout, Menu, Icon, Input, message, Button } from 'antd';
import { Table, Modal, PageHeader, Tag, Typography } from 'antd';
import { LockOutlined, SettingOutlined, DownOutlined, UserOutlined, BookOutlined, FileAddOutlined, MoreOutlined, PlusOutlined, EllipsisOutlined, CaretDownOutlined, ReloadOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

function AccountType(props) {

  // axios_fetch_user_FannyPackz
  async function add_accountType_api(fannyPack, accountTypeName) {
    return await axios.post("http://localhost:5000/Account/type/add", {
      accountTypeName: accountTypeName, 
      fannyPack: fannyPack })
      .then((data) => { return data.data; })
      .catch((err) => { return err; })
  }
  // add_account_type
  const add_account_type = (fannyPack, accountTypeName) => {
    add_accountType_api(fannyPack, accountTypeName)
      .then((data) => { message.warning("\n : " + JSON.stringify(data), 2.5); })
      .catch((err) => { message.warning("\n : " + JSON.stringify(err), 2.5); });
  };
  
  const [ModalVisible, setModalVisible] = useState(false);
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)} block> Account Types </Button>
      <Modal title={<Title level={3}>Account Types</Title>}
        centered visible={ModalVisible} footer={null}
        onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>

          {props.name}
          {props.message}
          {JSON.stringify(props)}

          <Row justify="center">
            <Form layout="inline">
              <Form.Item>
                <Search
                  placeholder="Which Type of an Account"
                  enterButton="add"
                  onSearch={value => console.log(value)}
                />
              </Form.Item>
            </Form>
          </Row>
          
        <Table className="m-1" dataSource={dataSource} columns={columns} />
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return { data: state };
};
export default connect(mapStateToProps)(AccountType);
