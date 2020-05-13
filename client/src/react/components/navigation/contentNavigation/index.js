import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { emojify } from 'react-emojione';
import { Skeleton, Row, Avatar, Dropdown, Menu, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  ACTION_REFRESH,
  ACTION_SET_ACTIVE_USER,
  ACTION_SET_ACTIVE_FANNY,
  ACTION_SET_ACTIVE_ACCOUNT
} from '../../../../redux/actions/sessionAction';
import AccountCategory from '../../AccountCategory';
import AccountType from '../../AccountType';
import AccountFanny from '../../AccountFanny';
import Account from '../../Account';

import { Input } from 'antd';
const { TextArea } = Input;

const ContentNavigation = (props) => {
  // ACTION_SET_ACTIVE_USER()
  // ACTION_SET_ACTIVE_FANNY()
  // ACTION_SET_ACTIVE_ACCOUNT()
  let colors = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime', "#FF3E96", "#EE3A8C", "#CD3278", "#8B2252", "#FF69B4", "#EE6AA7", "#CD6090", "#8B3A62", "#872657", "#FF1493", "#CD1076", "#FF34B3", "#EE30A7", "#DA70D6"]
  let randomColors = colors[Math.floor(Math.random() * colors.length)];
  // Emoji
  let emojifyOptions = { style: { height: '45' } };
  let emojiList = [
    ":pancakes:", ":tea:", ":pizza:", ":peach:", ":ice_cream:", ":rosette:", ":chicken:", ":heartpulse:",
    ":fireworks:", ":gem:", ":cherry_blossom:", ":pig:", ":handbag:", ":kiss:", ":chicken:", ":sparkling_heart:",
    ":unicorn:", ":gorilla:", ":avocado:", ":kiwi:", ":strawberry:", ":t_rex:", ":tropical_fish:"
  ];
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  {/* 
      // User Information
      // User Fanny Information
      // User Account_record
        // User Account_type
        // User Account_category 
        // User Account_Transactions
  */}
  return (
    <>
      <Row align="middle" justify="start" className="card-3 m-1">
        <Avatar
          style={{ backgroundColor: "#FFF" }}
          size={64} shape="square"
          icon={emojify(randomEmoji, emojifyOptions)} />
        {props.data.sessionReducers.active_fannyPack &&
          <AccountFanny />
        }
        {props.data.sessionReducers.active_fannyPack &&
          <Account />
        }
        {!props.data.sessionReducers.active_account &&
          <AccountType />
        }
      </Row>
      <h1>props.data.sessionReducers.user_accounts</h1>
      <TextArea
        value={JSON.stringify(props.data.sessionReducers.user_accounts)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
      <h1>props.data.sessionReducers.user_fannyPack</h1>
      <TextArea
        value={JSON.stringify(props.data.sessionReducers.user_fannyPack)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
      <h1>props.data.sessionReducers.session_user</h1>
      <TextArea
        value={JSON.stringify(props.data.sessionReducers.session_user)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
      <h1>props.data.sessionReducer</h1>
      <TextArea
        value={JSON.stringify(props.data.sessionReducers)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
      <h1>props</h1>
      <TextArea
        value={JSON.stringify(props)}
        autoSize={{ minRows: 2, maxRows: 10 }}
      />
    </>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(ContentNavigation);