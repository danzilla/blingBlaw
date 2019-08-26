import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Menu, Breadcrumb } from 'antd';
// axios-post 
import axios from 'axios';
// App Account Tab
function AppNavigation(props){
  // React-hookz
  const navLabels = {
    accounts: {
      icon: "",
      label: "Account",
      key: "accounts_overview"
    },
    category: {
      icon: "",
      label: "Category and labels",
      key: "category_overview"
    }
  };
  // Active_Labels_nav
  const [activeMenu, setActiveMenu] = useState({
    label: navLabels.accounts.label, activeKey: navLabels.accounts.key
  });
  // - User - Contains FannyPacks
  // - FannyPacks - Contains Account, Account Types and category
  // - Account - Contains Account Statement information
  const menuAccount = (
    <Menu>
      <Menu.Item onClick={() => setActiveMenu({...activeMenu, label: navLabels.accounts.label, activeKey: navLabels.accounts.key })}>
        {navLabels.accounts.icon} {navLabels.accounts.label}
      </Menu.Item>
      <Menu.Item onClick={() => setActiveMenu({...activeMenu, label: navLabels.category.label, activeKey: navLabels.category.key })}>
        {navLabels.category.icon} {navLabels.category.label}
      </Menu.Item>
    </Menu>
  );
  // Display
  return (
    <Breadcrumb.Item overlay={menuAccount}> {activeMenu.label} </Breadcrumb.Item>
  );
}
export default withRouter(AppNavigation);