import { Progress, Card, Col, Row } from 'antd';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiRedux, SiTailwindcss, SiNextdotjs, SiTypescript } from 'react-icons/si';
import React from 'react';

function Lessons() {
  const modules = [
    {
      month: '1-ci ay',
      title: 'HTML və CSS',
      description: 'Veb səhifələrin strukturunu yaratmaq və dizayn etmək. Responzivlik və grid sistemləri öyrənilir.',
      progress: 20,
      icon: <SiHtml5 style={{ color: '#E34F26', fontSize: '2rem' }} />,
    },
    {
      month: '2-ci ay',
      title: 'JavaScript əsasları',
      description: 'Dəyişənlər, funksiyalar, dövrlər, DOM manipulyasiyası və event-lərlə işləmə.',
      progress: 40,
      icon: <SiJavascript style={{ color: '#F7DF1E', fontSize: '2rem' }} />,
    },
    {
      month: '3-cü ay',
      title: 'React əsasları',
      description: 'Komponent əsaslı arxitektura, state və props, React hook-ları, və formaların idarə olunması.',
      progress: 60,
      icon: <SiReact style={{ color: '#61DAFB', fontSize: '2rem' }} />,
    },
    {
      month: '4-cü ay',
      title: 'Redux və Redux Toolkit',
      description: 'State idarəetməsi, Redux Toolkit, middleware-lər və async axınlar.',
      progress: 80,
      icon: <SiRedux style={{ color: '#764ABC', fontSize: '2rem' }} />,
    },
    {
      month: '5-ci ay',
      title: 'Tailwind CSS və UI Dizayn',
      description: 'Tailwind CSS ilə UI dizaynları yaratmaq, hazır şablonlardan istifadə və optimizasiya.',
      progress: 90,
      icon: <SiTailwindcss style={{ color: '#06B6D4', fontSize: '2rem' }} />,
    },
    {
      month: '6-cı ay',
      title: 'Qabaqcıl React və Layihə',
      description: 'Performans optimizasiyası, React Router, və tam funksional bir layihənin hazırlanması.',
      progress: 100,
      icon: <SiReact style={{ color: '#61DAFB', fontSize: '2rem' }} />,
    },
  ];

  const additionalModules = [
    {
      title: 'Next.js və TypeScript',
      description: 'SSR, SSG, API routes və TypeScript ilə typing. Daha müasir texnologiyalar öyrənilir.',
      icons: (
        <>
          <SiNextdotjs style={{ color: '#000000', fontSize: '2rem' }} />
          <SiTypescript style={{ color: '#007ACC', fontSize: '2rem', marginLeft: '10px' }} />
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{marginBottom:"30px"}}>Kurs Proqramı:</h2>
      <Row gutter={[16, 16]}>
        {modules.map((module, index) => (
          <Col span={8} key={index}>
            <Card title={module.month} bordered={true}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {module.icon}
                <h3 style={{ marginLeft: '10px' }}>{module.title}</h3>
              </div>
              <p>{module.description}</p>
              <Progress percent={module.progress} />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '50px' }}>
        <h2>Əlavə Təklif</h2>
        <Row gutter={[16, 16]}>
          {additionalModules.map((module, index) => (
            <Col span={8} key={index}>
              <Card title={module.title} bordered={true}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {module.icons}
                </div>
                <p>{module.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Lessons;
