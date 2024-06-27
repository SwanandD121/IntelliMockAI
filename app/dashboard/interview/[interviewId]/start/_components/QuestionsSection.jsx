import React from 'react';
import { Alert, AlertDescription } from '../../../../../../components/ui/alert';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { Volume2Icon } from 'lucide-react';
import { FiVolume2 } from "react-icons/fi";


function QuestionsSection({ mockInterviewQuestion, activeQuesionIndex }) {

    const textToSpeech = (text) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser does not support text-to-speech.")
        }
    }

  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2 className={`font-bold p-2 bg-secondary rounded-full text-sm md:text-sm text-center hover:cursor-pointer ${activeQuesionIndex==index && 'bg-blue-500 text-white'}`} key={index}>Question #{index + 1}</h2>
        ))}
      </div>
        <h2 className='my-5 font-bold md:text-lg '>{mockInterviewQuestion[activeQuesionIndex]?.question}</h2>

        <div onClick={()=>textToSpeech(mockInterviewQuestion[activeQuesionIndex]?.question)} className='border hover:border-black/30 transition-all w-12 h-12 flex items-center justify-center rounded-full cursor-pointer'>
            <FiVolume2 className='text-3xl ' />
        </div>

        <div className='mt-20'>
            <Alert >
                <div className='flex items-center gap-2 mb-3'>
                    <HiOutlineLightBulb className=' text-2xl'/>
                    <strong className='text-lg'>Note</strong>
                </div>
                <AlertDescription>
                    <h2>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
                </AlertDescription>
            </Alert>
        </div>
    </div>
  );
}

export default QuestionsSection;
