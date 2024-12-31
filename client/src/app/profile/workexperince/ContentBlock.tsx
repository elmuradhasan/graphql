import React from "react";

interface ContentBlockProps {
  title: string;
  text: string;
  image?: string;
  skills: string;
  time: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  text,
  image,
  skills,
  time,
}) => (
  <div className="flex flex-col md:flex-row items-center justify-between text-justify p-5">
    {image && (
      
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-md w-[200px]  object-contain mb-[20px]"
        />
    )}
    <div className="lg:w-[60%] md:w-[80%] sm:mt-4">
      <h2 className="text-2xl text-gray-800 text-justify mt-[20px] mb-2 lg:mt-0">
        <b>Şirkət: </b>
        {title}
      </h2>
      <p className="text-base leading-7 text-gray-600">{text}</p>
      <span className="text-yellow-400 mb-2">
        <b>Biliklər: </b>
        {skills}
      </span>
      <p className="text-gray-400 mt-2">Müddət: {time}</p>
    </div>
  </div>
);

export default ContentBlock;
