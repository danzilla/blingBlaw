import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Form, Divider, Avatar, Badge, Dropdown, Select, Layout, Menu, Icon, Input, message, Button } from 'antd';
import { Table, Modal, PageHeader, Tag, Typography } from 'antd';
import { LockOutlined, SettingOutlined, DownOutlined, UserOutlined, BookOutlined, FileAddOutlined, MoreOutlined, PlusOutlined, EllipsisOutlined, CaretDownOutlined, ReloadOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

function AccountCategory() {

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

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <>
      <Button type="link" onClick={() => setModalVisible(true)} block> Labels and Tags </Button>
      <Modal title={<Title level={3}>Labels, Tags and Categories</Title>}
        centered visible={ModalVisible} footer={null}
        onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>

          <Row justify="center">
            <Form layout="inline">
              <Select defaultValue="new" style={{ width: 180 }} onChange={""}>
                <Option value="new">New label</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Form.Item>
                <Search
                  placeholder="Label title"
                  enterButton="Insert"
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
export default AccountCategory;
