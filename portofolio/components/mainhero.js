import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MainHero() {
  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start md:h-[500px]">
        <div className="w-full mt-40 text-center md:text-left md:pl-10">
          <h1 className="font-semibold text-4xl md:text-5xl mb-2">Hadj Said Bouras</h1>
          <h2 className="text-xl md:text-2xl mb-4">Front-End Web Developer</h2>
          <p className="mb-4 md:max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima similique, voluptatem culpa architecto facere ipsum animi asperiores veniam facilis repellendus corrupti amet! Dicta, perferendis tempore voluptatem ab mollitia recusandae dolores.</p>
          <button className="transition-transform hover:translate-y-1 border-b-2 border-white py-2 px-4 md:text-lg">Contact Me</button>
        </div>
        <div className="mt-10 md:w-1/2 rounded-b-full md:rounded-bl-full rounded-t-full delay-600 transition-all transform hover:translate-y-2 overflow-hidden ">
          <Image src="/p.jpeg" width={400} height={300} alt="dfsa"  className=''/>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="text-white transition-transform hover:translate-x-1 border-b-2 border-white py-2 px-4 md:text-lg">
          <Link href={'/projects'}>See Projects {'>>'}</Link>
        </button>
      </div>
    </div>
  );
}

export default MainHero;
