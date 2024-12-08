import React, { Dispatch, SetStateAction, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
interface HomeProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false); // Update authentication state
    navigate("/login"); // Redirect to Login
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
          <Button type="primary" onClick={handleLogout}>
            Cixis edin
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
