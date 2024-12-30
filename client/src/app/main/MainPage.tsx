import { Col, Row } from "antd";

const MainPage = () => {
  return (
    <>
      <Row className="min-h-[75vh] justify-center items-center lg:p-6">
        <Col
          xs={24} sm={24} md={24} lg={12} // Define column widths for different screen sizes
          className="text-center lg:text-left w-full px-4 mb-6 lg:mb-0"
        >
          <span className="block text-lg lg:text-xl text-blue-600 lg:mb-4">
            Salam, mənim adım <b>Elmuraddır</b>
          </span>

          <div className="relative w-full h-[240px] text-center flex flex-col justify-center items-center py-8 lg:mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center mt-[20px]"
              style={{ backgroundImage: `url('/images/paper-shape.png')` }}
            ></div>

            <div className="relative z-10">
              <h5 className="text-xl lg:text-2xl font-serif text-white rotate-[-8deg] mb-2">
                Mən
              </h5>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white rotate-[-6deg]">
                Veb Developerəm
              </h1>
            </div>
          </div>

          <p className="text-gray-700 text-base sm:text-lg lg:text-lg lg:mt-[50px] px-4 sm:px-0">
            React, və digər müasir veb texnologiyaları ilə işləyərək yaradıcı və
            istifadəçi dostu veb tətbiqləri hazırlayıram
          </p>
        </Col>

        <Col
          xs={24} sm={24} md={24} lg={12} // This is for the image column to take 12 on large screens
          className="flex justify-center lg:justify-center"
        >
          <img
            src="/images/main.svg"
            alt="Illustration"
            className="w-full md:w-80 lg:w-[500px] object-contain"
          />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
