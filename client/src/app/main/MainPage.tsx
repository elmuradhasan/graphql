import { Col, Row, Typography } from "antd";
import "./main.style.css";
const MainPage = () => {
  const { Title, Paragraph } = Typography;
  return (
    <>
      <Row justify="space-between" align="middle" className="main-banner">
        <Col lg={12} md={24}>
          <div className="main-banner-content">
            <span>
              Hello, my name is <b>Elmurad</b>
            </span>

            <div className="title">
              <Title level={5}>I am a</Title>
              <Title level={1}>Web Developer</Title>
            </div>

            <Paragraph>
              Creating modern and responsive design for Web and Mobile.
            </Paragraph>
          </div>
        </Col>

        <img
          src="/images/elmurad.jpg"
          style={{ borderRadius: "50%", width: "300px" }}
          alt=""
        />
      </Row>
    </>
  );
};

export default MainPage;
