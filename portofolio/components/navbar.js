"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

function NavBar() {
  const [menu, setMenu] = useState(false)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    setMenu(!menu)
  }, [hide])
  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4">
        <nav className="flex justify-center items-center py-4">
          <div className={`${menu ? 'flex' : 'hidden'} sm:flex flex-grow justify-center items-center`}>
            <NavLink href={'/'}>About</NavLink>
            <NavLink href={'/projects'}>Projects</NavLink>
            <NavLink href={'/skills'}>Skills</NavLink>
            <NavLink href={'/contact'}>Contact</NavLink>
          </div>
          <div className={`${menu ? 'hidden' : 'flex'} sm:hidden flex items-center justify-center`}>
            {/* Hamburger menu button */}
            <button className={`focus:outline-none`} onClick={() => setMenu(!menu)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className={`${menu ? 'flex' : 'hidden'} sm:hidden flex items-center justify-center`}>
            {/* Hamburger menu button */}
            <button className='focust:outline text-white text-xl  mr-2' onClick={() => setHide(!hide)}>
              <IoMdClose />
            </button>
          </div>
          
        </nav>
      </div>
    </div>
  );
}

// Custom NavLink component to wrap Link and apply Tailwind CSS classes
function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-white text-lg font-medium mx-4 hover:text-gray-300 transition duration-300 ease-in-out">
      {children}
    </Link>
  );
}

export default NavBar;
