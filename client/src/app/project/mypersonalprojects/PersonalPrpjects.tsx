import React, { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Vebsayt",
    description: "İlk yazdığım sadə vebsayt, digər lahiyələrə buradan baxa bilərsiz",
    href: "https://elmuradhasan.github.io/myportfolio/",
    category: "Frontend",
    tags: ["Html", "CSS", "Js", "Jquery"],
  },
  {
    title: "E-commerce Platforma",
    description: "E-commerce platforma bir çox funksionallıq var",
    href: "https://surpriseaz.netlify.app/",
    category: "Full-Stack",
    tags: ["Html", "Css", "Js", "React", "React-toolkit"],
  },
  {
    title: "DigitSell App",
    description: "Satış mərkəzləri üçün yazılmış demo vebsayt.",
    href: "https://example.com",
    category: "Frontend",
    tags: ["React", "Tailwind", "CSS"],
  },
  {
    title: "Kontaktim az",
    description: "Kontaklara baxa, əlavə edə, silə bilərsiz.",
    href: "https://kontaktimaz.netlify.app/",
    category: "Full-Stack",
    tags: ["Html", "Css", "Js", "React", "React-toolkit","Node.js", "Express", "MongoDB"],
  },
  {
    title: "Bank Respublika Proyekti",
    description: "İşə qəbul tapşırığı.",
    href: "https://bankrespublikaproject.netlify.app/",
    category: "Full-Stack",
    tags: ["Html", "Css", "Js", "React", "React-toolkit","Node.js", "Express", "MongoDB"],
  },
];


const categories = ["Hamısı", "Frontend", "Full-Stack"];

const PersonalProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");

  const filteredProjects =
    selectedCategory === "Hamısı"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="container mx-auto p-0 lg:p-4 mt-4">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Mənim Lahiyələrim</h1>
        <div className="mt-4 md:mt-0">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-2 text-sm md:text-base rounded-md ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } mr-2 mb-2 md:mb-0`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            className="relative text-white rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-4 flex flex-col h-[200px]">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-blue-600">
                {project.title}
              </h2>
              <p className="text-sm md:text-base mb-4 text-gray-800 flex-grow">
                {project.description}
              </p>
              <a
                href={project.href}
                className="text-blue-600 hover:underline mb-4 d-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lahiyəyə bax
              </a>
              <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-green-600 text-xs md:text-sm text-white rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            </div>
        
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PersonalProjects;
