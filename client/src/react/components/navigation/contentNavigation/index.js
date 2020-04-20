import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Divider, Avatar, Badge, Dropdown, Select, Layout, Menu, Icon, Input, message, Button } from 'antd';
import { Modal, PageHeader, Tag, Typography } from 'antd';
import { DownOutlined, UserOutlined, BookOutlined, FileAddOutlined, MoreOutlined, PlusOutlined, EllipsisOutlined, CaretDownOutlined, ReloadOutlined, ShoppingOutlined } from '@ant-design/icons';
import { emojify } from 'react-emojione';

import AccountCategory from '../../AccountCategory';
import AccountType from '../../AccountType';

function ContentNavigation() {
  const [FannyPackZ, setFannyPackz] = useState("Current_Fanny");
  const [FannyAccountZ, setFannyAccountZ] = useState("Overview");
  const [FannyAccountDetail, setFannyAccountDetail] = useState("Overview");

  const menuFanny = (
    <Dropdown overlay={
      <Menu>
        <Menu.Item> <Button onClick={() => { setFannyPackz("FannyPack_1"); setFannyAccountZ("Overview"); }} type="link" block> FannyPack_1 </Button> </Menu.Item>
        <Menu.Item> <Button onClick={() => { setFannyPackz("FannyPack_3"); setFannyAccountZ("Overview"); }} type="link" block> FannyPack_2 </Button> </Menu.Item>
        <Menu.Item> <Button onClick={() => { setFannyPackz("FannyPack_2"); setFannyAccountZ("Overview"); }} type="link" block> FannyPack_3 </Button> </Menu.Item>
      </Menu>}>
      <Button type="link" size="large"> {FannyPackZ} <DownOutlined /> </Button>
    </Dropdown>
  );
  const menuAccount = (
    <Dropdown overlay={
      <Menu>
        <Menu.Item> <Button onClick={() => setFannyAccountZ("Overview")} type="link" block> Overview </Button> </Menu.Item>
        <Menu.Item> <Button onClick={() => setFannyAccountZ("account_1")} type="link" block> account_1 </Button> </Menu.Item>
        <Menu.Item> <Button onClick={() => setFannyAccountZ("account_2")} type="link" block> account_2 </Button> </Menu.Item>
        <Menu.Item> <Button onClick={() => setFannyAccountZ("account_3")} type="link" block> account_3 </Button> </Menu.Item>
      </Menu>}>
      <Button type="link" size="large"> {FannyAccountZ} <DownOutlined /> </Button>
    </Dropdown>
  );
  const menuAccountAdd = (
    <Dropdown overlay={
      <Menu>
        <Menu.Item> <Button type="link" block> Overview </Button> </Menu.Item>
        <Menu.Item> <AccountCategory /> </Menu.Item>
        <Menu.Item> <AccountType /> </Menu.Item>
      </Menu>}>
      <Button type="link" size="large"> Overview <DownOutlined /> </Button>
    </Dropdown>
  );

  let colors = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime', "#FF3E96", "#EE3A8C", "#CD3278", "#8B2252", "#FF69B4", "#EE6AA7", "#CD6090", "#8B3A62", "#872657", "#FF1493", "#CD1076", "#FF34B3", "#EE30A7", "#DA70D6"]
  let randomColors = colors[Math.floor(Math.random() * colors.length)];

  let emojifyOptions = { style: { height: '45' } };
  let emojiList = [
    ":pancakes:", ":tea:", ":pizza:", ":peach:", ":ice_cream:", ":rosette:", ":chicken:", ":heartpulse:",
    ":fireworks:", ":gem:", ":cherry_blossom:", ":pig:", ":handbag:", ":kiss:", ":chicken:", ":sparkling_heart:",
    ":unicorn:", ":gorilla:", ":avocado:", ":kiwi:", ":strawberry:", ":t_rex:", ":tropical_fish:"
  ];
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

  return (
    <>
      {FannyPackZ} {FannyAccountZ} {FannyAccountDetail}
      <Row align="middle" justify="start" className="card-3 m-1">
        <Avatar
          style={{ backgroundColor: "#FFF" }}
          size={64} shape="square"
          icon={emojify(randomEmoji, emojifyOptions)} />
        {menuFanny}
        {menuAccount}
        {FannyAccountZ !== "Overview" && menuAccountAdd}
      </Row>
    </>
  );
};
export default ContentNavigation;
