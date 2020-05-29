import React, { useState } from 'react';
import { connect } from "react-redux";
import { Card, Col, Row, message } from 'antd';
import FannyContent from './1FannypackContent';
import AccountContent from './2AccountContent';
// Dashboard
const DashboardContent = (props) => {
  // Fanny_Content
  let displayContent;
  if (/overview/.test(props.data.sessionReducers.active_account) || props.data.sessionReducers.active_account === null){
    displayContent = <FannyContent />
  } if (typeof props.data.sessionReducers.active_account === 'object' && props.data.sessionReducers.active_account !== null) {
    displayContent = <AccountContent />
  }
  return (displayContent);
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);