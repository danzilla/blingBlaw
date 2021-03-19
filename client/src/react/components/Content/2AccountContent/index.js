import React, { useState } from 'react';
import { connect } from "react-redux";
import { Card, Col, Row, Button } from 'antd';
const AccountContent = (props) => {
  // Account_Content

  return (
    <Row className="card-1 m-1 p-1">
      <div className="site-card-wrapper">

        <Card 
          className="my-2"
          hoverable bordered={false}
          title={`Account: ${props.data.sessionReducers.active_account.account_name}`}
          extra={<Button type="primary" danger>Add Transaction</Button>}>
          <h1>1</h1>
          <p className="wordBreak-all"> {JSON.stringify(props.data.sessionReducers.active_session)} </p>
          <h1>2</h1>
          <p className="wordBreak-all"> {JSON.stringify(props.data.sessionReducers.active_fannyPack)} </p>
          <h1>3</h1>
          <p className="wordBreak-all"> {JSON.stringify(props.data.sessionReducers.active_account)} </p>
        </Card>

        <Card 
          hoverable bordered={false}
          className="my-2"
          title="Card title">
          <h1>1</h1>
          <p className="wordBreak-all"> {JSON.stringify(props.data.sessionReducers)} </p>
        </Card>

      </div>
    </Row>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountContent);
