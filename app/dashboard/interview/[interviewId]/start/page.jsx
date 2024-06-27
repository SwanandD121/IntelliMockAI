"use client"
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { MockInterview } from '../../../../../utils/schema';
import { db } from '../../../../../utils/db';
import QuestionsSection from '../start/_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '../../../../../components/ui/button';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { GiExitDoor } from "react-icons/gi";
import Link from 'next/link';



function StartInterview({params}) {

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();


    const [activeQuesionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);
    
    // Used to get Interview Details by MockId/InterviewId
    const GetInterviewDetails = async () => { 
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            console.log(jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        };

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 '>

            {/* Quesions */}
            <QuestionsSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuesionIndex={activeQuesionIndex}
            />

            {/* Video */}
            <RecordAnswerSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuesionIndex={activeQuesionIndex}
                interviewData={interviewData}
            />
        </div>
        <div className='flex items-center justify-end gap-4'>
            {activeQuesionIndex>0&&
            <Button onClick={()=>setActiveQuestionIndex(activeQuesionIndex-1)} className="pl-0"><GrFormPrevious className='m-2 text-xl'/> Previous Question</Button>}
            {activeQuesionIndex!=mockInterviewQuestion?.length-1&&
            <Button onClick={()=>setActiveQuestionIndex(activeQuesionIndex+1)} className="pr-0">Next Question<GrFormNext className='m-2 text-xl'/></Button>}
            {activeQuesionIndex==mockInterviewQuestion?.length-1&&
            <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                <Button className="pr-0">End Interview<GiExitDoor className='m-2 text-xl'/></Button>
            </Link>}
        </div>
    </div>
  )
}

export default StartInterview