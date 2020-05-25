import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';
import AccountFannyView from './view';
import AccountCategory from '../AccountCategory';
import { emojify } from 'react-emojione';
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../redux/actions/sessionAction';
const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;
// FannyTab
const AccountFanny = (props) => {
  let emojiList = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
  let emojifyOptions = { style: { height: '45' } }
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
  // Change FannyPack
  const changeFannyPack = (fanny) => {
    fanny = JSON.parse(fanny)
    // Switch Fanny and Refresh to Get AccountInfo
    props.dispatch(ACTION_SET_ACTIVE_FANNY(fanny))
    props.dispatch(ACTION_REFRESH(fanny.fannypack_owner_serial, fanny.fannypack_serial))
  }
  // React on Active_Fanny
  useEffect(() => {
    if (props.data.sessionReducers.active_fannyPack) {
        props.dispatch(ACTION_REFRESH(
        props.data.sessionReducers.active_fannyPack.fannypack_owner_serial,
        props.data.sessionReducers.active_fannyPack.fannypack_serial))
        message.success("FannyPack refreshed!" + props.data.sessionReducers.active_fannyPack.fannypack_name, 2)
    } else if (!props.data.sessionReducers.active_fannyPack) {
      randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
    }
  }, [props.data.sessionReducers.active_fannyPack]);
  // Fire
  return (
    props.data.sessionReducers.active_fannyPack ?
    (<Select
      onChange={changeFannyPack}
      defaultValue={props.data.sessionReducers.active_fannyPack.fannypack_name}
      size="large" style={{ width: 150 }}
      dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <AccountFannyView />
          <AccountCategory />
        </div>
      )}>
      {props.data.sessionReducers.user_fannyPack.data[0].rows.map((fanny, index) => (
        <Option key={index} value={JSON.stringify(fanny)}> {fanny.fannypack_name} </Option>
      ))}
    </Select>)
    :  <Avatar
        className="mx-1"
        style={{ backgroundColor: "#FFF" }}
        size={50} shape="square"
        icon={emojify(randomEmoji, emojifyOptions)} /> // error getting FannyPacks loading
  );
};
// Export - Redux
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(AccountFanny);