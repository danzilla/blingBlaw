import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Layout, Menu, Affix } from 'antd';
import { message, Button } from 'antd';
import { Avatar, Badge, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import {
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { SmileTwoTone, HeartTwoTone, FireTwoTone, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

let colors = ["#FF3E96", "#EE3A8C", "#CD3278", "#8B2252", "#FF69B4", "#EE6AA7", "#CD6090", "#8B3A62", "#872657", "#FF1493", "#CD1076", "#FF34B3", "#EE30A7", "#DA70D6"]
let randomColors = colors[Math.floor(Math.random() * colors.length)]; const { SubMenu } = Menu;

const Navigation = () => {
  const [toggleCollapsed, setToggleCollapsed] = useState('false');


  
  return (
    <Affix offsetTop={2}>
      <Sider collapsed={toggleCollapsed} onCollapse={() => setToggleCollapsed(!toggleCollapsed)}>
      
        <Menu
          defaultSelectedKeys={['0']}
          defaultOpenKeys={['']}
          mode="inline"
          theme="dark"
          inlineCollapsed={toggleCollapsed}>
          
          {/* Logo */}
          <Button
            style={{ height: '60px'}}
            size={'large'}
            type="primary" 
            block onClick={() => setToggleCollapsed(!toggleCollapsed)}>
              {toggleCollapsed 
                ? <span><FireTwoTone style={{fontSize: 30}} twoToneColor={randomColors} /></span> 
                : <span><FireTwoTone style={{fontSize: ""}} twoToneColor={randomColors} /> BlingBlaw</span>
              }
          </Button>

          <SubMenu
            key="FannyPack_overview"
            title={ <span> <ContainerOutlined /> <span>FannyPack_overview</span> </span> }>
            <Menu.Item key="1">FannyPack_overview</Menu.Item>
            <Menu.Item key="2">FannyPack_2</Menu.Item>
            <Menu.Item key="3">FannyPack_3</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="FannyPack_Config">Account_Config</Menu.Item>
          </SubMenu>
          <SubMenu
            key="Account_Overview"
            title={ <span> <DesktopOutlined /> <span>Account_Overview</span> </span> }>
            <Menu.Item key="9">Account_Overview</Menu.Item>
            <Menu.Item key="10">Account_Record</Menu.Item>
            <Menu.Item key="11">Account_Type</Menu.Item>
            <Menu.Item key="12">Account_Category</Menu.Item>
          </SubMenu>
          <SubMenu
            key="Review"
            title={ <span> <PieChartOutlined /> <span>Review</span></span> }>
            <Menu.Item key="9">Account_Overview</Menu.Item>
            <Menu.Item key="10">Account_Record</Menu.Item>
            <Menu.Item key="11">Account_Type</Menu.Item>
            <Menu.Item key="12">Account_Category</Menu.Item>
          </SubMenu>

          <Menu.Divider />
          <Menu.Item key="1213">
            <PieChartOutlined /><span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="1313">
            <PieChartOutlined /><span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="11313">
            <PieChartOutlined /><span>Option 1</span>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item key="11133">
            <PieChartOutlined /><span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="11213">
            <PieChartOutlined /><span>Option 1</span>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item key="1143">
            <PieChartOutlined /><span>Option 1</span>
          </Menu.Item>

        </Menu>

      </Sider>
    </Affix>
  );
};

export default Navigation;
