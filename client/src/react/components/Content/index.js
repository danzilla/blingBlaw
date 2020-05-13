import React from 'react';
import { connect } from "react-redux";

import DashboardNavigation from '../Navigation/contentNavigation';

import { Input, Layout } from 'antd';
const { TextArea } = Input;
const { Content } = Layout;

const DashboardContent = (props) => {
  return (
    <Content className="card-1 p-2">
      <h1>props.data.sessionReducers</h1>
      <TextArea
          value={JSON.stringify(props.data.sessionReducers.user_fannyPack)}
          autoSize={{ minRows: 2, maxRows: 3 }}
        />
      <DashboardNavigation />
    </Content>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);
