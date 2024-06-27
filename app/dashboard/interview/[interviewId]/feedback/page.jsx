"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../../../components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '../../../../../components/ui/button'
import { useRouter } from 'next/navigation'
  

function Feedback({ params }) {

    const router = useRouter();

    // -------------------------------------------------------------------------------
    // This chunk of code gets feedback from the drizzle database, from the userAnswer table
    // since the data is not getting updated in drizzle, there is nothing shown as of now
    // marked as view later
    const [feedbackList, setFeedbackList] = useState([]);
    useEffect(() => {
        GetFeedback();    
    }, [])
    const GetFeedback=async()=>{
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
        
        console.log(result);
        setFeedbackList(result);
    }
    // -------------------------------------------------------------------------------

  return (
    <div className='p-10'>

        {feedbackList?.length == 0 ? 
            <h2 className='font-bold text-xl text-gray-500 my-4'>No interview feedback record found.</h2>
            :
            <>
            <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
            <h2 className='text-2xl font-bold'>Here is your interview feedback.</h2>
            <h2 className='text-lg text-primary my-3'>Your interview rating is: <strong>7/10</strong></h2>
            <h2 className='text-m text-gray-500'>Please review the interview questions, your responses, and the AI-generated suggested answers provided below.</h2>

            {/* Not working as of now because data is not updating in drizzle */}
            {feedbackList&&feedbackList.map((item, index) => (
                <Collapsible className='mt-7'>
                    <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-10'>{item.question}<ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="p-2 flex flex-col gap-2">
                            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                            <h2 className=' p-2 border rounded-lg bg-red-50 text-sm text-red900'><strong>Your answer: </strong>{item.userAns}</h2>
                            <h2 className=' p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                            <h2 className=' p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ))}

            </>
        }
        
        {/* Not working as of now because data is not updating in drizzle */}
        <Button onClick={()=>router.replace('/dashboard')}>Home</Button>
    </div>
  )
}

export default Feedback