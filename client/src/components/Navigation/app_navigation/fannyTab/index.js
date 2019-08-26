import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Menu, Breadcrumb, Modal } from 'antd';
// App Fanny Tab
function AppNavigation(props){
  // React-hookz
  const navLabels = {
    fannyPack: {
      icon: "",
      label: "FannyPacks overview",
      key: "overview_fannyPack"
    }
  };
  const [activeAddFannyPack, setActiveAddFannyPack] = useState(false);
  const showModal = () => { setActiveAddFannyPack(true); };
  const handleOk = e => { setActiveAddFannyPack(false); };
  const handleCancel = e => { setActiveAddFannyPack(false);};

  // Active_Labels_nav
  const [activeMenu, setActiveMenu] = useState({
    label: navLabels.fannyPack.label, activeKey: navLabels.fannyPack.key
  });
  // - User - Contains FannyPacks
  // - FannyPacks - Contains Account, Account Types and category
  // - Account - Contains Account Statement information
  let data = Array.from(props.userFannyPacks.userFannyPacks);
  let menuFannyPack = (
      <Menu>
        <Menu.Item onClick={() => showModal()}> <a>Add new FannyPack</a> </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => setActiveMenu({...activeMenu, label: navLabels.fannyPack.label, activeKey: navLabels.fannyPack.key })}> <a>FannyPackz overview</a> </Menu.Item>
        {data.map((value, index) => {
          return <Menu.Item key={index} onClick={() => setActiveMenu({...activeMenu, label: value.fannypack_name, activeKey: value.fannypack_serial })}> <a> FannyPack: {value.fannypack_name}</a> </Menu.Item>
        })}
      </Menu>);
  useEffect(() => {
    data = Array.from(props.userFannyPacks.userFannyPacks);
  });
  // Display
  return (
    <Breadcrumb.Item overlay={menuFannyPack}> 
      {activeMenu.label} 
      <Modal
        title="Basic Modal"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={activeAddFannyPack}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Breadcrumb.Item>
  );
}
export default withRouter(AppNavigation);