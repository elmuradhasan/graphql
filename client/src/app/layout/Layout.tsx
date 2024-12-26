import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice"; // Ensure saveInfo is imported
import MainPage from "../main/MainPage";
import Profile from "../profile/Profile";
import Projects from "../project/Project";
import { RootState } from "../../store/store";
import { saveInfo } from "../../slices/userSlice";
import Movies from "../movies/Movies";

const { Header, Content } = Layout;

const Layouts: React.FC<{ collapsed: boolean; setCollapsed: any }> = ({
  collapsed,
  setCollapsed,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, username } = useSelector((state: RootState) => state.user);

  // Load user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, email } = JSON.parse(storedUser);
      dispatch(saveInfo({ username, email })); // Restore user info in Redux store
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user"); // Clear user data from localStorage
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
          <span>{username}</span>
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
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Layouts;
