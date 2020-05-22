import React, { useState } from 'react';
import { connect } from "react-redux";

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';
import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Divider, Layout, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Tabs, Space } from 'antd';
import { Card, Col, Row } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
const { Meta } = Card;

const FannyContent = (props) => {
  return (
    <Row className="card-1 m-1 p-1">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card hoverable title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(FannyContent);
