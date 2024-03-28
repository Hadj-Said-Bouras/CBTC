import React from 'react'
import ContactMe from '../../components/contactme'
import NavBar from '../../components/navbar'
function page() {
  return (
    <div className='bg-gradient-to-r from-[#8c6d53] to-[#6fa0ae] h-full pb-20  '>
        <NavBar />
        <ContactMe />
    </div>
  )
}

export default page