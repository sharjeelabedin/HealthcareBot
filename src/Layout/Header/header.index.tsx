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
        {/* <Input
          style={{ background: "#393d3e", border: "none", color: "white" }}
          prefix={
            <SearchOutlined
              style={{ color: "white", fontSize: "18px", marginRight: "10px" }}
            />
          }
          placeholder="Type to search ..."
        /> */}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "20px" }}>
          <CalendarOutlined
            style={{ fontSize: "20px", margin: "0 0px", color: "white" }}
          />
        </div>
        <div style={{ marginRight: "20px" }}>
          <Badge count={3}>
            <MailOutlined
              style={{ fontSize: "20px", margin: "0 0px", color: "white" }}
            />
          </Badge>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Badge count={7}>
            <MessageOutlined
              style={{ fontSize: "20px", margin: "0 00px", color: "white" }}
            />
          </Badge>
        </div>
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
                Omer Naveed
              </div>
              <div
                style={{ marginRight: "8px", color: "white", fontSize: "12px" }}
              >
                Consultant
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
