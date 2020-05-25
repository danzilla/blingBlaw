import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { Skeleton, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { Input, Col, Divider, Layout, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

import { PlusOutlined, CreditCardOutlined, DownOutlined } from '@ant-design/icons';

import AccountLogo from '../../AccountLogo';
import AccountFanny from '../../AccountFanny';
import Account from '../../Account';
import AccountType from '../../AccountType';

import { emojify } from 'react-emojione';

const DashboardContent = (props) => {

  
let emojiList = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
let emojiList1 = [
  ":pancakes:", ":tea:", ":pizza:", ":peach:", ":ice_cream:", ":rosette:", ":chicken:", ":heartpulse:",
  ":fireworks:", ":gem:", ":cherry_blossom:", ":pig:", ":handbag:", ":kiss:", ":chicken:", ":sparkling_heart:",
  ":unicorn:", ":gorilla:", ":avocado:", ":kiwi:", ":strawberry:", ":t_rex:", ":tropical_fish:"
]
let emojifyOptions = { style: { height: '45' } }
let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
// React on Active_Fanny
useEffect(() => {
  randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
}, [props.data.sessionReducers.active_fannyPack]);

  return (
    <Row align="middle" justify="start" className="card-3 m-1 p-1">
      <AccountLogo />
      <AccountFanny />
      <Account />
    </Row>
  );
};

const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(DashboardContent);