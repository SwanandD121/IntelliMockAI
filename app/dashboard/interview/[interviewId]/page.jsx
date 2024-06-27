"use client"
// import { Terminal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FcWebcam } from "react-icons/fc";
// import { BiSolidWebcam } from "react-icons/bi";
import Webcam  from "react-webcam";
import { Button } from '../../../../components/ui/button';
import { HiOutlineLightBulb } from "react-icons/hi";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert"
import { MockInterview } from '../../../../utils/schema';
import { db } from '../../../../utils/db';
import { eq } from 'drizzle-orm';
import { Terminal } from 'lucide-react';
import Link from 'next/link';



function Interview({params}) {


    const [interviewData, setInterviewData] = useState(true);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, []);

    // Used to get Interview Details by MockId/InterviewId
    const GetInterviewDetails = async () => { 
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0]);
    };
    

    const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <div className='my-10 flex flex-col gap-4'>
        <h2 className='font-bold text-2xl text-center bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>Lets Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col justify-between  gap-4'>
                <div className="flex flex-col gap-5 p-5 rounded-lg border mt-8">
                    <h2 className='text-md'><strong className='bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>Job Role / Job Position: </strong>{interviewData.jobPosition} </h2>
                    <h2 className='text-md'><strong className='bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>Job Description: </strong>{interviewData.jobDesc} </h2>
                    <h2 className='text-md'><strong className='bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>Years of Experience: </strong>{interviewData.jobExperience} </h2>
                </div>
                <div>
                    <Alert >
                        <div className='flex items-center gap-2 mb-3'>
                            <HiOutlineLightBulb className=' text-2xl'/>
                            <strong className='text-lg'>Information</strong>
                        </div>
                        <AlertDescription>
                            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
            <div>
                {   
                    webCamEnabled ? <div className='bg-secondary rounded-lg flex items-center justify-center'>
                        <Webcam
                        
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        style={{
                            height: 400,
                            width: 400,
                        }} 
                        mirrored={true}
                    />
                    </div> : 
                    <>
                        <FcWebcam className='h-72 w-full my-7 p-2 bg-neutral-100 rounded-lg' /> 
                        <Button variant='outline' className='w-full border-lg border-black/30' onClick={() => setWebCamEnabled(true)} >Enable Camera and Microphone</Button>
                    </>                
                }
            </div>
        </div>
        <div className='flex items-end justify-end'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button className="font-bold">Start Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview