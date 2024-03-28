import Link from 'next/link';
import React from 'react';

function NavBar() {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href={'/'}className="text-white text-xl font-semibold hover:text-gray-300 transition duration-300 ease-in-out">
              Hadj
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center items-center">
            <NavLink href={'/'}>About</NavLink>
            <NavLink href={'/projects'}>Projects</NavLink>
            <NavLink href={'/skills'}>Skills</NavLink>
            <NavLink href={'/contact'}>Contact</NavLink>
          </div>
          <div className="md:hidden flex items-center">
            {/* Hamburger menu button */}
            <button className="focus:outline-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
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
