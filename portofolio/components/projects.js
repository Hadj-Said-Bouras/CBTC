import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProjectsComponent() {
  return (
    <div className='h-screen'>
      <h1 className='text-center mt-20 text-4xl font-semibold text-white'>Chosen Projects</h1>
      <div className='flex flex-row flex-wrap gap-10 justify-center mt-20 h-full'>
        <div className='relative w-[350px] h-[240px] bg-black flex justify-center hover:scale-1'>
          
            <div className='brightness-75 

w-full h-full  overflow-hidden'>
              <Image src='/shareity.png'
                sizes="400px"
                style={{
                  width: '100%',
                  height: '240px',
                }}
                
                width={200}
                height={300}
                alt='shareity'
              />
            </div>
                           <div className='absolute text-white  bottom-0 m-2'>

                  <Link href={'/'} className='text-xl animate-pulse'>See Project {`>>`}</Link>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus veritatis assumenda nesciunt.</p>
            </div>
        </div>
        <div className='relative w-[350px] h-[240px] bg-black flex justify-center hover:scale-1'>
          
            <div className='brightness-75 

w-full h-full  overflow-hidden'>
              <Image src='/SpaceWebsite.png'
                sizes="400px"
                style={{
                  width: '100%',
                  height: '240px',
                }}
                
                width={200}
                height={300}
                alt='SpaceWebsite'
              />
            </div>
            <div className='absolute text-white  bottom-0 m-2'>

                  <Link href={'/'} className='text-xl animate-pulse'>See Project {`>>`}</Link>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus veritatis assumenda nesciunt.</p>
            </div>
        </div>
        <div className='relative w-[350px] h-[240px] bg-black flex justify-center hover:scale-1'>
          
            <div className='brightness-75 

w-full h-full  overflow-hidden'>
              <Image src='/WebPortfolio.png'
                sizes="400px"
                style={{
                  width: '100%',
                  height: '240px',
                }}
                
                width={200}
                height={300}
                alt='WebPortfolio'
              />
            </div>
                           <div className='absolute text-white  bottom-0 m-2'>

                  <Link href={'/'} className='text-xl animate-pulse'>See Project {`>>`}</Link>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus veritatis assumenda nesciunt.</p>
            </div>
        </div>
        <div className='relative w-[350px] h-[240px] bg-black flex justify-center hover:scale-1'>
          
            <div className='brightness-75 

w-full h-full  overflow-hidden'>
              <Image src='/Pishop.png'
                sizes="400px"
                style={{
                  width: '100%',
                  height: '240px',
                }}
                
                width={200}
                height={300}
                alt='Pishop'
              />
            </div>
                           <div className='absolute text-white  bottom-0 m-2'>

                           <Link href={'/'} className='text-xl animate-pulse'>See Project {`>>`}</Link>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus veritatis assumenda nesciunt.</p>
            </div>
        </div>
        <div className='absolute bottom-10 left-0 right-0 text-center text-white'>
          <button>
            Want to see more? <span className='underline'>Github</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectsComponent;
