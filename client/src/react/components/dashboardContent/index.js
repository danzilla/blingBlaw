import React, { useState } from 'react';
import { Row, Col, Layout, Menu, Icon, Input } from 'antd';
import DashboardNavigation from '../navigation/contentNavigation';

const { Header, Sider, Content, Footer } = Layout;
function DashboardContent(props) {
  return (
    <Content className="card-1 p-2">
      <DashboardNavigation />
      
      <h4>user</h4>
      <p>{JSON.stringify(props.user)}</p>
      <h4>userInfo</h4>
      <p>{JSON.stringify(props.userInfo)}</p>
      <h4>fannyPackz</h4>
      <p>{JSON.stringify(props.fannyPackz)}</p>
      <h4>fannyAccountz</h4>
      <p>{JSON.stringify(props.fannyAccountz)}</p>

    </Content>
  );
};
export default DashboardContent;
