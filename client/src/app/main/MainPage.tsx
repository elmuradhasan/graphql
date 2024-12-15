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
import { logout } from "../../slices/authSlice";
import Profile from "../profile/Profile";
import Projects from "../project/Project";

const { Header, Sider, Content } = Layout;

const MainPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "#f0f2f5",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
        Hi, I'm a Web Developer
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        I create modern and responsive web applications.
      </p>
      <Button type="primary" size="large" style={{ marginTop: "20px" }}>
        View My Work
      </Button>
    </div>
  );
};

export default MainPage;
