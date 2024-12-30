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
import { logout } from "../../slices/authSlice";
import MainPage from "../main/MainPage";
import Profile from "../profile/Profile";
import Projects from "../project/Project";
import { RootState } from "../../store/store";
import { saveInfo } from "../../slices/userSlice";
import Contact from "../contact/Contact";
import Lessons from "../lessons/Lessons";

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

  // Track window size
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setCollapsed(true); // Collapse the sidebar on mobile devices
    } else {
      setCollapsed(false); // Expand the sidebar on larger screens
    }
  }, [windowWidth, setCollapsed]);

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: collapsed ? "80px" : "200px", // Adjust for Sider
          transition: "left  0.3s", 
          width: collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)", // Dynamic width
          zIndex: 1000,
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          disabled={windowWidth < 768 ? true : false}
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
          margin: "80px 0px 24px",
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lessons" element={<Lessons />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Layouts;
