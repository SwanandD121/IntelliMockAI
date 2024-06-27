"use client"
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../components/ui/dialog"
import { Button } from '../../../components/ui/button';
import { FaUserGraduate } from "react-icons/fa";
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Separator } from "../../../components/ui/separator"
import { chatSession } from '../../../utils/GeminiAIModel';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { db } from '../../../utils/db'
import { MockInterview } from '../../../utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);

    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const {user} = useUser();
    const router = useRouter();


    const onSumbit = async(e) => {
      setLoading(true);
      e.preventDefault();
      console.log(jobPosition, jobDesc, jobExperience);

      const InputPrompt = "Job Position: " + jobPosition + " Job Description: " + jobDesc + "Years of Experience: " + jobExperience+ ". Based on this information, give me " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions with answers in json format. give questions and answers as field in json."

      const result = await chatSession.sendMessage(InputPrompt);
      
      const mockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '')
      console.log(JSON.parse(mockJsonResponse));
      setJsonResponse(mockJsonResponse);

      if(mockJsonResponse){
        const resp = await db.insert(MockInterview).values({
          mockId:uuidv4(),
          jsonMockResp:mockJsonResponse,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          jobExperience:jobExperience,
          createdBy:user.primaryEmailAddress.emailAddress,
          createdAt:moment().format('DD-mm-yyyy')
        }).returning({mockId:MockInterview.mockId});
  
        console.log("Inserted ID: ", resp)
      } else {
        console.log("Error Occured");
      }

      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }

      setLoading(false);
    }
  return (
    <div className='addnewinterview'>
      <div className='p-10 border rounded-lg bg-neutral-50 hover:scale-105 transition-all hover:shadow-md cursor-pointer' onClick={()=>setOpenDialog(true)}>
          <div className="font-bold text-center text-xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent hover:cursor-pointer" ><span className='text-2xl'>+</span> New Interview</div>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Are you ready?</DialogTitle>
            <DialogDescription>
              <form action="" onSubmit={onSumbit}>
                <h2 className=''>Start by adding more about your Job Position, Role and Experience! <Separator className="m-1 border"/></h2>
                <div className='flex flex-col gap-2 px-3 pb-2 py-6'>
                  <label htmlFor="" className='font-bold'>Job Role / Job Position <span className='text-red-500'>*</span></label>
                  <Input placeholder="Example: Full-Stack Developer" required onChange={(event) => setJobPosition(event.target.value)}/>
                </div>
                <div className='flex flex-col gap-2 px-3 pb-2 py-6'>
                  <label htmlFor="" className='font-bold'>Job Description <span className='text-red-500'>*</span></label>
                  <Textarea placeholder="Tip: Copy and paste company job description here." required onChange={(event) => setJobDesc(event.target.value)}/>
                </div>
                <div className='flex flex-col gap-2 px-3 pb-2 py-6'>
                  <label htmlFor="" className='font-bold'>Years of Experience</label>
                  <Input placeholder="Example: 5" max='100' type="number"onChange={(event) => setJobExperience(event.target.value)}/>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[12px]'><span className='text-red-500'> * </span>Required Fields</div>
                  <div className='flex justify-end gap-4 pt-4 pr-4'>
                    <Button variant="outline" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                      
                      {
                        loading ? 
                        <> 
                          <LoaderCircle className='animate-spin mr-3' /> Generating from AI
                        </>  : <> <FaUserGraduate className='mr-3'/> Start Interview </>
                      }
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview