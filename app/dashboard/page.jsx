import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from'./_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>Dashboard</h2>
      <h2 className='text-gray-600'>Create and Start Your AI Mock Interview within 30 seconds!</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>

      {/* Previous Interview List */}
      <InterviewList />
    </div>
  )
}

export default Dashboard