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
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
      <Layouts collapsed={collapsed} setCollapsed={setCollapsed} />
    </Layout>
  );
};

export default Home;
