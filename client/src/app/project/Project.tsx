import { Card, Col, Row } from "antd";
import React from "react";

function Projects() {
  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <h2>Skills</h2>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Frontend" bordered={false}>
              React, TypeScript, Tailwind, HTML, CSS
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Backend" bordered={false}>
              Node.js, Express, MongoDB
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Other" bordered={false}>
              Git, REST APIs, Ant Design
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Projects;
