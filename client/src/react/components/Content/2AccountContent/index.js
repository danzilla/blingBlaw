import React, { useState } from 'react';
import { connect } from "react-redux";
import { Card, Col, Row } from 'antd';
const AccountContent = (props) => {
  // Account_Content
  return (
    <Row className="card-1 m-1 p-1">
      <div className="site-card-wrapper">
        <Card hoverable title="Card title" bordered={false}>
          <h1>1</h1>
          {JSON.stringify(props.data.sessionReducers.active_session)}
          <h1>2</h1>
          {JSON.stringify(props.data.sessionReducers.active_fannyPack)}
          <h1>3</h1>
          {JSON.stringify(props.data.sessionReducers.active_account)}
        </Card>
        <Card hoverable title="Card title" bordered={false}>
          <h1>1</h1>
          {JSON.stringify(props.data.sessionReducers)}
        </Card>
      </div>
    </Row>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountContent);
