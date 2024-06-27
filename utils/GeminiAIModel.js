// const { GoogleGenerativeAI, HarmCategory,  HarmBlockThreshold } = require("@google/generative-ai");
  
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//     export const chatSession = model.startChat({
//       generationConfig,
//       // safetySettings,
//     // safetySettings: Adjust safety settings
//     // See https://ai.google.dev/gemini-api/docs/safety-settings
      
//     });



// Job Position: Full-Stack Developer, Job Description: We are seeking a talented and motivated MERN Fullstack Developer to join our team. The ideal candidate will have a strong background in web development, with extensive experience in the MERN stack (MongoDB, Express.js, React.js, Node.js). You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and ensuring the technical feasibility of UI/UX designs.

// Key Responsibilities:

// Develop and maintain scalable web applications using the MERN stack.
// Design and implement RESTful APIs.
// Collaborate with UI/UX designers to ensure technical feasibility of designs.
// Optimize applications for maximum speed and scalability.
// Write clean, maintainable, and efficient code.
// Troubleshoot and debug applications.
// Stay up-to-date with emerging technologies and industry trends.
// Requirements:

// Bachelor’s degree in Computer Science, Engineering, or related field.
// Proven experience as a Fullstack Developer or similar role.
// Strong proficiency in JavaScript and ES6+.
// Hands-on experience with MongoDB, Express.js, React.js, and Node.js.
// Knowledge of front-end technologies (HTML5, CSS3, JavaScript).
// Experience with version control systems (e.g., Git).
// Strong problem-solving skills and attention to detail.
// Excellent communication and teamwork skills.

// Years of experience: 2

// Based on this clientInformation, give me 10 interview questions with answers in json format. give questions and answers as field in json.


// NEW---------------------------------------------------------------------------------------

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  ChatSession,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


  export const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings

});

// module.exports = { chatSession };

