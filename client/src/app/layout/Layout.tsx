import React, { useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import MainPage from "../main/MainPage";
import Profile from "../profile/Profile";
import Projects from "../project/Project";

const { Header, Content } = Layout;

const Layouts = () => {
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
  const handleMenuClick: MenuProps["onClick"] = (e) => {};

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
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
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Layouts;
