"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from '../components/ui/button'
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Navbar from './(landing)/Navbar'

function Landing() {
  
  return (
    <div className=''>
      {/* Navbar */}
      <Navbar />
        <div className="flex items-center justify-center gap-10 p-10">
            <div className="leftSide flex flex-col items-start justify-center w-1/2 gap-4">
                {/* Content */}
                
                <h1 className='font-bold text-6xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>Prepare for Success!</h1>
                <h1 className='font-bold text-4xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center'> Your AI-Powered Path to Interview Mastery 
                </h1>
                <h3 className='text-gray-800'>Experience the Future of Interview Preparation with AI. Prepare for your next job interview with advanced AI simulations that replicate real-world scenarios.</h3>
                <div className='flex gap-2 my-4'>
                  <Button>Start AI Interview</Button>
                  <Button variant="outline" className="border border-black/40">Dashboard</Button>
                </div>
            </div>
            <div className="rightSide bg-gray-200 rounded-3xl">
                {/* Image */}
                <Image className='p-2 rounded-3xl' src={'/coverimg.jpeg'} width={550} height={0} alt='logo'/>

            </div>
        </div>
    </div>
  )
}

export default Landing