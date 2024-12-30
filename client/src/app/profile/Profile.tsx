import { Col, Row } from "antd";
import React from "react";
import ExperienceSteps from "./workexperince/ExperienceSteps";
function Profile() {
  return (
    <Row className="lg:pl-6">
      <Col span={24}>
      <h1 className="text-3xl mb-2 mt-2">İş təcrübəsi</h1>
       <ExperienceSteps />
      </Col>

    </Row>
  );
}

export default Profile;
