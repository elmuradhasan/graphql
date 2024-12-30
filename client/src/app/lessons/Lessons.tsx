import { Progress } from 'antd';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiRedux, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiTypescript 
} from 'react-icons/si';
import React from 'react';
import { YoutubeOutlined } from '@ant-design/icons';

function Lessons() {
  const modules = [
    {
      month: '1-ci ay',
      title: 'HTML və CSS',
      description: 'Veb səhifələrin strukturunu yaratmaq və dizayn etmək. Responzivlik və grid sistemləri öyrənilir.',
      progress: 20,
      icon: <SiHtml5 className="text-[#E34F26] text-4xl" />,
    },
    {
      month: '2-ci ay',
      title: 'JavaScript əsasları',
      description: 'Dəyişənlər, funksiyalar, dövrlər, DOM manipulyasiyası və event-lərlə işləmə.',
      progress: 40,
      icon: <SiJavascript className="text-[#F7DF1E] text-4xl" />,
    },
    {
      month: '3-cü ay',
      title: 'React əsasları',
      description: 'Komponent əsaslı arxitektura, state və props, React hook-ları, və formaların idarə olunması.',
      progress: 60,
      icon: <SiReact className="text-[#61DAFB] text-4xl" />,
    },
    {
      month: '4-cü ay',
      title: 'Redux və Redux Toolkit',
      description: 'State idarəetməsi, Redux Toolkit, middleware-lər və async axınlar.',
      progress: 80,
      icon: <SiRedux className="text-[#764ABC] text-4xl" />,
    },
    {
      month: '5-ci ay',
      title: 'Tailwind CSS və UI Dizayn',
      description: 'Tailwind CSS ilə UI dizaynları yaratmaq, hazır şablonlardan istifadə və optimizasiya.',
      progress: 90,
      icon: <SiTailwindcss className="text-[#06B6D4] text-4xl" />,
    },
    {
      month: '6-cı ay',
      title: 'Qabaqcıl React və Layihə',
      description: 'Performans optimizasiyası, React Router, və tam funksional bir layihənin hazırlanması.',
      progress: 100,
      icon: <SiReact className="text-[#61DAFB] text-4xl" />,
    },
  ];

  const additionalModules = [
    {
      title: 'Next.js və TypeScript',
      description: 'SSR, SSG, API routes və TypeScript ilə typing. Daha müasir texnologiyalar öyrənilir.',
      youtube:'Youtube_da paylaşdığım nümunə dərsimə keçid edib baxa bilərsiz)',
      icons: (
        <>
          <SiNextdotjs className="text-black text-4xl" />
          <SiTypescript className="text-[#007ACC] text-4xl ml-3" />
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">Kurs Proqramı:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
            <div className="flex items-center mb-4">
              {module.icon}
              <h3 className="ml-4 text-xl font-semibold">{module.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <Progress percent={module.progress} />
          </div>
        ))}
      </div>

      <div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">Əlavə Təklif</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {additionalModules.map((module, index) => (
      <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="flex items-center mb-4">{module.icons}</div>
        <p className="text-gray-600">{module.description}</p>
        <p className='mt-[50px] flex justify-center'><YoutubeOutlined className='text-red-600 text-6xl '/></p>
        <p className="text-red-600 mt-[100px]">{module.youtube}</p>
      </div>
    ))}

    {/* Add the iframe as another grid item */}
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <iframe
        src="https://www.youtube.com/embed/WPEUdSxYcmQ?si=OGOnwkWonswjO9d9&amp;controls=0" // Replace with your desired URL
        title="Əlavə Təklif "
        className="w-full h-64 md:h-96 border rounded-lg"
      ></iframe>
    </div>
  </div>
</div>

      
    </div>
  );
}

export default Lessons;
