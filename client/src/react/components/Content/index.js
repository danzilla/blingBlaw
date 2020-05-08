import React from 'react';
import { connect } from "react-redux";
import { Layout } from 'antd';

import DashboardNavigation from '../Navigation/contentNavigation';

const { Content } = Layout;

function DashboardContent(props) {
  return (
    <Content className="card-1 p-2">
      <DashboardNavigation />
      <h1>props</h1>
      <p>{JSON.stringify(props)}</p>
    </Content>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);
