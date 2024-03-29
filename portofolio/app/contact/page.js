import React from 'react'
import ContactMe from '../../components/contactme'
import NavBar from '../../components/navbar'
function page() {
  return (
    <div className='bg-gradient-to-r from-[#6e5742] to-[#335e66] h-full pb-20  '>
        <NavBar />
        <ContactMe />
    </div>
  )
}

export default page