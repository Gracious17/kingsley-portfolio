import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full text-center items-center justify-center  text-3xl pt-32 overflow-hidden'>

        <h1>More Projects</h1>
        {/* Contents here */}
        <p  className='animate-ping text-[#5651e5]'>coming soon...</p>
        <div>
            <Link href="/#projects">
            Go Back
            </Link>
        </div>
    </div>
  )
}

export default page