import React from "react";
// import UserList from "./components/UserList";
import Login from "./components/Login";
import { Row } from "antd";

function App() {
  return (
    <>
      <Row style={{ flexDirection: "column", alignItems: "center" }}>
        <h2>İstifadəçi Formu</h2>
        <Login />
      </Row>
    </>
  );
}

export default App;
