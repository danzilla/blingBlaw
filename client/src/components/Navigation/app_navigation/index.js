import React, { useState, useEffect, useCallback } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Input, Row, Col, Menu, Icon, Button, Tooltip, Dropdown, message, Select, Breadcrumb } from 'antd';
// axios-post 
import axios from 'axios';
// App user session Nav
function AppNavigation(props){
  // React-hookz
  // Icons
  const [navIcons, setNavIcons] = useState({
    appIcon: "", fannyPackIcon: "", accountIcon: "", categoryIcon: "", overviewIcon: ""
  });
  // appIcon
  const appIcon = [
    ":rocket:",
    ":peach:",
    ":poultry_leg:",
    ":avocado:",
    ":chocolate_bar:",
    ":pancakes:",
    ":pouch:",
    ":purse:",
    ":unicorn:",
    ":moneybag:",
    ":peach:",
    ":poultry_leg:",
    ":avocado:",
    ":chocolate_bar:",
    ":pancakes:"
  ];
  const navLabels = {
    appLabel: {
      icon: emojify(appIcon[Math.floor(Math.random() * appIcon.length)]),
      label: "Blingblaw"
    },
    fannyPack: {
      icon: "",
      label: "FannyPacks"
    },
    accounts: {
      icon: "",
      label: "Account"  
    },
    category: {
      icon: "",
      label: "Category and labels"
    },
    overview: {
      icon: "",
      label: "overview"
    }
  };
  // Active_Labels_nav
  const [activeMenu, setActiveMenu] = useState({
    appLabel: "", fannyPack:"overview_fannyPack", account: "accounts_overview"
  });
  // setActive FannyPack
  const setActiveFannyPack = (whichFanny) => {
    let msg = "whichFanny " + whichFanny;
    message.success(msg, 2.5);
    setActiveMenu({...activeMenu, fannyPack: whichFanny });
  };
  // setActive Account
  const setActiveAccount = (whichAccountOption) => {
    let msg = "whichAccountOption " + whichAccountOption;
    message.success(msg, 2.5);
    setActiveMenu({...activeMenu, account: whichAccountOption });
  };
  // - User - Contains FannyPacks
  // - FannyPacks - Contains Account, Account Types and category
  // - Account - Contains Account Statement information
  const menuFannyPack = (
    <Menu>
      <Menu.Item onClick={() => setActiveFannyPack("add_fannyPack")}> <a>Add new FannyPack</a> </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => setActiveFannyPack("overview_fannyPack")}> <a>FannyPackz overview</a> </Menu.Item>
      <Menu.Item onClick={() => setActiveFannyPack("FannyPack_1")}> <a>FannyPack 1</a> </Menu.Item>
      <Menu.Item onClick={() => setActiveFannyPack("FannyPack_2")}> <a>FannyPack 2</a> </Menu.Item>
    </Menu>
  );
  const menuAccount = (
    <Menu>
      <Menu.Item onClick={() => setActiveAccount("accounts_overview")}>{navLabels.accounts.icon} {navLabels.accounts.label}</Menu.Item>
      <Menu.Item onClick={() => setActiveAccount("category_overview")}>{navLabels.category.icon} {navLabels.category.label}</Menu.Item>
    </Menu>
  );
  // Display
  return (
    <Breadcrumb separator={<Icon type="right" />}>
      <Breadcrumb.Item>
        <span>{navLabels.appLabel.icon} {navLabels.appLabel.label} </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={menuFannyPack}>
        <span>{navLabels.fannyPack.icon} {navLabels.fannyPack.label} </span>
      </Breadcrumb.Item>
      {activeMenu.fannyPack !== "overview_fannyPack" &&
        <Breadcrumb.Item overlay={menuAccount}>
          {activeMenu.account === "accounts_overview" ? (
            <span>{navLabels.accounts.icon} {navLabels.accounts.label} </span>
            ) : (
            <span>{navLabels.category.icon} {navLabels.category.label} </span>
          )}
        </Breadcrumb.Item>
      }
      <Breadcrumb.Item>
        <span>{navLabels.overview.icon} {navLabels.overview.label} </span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
export default withRouter(AppNavigation);