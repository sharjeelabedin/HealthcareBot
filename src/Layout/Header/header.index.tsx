import React from "react";
import { Layout, Input, Menu, Dropdown, Avatar, Badge } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  MessageOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./header.index.css";
import { useNavigate } from "react-router-dom";
import Logo from "Assets/images/Logo.png";

const { Header } = Layout;



const HeaderLayout = () => {
  const navigate = useNavigate();
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={()=>{navigate("/")}}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#393d3e",
        justifyContent: "space-between",
        paddingLeft:'10px',
        paddingRight:'10px'
      }}
    >
      <div
        className={"header"}
        style={{ display: "flex", alignItems: "center" }}
        
      >
        {/* <img
            src={Logo}
            alt=""
            height={40}
            style={{marginLeft:"0.75rem"}}
            // style={{  marginBottom: "-40px" }}
          /> */}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        
        <Dropdown overlay={menu} placement="bottomRight">
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <div>
              <div
                style={{
                  marginRight: "8px",
                  color: "white",
                  marginBottom: "-45px",
                  fontSize: "13px",
                }}
              >
                Michel Tom
              </div>
              <div
                style={{ marginRight: "8px", color: "white", fontSize: "12px" }}
              >
                Doctor
              </div>
            </div>

            <Avatar
              style={{ height: "40px", width: "40px" }}
              icon={
                <UserOutlined style={{ marginTop: "5px", fontSize: "25px" }} />
              }
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderLayout;
