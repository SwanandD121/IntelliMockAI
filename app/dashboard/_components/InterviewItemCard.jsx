import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({ interview }) {

    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created On: {interview?.createdAt}</h2>
        <div className="flex justify-between my-3 gap-4">
            
            <Button onClick={onFeedbackPress} variant="outline" className="w-full border border-black/30">Feedback</Button>
            <Button onClick={onStart} className="w-full">Start Again</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard