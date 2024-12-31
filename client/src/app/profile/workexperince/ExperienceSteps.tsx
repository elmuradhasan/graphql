import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import ContentBlock from './ContentBlock';

const steps = [
  {
    title: 'PC ERP',
    content: (
      <ContentBlock 
        title="Prospect Cloud ERP"
        text="İlk dəfə Frontend üzrə təcrübə proqramına qoşulmuşam. Bu müddət ərzində React və JavaScript biliklərimi inkişaf etdirmişəm. Təcrübə proqramı 3 ay davam edib və müxtəlif layihələrdə iştirak etmişəm. Burada əsas diqqət veb tətbiqlərin hazırlanması və inkişaf etdirilməsi olub."
        image="images/main.svg"
        skills="HTML, CSS, JavaScript, React"
        time = "07.2022 - 10.2022"
      />
    ),
  },
  {
    title: 'AMEA',
    content: (
      <ContentBlock 
        title="AMEA"
        text="Azərbaycan Milli Elmlər Akademiyasının İnformasiya Texnologiyaları İnstitutunda çalışdığım müddət ərzində İnstitutun veb saytının dəstəklənməsi və eyni zamanda maşın öyrənmə metodlarının araşdırılması ilə məşğul olmuşam. Elm və texnologiya sahəsində innovativ layihələrdə iştirak edərək biliklərimi genişləndirmişəm."
        image="images/amea.png"
        skills="HTML, CSS, JavaScript, React"
        time = "10.2021 - 11.2022"
      />
    ),
  },
  {
    title: 'Bank Respublika',
    content: (
      <ContentBlock 
        title="Bank Respublika"
               text="Hal-hazırda Bank Respublika-da Frontend developer olaraq fəaliyyət göstərirəm. Burada internet bankçılıq və açıq bankçılıq layihələrində çalışıram. İşim çərçivəsində təhlükəsizlik, istifadəçi təcrübəsi və müasir texnologiyaların tətbiqi ilə bağlı yeniliklər etmişəm.
       Əvvəlcə Cortech komandasında müştərilər və hesablar modulunda çalışmışam. Hal-hazırda isə intra banking komandasında işləyirəm. Burada HTML, CSS, JavaScript, React, Node.js, Typescript, React Toolkit, Redux, Zustand, Yup, GraphQL və digər texnologiyalardan istifadə edirəm."
        image="images/bank_respublika_logo.jpg"
        skills="HTML, CSS, JavaScript, React, Node.js, Redux, Zustand, GraphQL"
        time = "11.2022 - 07.2023 ( hərbi xidmət ) 07.2024 - indi"
      />
    ),
  },
  {
    title: 'Software Village',
    content: (
      <ContentBlock 
        title="Software Village"
        text="Software Village-də təlimçi kimi fəaliyyət göstərirəm. Burada, qruplar halında olan tələbələrə HTML, CSS, JavaScript, React, Git və TypeScript texnologiyalarını öyrədirəm. Təlimlər zamanı tələbələrin həm nəzəri biliklərə, həm də praktiki bacarıqlara yiyələnməsinə diqqət yetirirəm. Müasir texnologiyaların tətbiqi və proqram təminatı inkişafı sahəsində tələbələrin peşəkar səviyyədə yetişməsi üçün töhfə verirəm. Təlimlərim real layihələr üzərində işləmək imkanı ilə iştirakçıların təcrübəsini daha da artırır və onların karyera inkişafına dəstək olur.."
        image="images/sofware.jpg"
        skills="HTML, CSS, JavaScript, React"
         time = "11.2024 - indi"
      />
    ),
  },

];

const ExperienceSteps: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  return (
    <div>
      <Steps current={current} items={steps.map((item) => ({ key: item.title, title: item.title }))} />
      <div className="mt-4 lg:p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-md min-h-[200px]">
        {steps[current].content}
      </div>
      <div className="mt-6 text-left">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} className="mr-2 p-[20px]">
            Növbəti
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Daha da zirvələri görmək ümidi ilə')}
            className="mr-2 p-[20px]"
          >
            Bitdi
          </Button>
        )}
        {current > 0 && (
          <Button onClick={prev} className="mr-2 p-[20px]">
            Əvvəlki
          </Button>
        )}
          <Button className="mr-2 p-[20px]">
          <a
                    href="./images/ElmuradHasanovlastcv.pdf"
                    download="ElmuradHasanov"
                    >Download Cv</a>
          </Button>
      </div>

    </div>
  );
};

export default ExperienceSteps;
