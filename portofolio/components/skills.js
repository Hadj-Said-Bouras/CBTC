import React from 'react';

function SkillSet() {
  return (
    <div className="flex flex-col items-center mt-20">
      <p className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white text-center">
        Gallery of Gifts
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <SkillItem color="bg-blue-600" border="border-blue-800">
          NextJS
        </SkillItem>
        <SkillItem color="bg-green-600" border="border-green-800">
          ReactJS
        </SkillItem>
        <SkillItem color="bg-yellow-600" border="border-yellow-800">
          Tailwind CSS
        </SkillItem>
        <SkillItem color="bg-purple-600" border="border-purple-800">
          Bootstrap
        </SkillItem>
        <SkillItem color="bg-red-600" border="border-red-800">
          HTML
        </SkillItem>
        <SkillItem color="bg-pink-600" border="border-pink-800">
          CSS
        </SkillItem>
        <SkillItem color="bg-indigo-600" border="border-indigo-800">
          JavaScript
        </SkillItem>
        <SkillItem color="bg-gray-600" border="border-gray-800">
          Git
        </SkillItem>
        <SkillItemSoon color="bg-orange-600" border="border-orange-800">
          TypeScript
        </SkillItemSoon>
      </div>
      <div className="flex flex-col items-center mt-12">
        <p className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white text-center">
          Other Skills
        </p>
        <div className="flex flex-wrap gap-6 justify-center ">
          <SkillItem color="bg-teal-600" border="border-teal-800">
            FB ADS
          </SkillItem>
          <SkillItem color="bg-cyan-600" border="border-cyan-800">
            Excel
          </SkillItem>
          <SkillItem color="bg-lime-600" border="border-lime-800">
            Photoshop
          </SkillItem>
          <SkillItem color="bg-blue-600" border="border-blue-800">
            Video Editing
          </SkillItem>
          <SkillItem color="bg-rose-600" border="border-rose-800">
            Copywriting
          </SkillItem>
        </div>
      </div>
    </div>
  );
}

function SkillItem({ children, color, border }) {
  return (
    <h1
      className={`px-6 py-3 text-lg font-semibold text-white rounded-full shadow-md ${color} ${border} transform transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      {children}
    </h1>
  );
}

function SkillItemSoon({ children, color, border }) {
  return (
    <h1
      className={`relative px-6 py-3 text-lg font-semibold text-white rounded-full shadow-md ${color} ${border} transform transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      {children}
      <span className="absolute top-0 right-0 px-2 py-1 ml-2 -mt-2 text-xs font-semibold tracking-wider text-white bg-gray-800 bg-opacity-80 rounded-full">
        Soon
      </span>
    </h1>
  );
}

export default SkillSet;
