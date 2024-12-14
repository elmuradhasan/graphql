import React, { Dispatch, SetStateAction, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  message,
  Space,
  theme,
} from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import Profile from "./Profile";
import Projects from "./Project";

const { Header, Sider, Content } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to Login
  };
  const items: MenuProps["items"] = [
    {
      key: "",
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined /> Çıxış edin{" "}
        </span>
      ),
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const notify = () => toast.error("This is a toast notification !");
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Elmurad Həsənov",
            },
            {
              key: "/projects",
              icon: <VideoCameraOutlined />,
              label: "Lahiyələr",
            },

            {
              key: "/lessons",
              icon: <UserOutlined />,
              label: "Dersler",
            },
            {
              key: "/contact",
              icon: <VideoCameraOutlined />,
              label: "Elaqe",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Dropdown.Button
            menu={menuProps}
            style={{
              cursor: "pointer",
              width: "min-content",
              marginRight: "16px",
            }}
          >
            <UserOutlined />
          </Dropdown.Button>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
