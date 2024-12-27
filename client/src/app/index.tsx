import React, { useState } from "react";
import {
  FolderOpenOutlined,
  HomeOutlined,
  LaptopOutlined,
  UserOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import Layouts from "./layout/Layout";

const { Sider } = Layout;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ backgroundColor: "#cfe2ff" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "fixed",  // Make it fixed on the left side
          top: 0,
          left: 0,
          bottom: 0,
          height: "100vh",  // Full height of the viewport
          zIndex: 100,  // Make sure it stays on top
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]} // Set active menu item based on current path
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Əsas səhifə",
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Elmurad Həsənov",
            },
            {
              key: "/projects",
              icon: <LaptopOutlined />,
              label: "Lahiyələr",
            },
            {
              key: "/lessons",
              icon: <FolderOpenOutlined />,
              label: "Dərslər",
            },
            {
              key: "/contact",
              icon: <WechatWorkOutlined />,
              label: "Əlaqə",
            },
          ]}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200, // Adjust based on whether the sidebar is collapsed or not
          transition: "margin-left 0.3s",  // Smooth transition for margin change
        }}
      >
        <Layouts collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
    </Layout>
  );
};

export default Home;
