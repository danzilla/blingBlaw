import React, { useState } from 'react';
import { connect } from "react-redux";
import { Button, Row, Col, Layout, Menu, Icon, Input } from 'antd';
import DashboardNavigation from '../navigation/contentNavigation';

const { Header, Sider, Content, Footer } = Layout;

function DashboardContent(props) {
  return (
    <Content className="card-1 p-2">
      <DashboardNavigation />

      <h4>sessionReducers</h4>
      <p>{JSON.stringify(props.data.sessionReducers)}</p>
      <h4>fetchReducers</h4>
      <p>{JSON.stringify(props.data.fetchReducers)}</p>
      <h4>accountDataReducers</h4>
      <p>{JSON.stringify(props.data.accountDataReducers)}</p>
      <h4>props</h4>
      <p>{JSON.stringify(props)}</p>

    </Content>
  );
};
const mapStateToProps = state => {
  return { data: state };
};
export default connect(mapStateToProps)(DashboardContent);
