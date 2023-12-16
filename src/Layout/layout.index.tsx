import MainHeader from "./Header/header.index";
import { Layout } from "antd";
import SubHeader from "./SubHeader/subheader.index";
import style from "./layout.module.css";
import React, { ReactElement } from "react";
import SideNav from "./SideNav/sideNav.index";
import TopNavBar from "./TopNav/topNav.index";
// import { Content } from "antd/es/layout/layout";
const { Content } = Layout;

const MainLayout = ({ children }: any): ReactElement => {
  return (
    <>
<TopNavBar/>
            
      <Layout style={{ minHeight:  "calc(100vh - 80px)" }}>
        
        <SideNav />
        <Layout className="site-layout">
          <Content >
            <SubHeader />
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
