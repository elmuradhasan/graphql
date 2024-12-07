import React from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import { Row } from "antd";

function App() {
  return (
    <>
      <Row style={{ flexDirection: "column", alignItems: "center" }}>
        <h2>İstifadəçi Formu</h2>
        <AddUser />
        <UserList />
      </Row>
    </>
  );
}

export default App;
