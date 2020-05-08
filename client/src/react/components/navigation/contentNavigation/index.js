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
function ContentNavigation(props) {
  // ACTION_SET_ACTIVE_USER()
  // ACTION_SET_ACTIVE_FANNY()
  // ACTION_SET_ACTIVE_ACCOUNT()
  let colors = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime', "#FF3E96", "#EE3A8C", "#CD3278", "#8B2252", "#FF69B4", "#EE6AA7", "#CD6090", "#8B3A62", "#872657", "#FF1493", "#CD1076", "#FF34B3", "#EE30A7", "#DA70D6"]
  let randomColors = colors[Math.floor(Math.random() * colors.length)];

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
    <>{JSON.stringify(props.data.sessionReducers.active_fannyPack)}
      <Row align="middle" justify="start" className="card-3 m-1">
        <Avatar
          style={{ backgroundColor: "#FFF" }}
          size={64} shape="square"
          icon={emojify(randomEmoji, emojifyOptions)} />
          <Skeleton active loading={!props.data.sessionReducers.user_fannyPack.status}>
            <AccountFanny />
          </Skeleton>
          <Skeleton active loading={!props.data.sessionReducers.active_fannyPack}>
            <Account />
          </Skeleton>
          {!props.data.sessionReducers.active_account &&
            <AccountType />
          }
      </Row>
    </>
  );
};
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(ContentNavigation);