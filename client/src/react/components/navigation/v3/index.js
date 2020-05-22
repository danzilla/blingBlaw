import React, { useState } from 'react';
import { connect } from "react-redux";

import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';

import AccountLogo from '../../AccountLogo';
import AccountFanny from '../../AccountFanny';
import Account from '../../Account';
import AccountType from '../../AccountType';
const DashboardContent = (props) => {
  return (
    <Row align="middle" justify="start" className="card-3 m-1 p-1">
      <AccountLogo />
      <AccountFanny />
      <Account />
    </Row>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);