import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React from "react";

function Profile() {
  return (
    <Timeline
    items={[
      {
        children: 'Bank Respublika',
        color: 'green',
      },
      {
        children: 'İnformasiya Texnologiyaları İnistitutu',
      },
      {
        dot: <ClockCircleOutlined className="timeline-clock-icon" />,
        color: 'red',
        children: 'Hərbi Xidmət',
      },
      {
        children: 'Prospect Clould ERP',
      },
    ]}
  />
  );
}

export default Profile;
