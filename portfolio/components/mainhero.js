import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MainHero() {
  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start md:h-[500px]">
        <div className="w-full mt-40 text-center md:text-left md:pl-20">
          <h1 className="font-semibold text-4xl md:text-5xl mb-2">Hadj Said Bouras</h1>
          <h2 class="text-xl md:text-2xl mb-4 font-semibold ">Front-End <span class="border-b-8 border-r-8 hover:bg-purple-500 delay-300 transition-all ease-in-out rounded-r-full hover:rounded-t-full hover:border-none border-blue-500 p-1">Web Developer</span></h2>

          <p className="mb-4 md:max-w-lg">Highly motivated web developer with an incredible passion for development, I thrive on
creating innovative, user-friendly web solutions that not only meet client needs but also push
the boundaries of what's possible in the digital world, driven by the belief that every line of code
can shape a better online experience.</p>
          <button className="transition-transform hover:translate-y-1 border-b-2 border-white py-2 px-4 md:text-lg"><Link href={'/contact'}>Contact Me</Link></button>
        </div>
        <div className=" md:w-2/3 rounded-b-full md:rounded-bl-full rounded-t-full delay-600 transition-all transform hover:translate-y-2 overflow-hidden ">
          <Image src="/user.png" width={700} height={300} alt="dfsa"  className='text-white'/>
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
