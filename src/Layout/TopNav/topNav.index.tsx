import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, RocketOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="userProfile">User Profile</Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const TopNavBar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>Logo</div>
        <div style={{ marginRight: '20px' }}>Solutions</div>
        <div style={{ marginRight: '20px' }}>Services</div>
        <div style={{ marginRight: '20px' }}>Resources</div>
        <div style={{ marginRight: '20px' }}>Download Center</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
        <div style={{ margin: '0 10px' }}>
          <button>Launch Client</button>
        </div>
        <div>
          <QuestionCircleOutlined style={{ fontSize: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
