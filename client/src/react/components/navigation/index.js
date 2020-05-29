import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row } from 'antd';
// Modules
import AccountLogo from './0Logo';
import AccountFanny from './1Fannypack';
import Account from './2Account';
// Dashboard
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