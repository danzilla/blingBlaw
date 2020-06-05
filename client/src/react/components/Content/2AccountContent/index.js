import React, { useState } from 'react';
import { connect } from "react-redux";
import { Button, Col, Row, Card, Breadcrumb, Skeleton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// Account_Content
const AccountContent = (props) => {
  return (
    <Skeleton loading={props.data.sessionReducers.user_account_transaction}>
      <Row className="m-1 p-1">
        <Col span={24} style={{ overflow: 'auto' }}>
          <Card bordered={false} title={(<>
              <Breadcrumb separator=">" span={24} style={{ overflow: 'auto' }}>
                <Breadcrumb.Item><Button type="link">{props.data.sessionReducers.active_session.user_name}</Button></Breadcrumb.Item>
                <Breadcrumb.Item><Button type="link">{props.data.sessionReducers.active_fannyPack.fannypack_name}</Button></Breadcrumb.Item>
                <Breadcrumb.Item><Button icon={<UploadOutlined />} type="link">{props.data.sessionReducers.active_account.account_name}</Button></Breadcrumb.Item>
              </Breadcrumb>
            </>)}>
            <p> {JSON.stringify(props.data.sessionReducers)} </p>
          </Card>
        </Col>
      </Row>
    </Skeleton>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountContent);
