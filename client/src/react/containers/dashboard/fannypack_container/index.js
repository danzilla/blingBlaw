// FannyPack Container
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
// Ant.Design
import { Row, Col, Typography, Input, Modal, message, Menu, Dropdown, Icon, Tooltip } from 'antd';
const { Title, Text } = Typography;
// FannyPack Container
function FannyPack(props) {
  // FannyPack State
  const [newFannyPack, setNewFannyPack] = useState({ fannyAddModalVisable: false, newFannyPackName: "", fannyPack: "" });
  const ShowFannyAddModal = (state) => { setNewFannyPack({...newFannyPack, fannyAddModalVisable: state});};
  const CreateNewFanny = () => {
    // axios_fetch_post
    axios.post("http://localhost:5000/fannypack/add", {
      userSerial: newFannyPack.fannyPack.fannypack_owner_serial, 
      fannyPack: newFannyPack.newFannyPackName 
    })
    .then((data) => { message.success(data.data.pageMesage.message); props.Refresh_FannyPack(); })
    .catch((err) => { message.info(JSON.stringify(err));});
    // Clear field and close form
    setNewFannyPack({...newFannyPack, newFannyPackName: "", fannyAddModalVisable: false});
  };
  // Sparkles
  // emojify
  let emojifyOptions = { style: { height: '50' } };
  let emojiList = [
    ":pancakes:", ":tea:", ":pizza:", ":peach:", ":ice_cream:", ":rosette:", ":chicken:", ":heartpulse:",
    ":fireworks:", ":gem:", ":cherry_blossom:", ":pig:", ":handbag:", ":kiss:", ":chicken:",  ":sparkling_heart:",
    ":unicorn:", ":gorilla:", ":avocado:", ":kiwi:", ":strawberry:", ":t_rex:", ":tropical_fish:"
  ]; 
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  // Menus Dropdowns
  const AppSetting = <Dropdown overlay={
                        <Menu>
                          <Menu.Item> <a href="#"> Users </a> </Menu.Item>
                          <Menu.Item> <a onClick={() => {sessionStorage.clear(); props.history.push("/"); }}> Logout </a> </Menu.Item>
                        </Menu>}>
                        <a className="ant-dropdown-link" href="#">
                          {emojify(':rocket:', emojifyOptions)} <Icon type="caret-down" />
                        </a>
                      </Dropdown>
  const AddNewFanny = <Dropdown overlay={
                        <Menu>
                          <Menu.Item key="1" onClick={() => ShowFannyAddModal(true)}> Add New Fannypack </Menu.Item>
                          <Menu.Divider />
                          {props.fannyPackz.map((value, key) => (
                            <Menu.Item key={key} onClick={() => props.changeActiveFannyPack(value)}> 
                              <Tooltip title={JSON.stringify(value)} placement="right" > 
                                <a>{value.fannypack_name} - {value.fannypack_serial}</a>
                              </Tooltip>
                            </Menu.Item>
                          ))}
                        </Menu>}>
                        <Row type="flex" justify="start" align="middle">
                          <Col>
                            <Title level={2} style={{ display: 'inline'}}>
                              {emojify(randomEmoji, emojifyOptions)}
                            </Title>
                          </Col>
                          <Col>
                            <Title level={2} style={{ display: 'inline'}}>
                              <h6 style={{ display: 'inline', fontStyle: 'italic'}}> fannyPack </h6>
                              {props.activeFannyPack.fannypack_name}
                              <Icon type="caret-down" />
                            </Title>
                          </Col>
                        </Row>
                      </Dropdown>
  // Use Effect and pass => props with []
  useEffect(() => {
    // Refresh FannyPack
    setNewFannyPack({...newFannyPack, fannyPack: props.activeFannyPack });
  }, [props.activeFannyPack.fannypack_serial]);
  // FannyPack - View
  return (
    <Row type="flex" justify="center" align="middle" className="card-2 p-1 my-1" style={{overflow: 'hidden', backgroundColor: "#ffffff", zIndex:'1'}}>
      {/* Add newFannyPack Modal */}
      <Modal centered visible={newFannyPack.fannyAddModalVisable}
        onOk={CreateNewFanny}
        onCancel={() => ShowFannyAddModal(false)}
        okText="Create"
        cancelText="Cancel">
          <Title>Create FannyPack {emojify(randomEmoji, emojifyOptions)}</Title>
          <Row type="flex" justify="center" align="middle" className="p-1">
            <Input value={newFannyPack.newFannyPackName} 
              onChange={event => setNewFannyPack({...newFannyPack, newFannyPackName: event.target.value})}
              placeholder="New FannyPack" size="large" type="text"
              prefix={<Icon type="wallet" theme="twoTone" />} allowClear />
          </Row>
      </Modal>
      <Col xs={24} sm={24} md={14} lg={14} xl={14}>
        <Row type="flex" justify="start" align="middle">
          {AddNewFanny}
        </Row>
      </Col>
      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
        <Row type="flex" justify="end" align="middle">
          {AppSetting}
        </Row>
      </Col>
    </Row>
  );
}
export default withRouter(FannyPack);