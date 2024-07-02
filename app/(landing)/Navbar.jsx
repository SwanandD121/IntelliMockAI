"use client"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Navbar() {
    const path = usePathname();

    useEffect(() => {
    }, [])
  return (
    <div>
        <div className='flex p-2 items-center justify-between bg-gradient-to-r from-violet-100 to-purple-100 shadow-sm '>
            <Image className='pl-6' src={'/logorect.png'} width={200} height={0} alt='logo'/>

            <ul className='hidden md:flex gap-6 pr-4'>
                
                <li className={`hover:cursor-pointer bg-gradient-to-r from-violet-800 to-purple-800 bg-clip-text text-transparent hover:font-bold transition-all ${path=='/dashboard/questions'&&'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold'}`}>How it Works?</li>
                <li className={`hover:cursor-pointer bg-gradient-to-r from-violet-800 to-purple-800 bg-clip-text text-transparent hover:font-bold transition-all ${path=='/dashboard/upgrade'&&'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold'}`}>Upgrade</li>
                <li className={`hover:cursor-pointer bg-gradient-to-r from-violet-800 to-purple-800 bg-clip-text text-transparent hover:font-bold transition-all ${path=='/dashboard/how'&&'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold'}`}>Contact</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar