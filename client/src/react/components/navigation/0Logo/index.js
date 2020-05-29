import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Avatar } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { emojify } from 'react-emojione';
import { LOG_OUT } from '../../../../redux/actions/sessionAction';
// AccountLogo
const AccountLogo = (props) => {
  let colors = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime', "#FF3E96", "#EE3A8C", "#CD3278", "#8B2252", "#FF69B4", "#EE6AA7", "#CD6090", "#8B3A62", "#872657", "#FF1493", "#CD1076", "#FF34B3", "#EE30A7", "#DA70D6"]
  let randomColors = colors[Math.floor(Math.random() * colors.length)]
  // Emoji
  let emojifyOptions = { style: { height: '45' } }
  let emojiList = [
    ":pancakes:", ":tea:", ":pizza:", ":peach:", ":ice_cream:", ":rosette:", ":chicken:", ":heartpulse:",
    ":fireworks:", ":gem:", ":cherry_blossom:", ":pig:", ":handbag:", ":kiss:", ":chicken:", ":sparkling_heart:",
    ":unicorn:", ":gorilla:", ":avocado:", ":kiwi:", ":strawberry:", ":t_rex:", ":tropical_fish:", "💥", "💦", "🎍"
  ]
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
  // Logout
  const LogOut = () => {
    props.dispatch(LOG_OUT())
    sessionStorage.setItem('session', null);
  }
  const menu = (
    <Menu>
      <Menu.Item> <a target="_blank" rel="noopener noreferrer">{emojify("⚙️")} Settings </a> </Menu.Item>
      <Menu.Item> <a target="_blank" onClick={() => LogOut()} rel="noopener noreferrer">{emojify("🔏")} Logout </a> </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Avatar
        className="mx-1"
        style={{ backgroundColor: "#FFF" }}
        size={50} shape="square"
        icon={emojify(randomEmoji, emojifyOptions)} />
    </Dropdown>
  )
}
const mapStateToProps = state => { return { data: state } }
export default connect(mapStateToProps)(AccountLogo)
