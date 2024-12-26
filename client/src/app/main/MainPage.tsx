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
              Salam, mənim adım  <b>Elmuraddır</b>
            </span>

            <div className="title">
              <Title level={5}>Mən</Title>
              <Title level={1}>Veb Developerəm</Title>
            </div>

            <p className="myService">
            React, və digər müasir veb texnologiyaları ilə işləyərək yaradıcı və istifadəçi dostu veb tətbiqləri hazırlayıram
            </p>
          </div>
        </Col>

  {/*   <div className="carousel-container">
   <div className="carousel-item">
      <img src="/images/4.gif" alt="Frontend" className="carousel-image" />
    </div>
    <div className="carousel-item">
      <img src="/images/images.gif" alt="Frontend 2" className="carousel-image" />
    </div>
    <div className="carousel-item">
      <img src="/images/2.gif" alt="Frontend 3" className="carousel-image" />
    </div>
    <div className="carousel-item">
      <img src="/images/1.gif" alt="Frontend 4" className="carousel-image" />
    </div>
  </div> */}
  <img src="/images/web.svg" alt="" width={400} style={{objectFit:"initial"}}/>

      </Row>
    </>
  );
};

export default MainPage;
