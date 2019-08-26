import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Icon, message, Breadcrumb } from 'antd';
// Tabs for Navigation
import FannyPackTab from './fannyTab';
import AccountTab from './accountTab';
// App user session Nav
function AppNavigation(props){
  // React-hookz
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
      label: "Blingblaw",
      key: "app_label"
    }
  };


  // Active_Labels_nav
  const [viewFannyOverview, setViewFannyOverview] = useState("overview_fannyPack");
  // view FannyPacks's Accounts and category
  const viewFannyAccountMenu = (e) => {
    // setNavCurrentPosition(e.key);
    setViewFannyOverview(e);
  };
  // Display
  return (
    <Breadcrumb separator={<Icon type="right" />}>
      <Breadcrumb.Item><span>{navLabels.appLabel.icon} {navLabels.appLabel.label} </span></Breadcrumb.Item>
      <FannyPackTab userFannyPacks={props.userFannyPacks} viewFannyAccountMenu={viewFannyAccountMenu} />
      <AccountTab />
    </Breadcrumb>
  );
}
export default withRouter(AppNavigation);