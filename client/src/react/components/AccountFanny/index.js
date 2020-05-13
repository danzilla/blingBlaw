import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import { Form, Input, message, Button, Menu, Dropdown } from 'antd';
import { Table, Modal, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AccountFannyView from './view';
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
// FannyTab
const AccountFanny = (props) => {
  // Change FannyPack
  const changeFannyPack = (fanny) => {
    // Switch Fanny and Refresh to Get AccountInfo
    props.dispatch(ACTION_REFRESH(fanny.fannypack_owner_serial, fanny.fannypack_serial))
    props.dispatch(ACTION_SET_ACTIVE_FANNY(fanny))
    message.success("FannyPacked changed! " + fanny.fannypack_name, 2)
  }
  // Fire
  return (
    <Dropdown overlay={
      <Menu>
        {props.data.sessionReducers.user_fannyPack.data[0].rows.map((fanny, index) => {
          return <Menu.Item onClick={() => changeFannyPack(fanny)} key={fanny.fannypack_serial}>
            <Button type="link" onClick={e => e.preventDefault()}>
              {fanny.fannypack_name}
            </Button></Menu.Item>
        })}
        <Menu.Divider />
        <Menu.Item key="00">
          <AccountFannyView />
        </Menu.Item>
      </Menu>
    }>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        {
          props.data.sessionReducers.active_fannyPack ? props.data.sessionReducers.active_fannyPack.fannypack_name
            : !props.data.sessionReducers.active_fannyPack ? "Loadding..."
              : "Error aquiring FannyPack"
        } <DownOutlined />
      </a>
    </Dropdown>
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountFanny);