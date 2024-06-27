"use client"
import { Mic, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { chatSession } from '../../../../../../utils/GeminiAIModel'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../../../../utils/db'
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuesionIndex, interviewData }) {

    const [userAnswer, setUserAnswer] = useState("");

    const {user} = useUser();

    const [loading, setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map(result=>{
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
      }, [results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          UpdateUserAnswer();
        }
      }, [userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
          stopSpeechToText();
          if(userAnswer?.length < 10){
            setLoading(false);
            toast("Error while saving your answer, please record again.")
            return;
          }
        } else {
            startSpeechToText();
        }
      }

      const UpdateUserAnswer=async()=>{
        console.log(userAnswer);
        setLoading(true);
        const feedbackPrompt="Question: " + mockInterviewQuestion[activeQuesionIndex]?.question + ", User Answer: " + userAnswer + ", based on question and user answer for the given interview question, please give rating for answer and feedback as area of improvement if any in 3 to 5 lines in JSON format with rating field and feedback field"

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(mockJsonResp);
        const JsonFeedbackResp = JSON.parse(mockJsonResp);
            
        const resp = await db.insert(userAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuesionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuesionIndex]?.answer,
          userAnswer: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        })
        if(resp){
          toast('User answer recorded successfully.')
          setUserAnswer('');
          setResults([]);
        }
        setResults([]);
        setLoading(false);
      }
      
      


  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-col items-center justify-center p-5 mt-10 mx-10 bg-secondary rounded-lg'> 
            <WebcamIcon height={200} width={200} className='absolute '/>
            <Webcam mirrored={true} style={{
                height: 300,
                width:"100%",
                zIndex:10,
              }}
            />
        </div>
        <Button disabled={loading} className="" variant="outline" onClick={StartStopRecording}>
            {isRecording ? <h2 className='text-red-500 flex gap-2 items-center'><Mic/><span>Stop Recording</span></h2> : <h2 className='flex gap-2 items-center'><Mic/>Record Answer</h2>}
        </Button>

        <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
        
    </div>
  )
}

export default RecordAnswerSection