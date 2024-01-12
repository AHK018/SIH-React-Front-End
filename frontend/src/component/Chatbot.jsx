import React, { useState, useRef, useEffect } from 'react';
import MicIcon from "../asset/icon/mic.png"
import SendIcon from "../asset/icon/sendB.png"
import Topbar from './Topbar';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime'



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Track the selected chat
  const inputRef = useRef(null);
  const startListening = () => SpeechRecognition.startListening({ continuous: true ,language: 'en-IN'});
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

   // Focus the input field when Shift + ~ is pressed
   useEffect(() => {
    const handleShortcutKeys = (e) => {
      if (e.shiftKey && e.key === '?') {
        inputRef.current.focus();
      }
    };

  if (!browserSupportsSpeechRecognition) {
      return null
  }


 
    window.addEventListener('keydown', handleShortcutKeys);

    return () => {
      window.removeEventListener('keydown', handleShortcutKeys);
    };
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add the user's message to the messages array
    setMessages([...messages, { text: input, user: true }]);
    setInput('');

    // Simulate a response from the chatbot (you can replace this with actual logic)
    setTimeout(() => {
      const response = 'Hello! How can I assist you?';
      setMessages([...messages, { text: response, user: false }]);

      // Update chat history
      setChatHistory([...chatHistory, { text: input, user: true }]);
    }, 1000);
  };

  // Submit the message when Enter is pressed
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle click on a historical message to display it
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className='max-h-screen overflow-hidden'>
      <Topbar/>
    <div className="flex min-h-screen  ">
        
      <div className="w-1/5 bg-gray-200 p-4 max-h-screen overflow-y-hidden -z-0  ">
        <span className="text-2xl font-semibold mb-2 text-gray-500 ">Chat History</span>
        <div className="overflow-y-auto h-full  text-2xl ">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex items-start  mb-0 p-4 cursor-pointer ${  
                message.user ? 'justify-end' : 'justify-start'
              }`}
              onClick={() => handleChatClick(message)} // Handle click on historical message
            >
              <div
                className={`rounded-lg p-2 max-w-xs   ${
                  message.user ? ' text-2xl bg-blue-500 min-w-1/2 p-4 hover:bg-blue-400 text-white self-end' : 'bg-gray-300 text-gray-700 self-start'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow bg-gray-100 p-4 max-h-screen overflow-y-hidden">
        <div className="flex-grow max-h-screen overflow-y-auto relative" style={{ justifyContent: "flex-end"}}>
        {chatHistory.map((message, index) => (    
          <div className='w-full h-full flex flex-col relative right-0 '>        
            <div
              className={` rounded-2xl m-8 my-3 p-8 text-end  max-w-xs w-full relative  text-4xl right-0  ${
                message.user ? 'bg-blue-500 hover:bg-blue-400 text-white  self-end ' : 'bg-gray-300 text-gray-700 self-end relative before:rounded before:content-[] before:w-16 before:h-7 before:absolute before:bg-green-400 before:-right-4 before:top-5 before:-z-20 before:transform before:rotate-[-52deg]  '
              }`}
            >
              {message.text}
            </div></div>  
        ))}

           {selectedChat ? (
            <div className=" relative before:rounded before:content-'' before:w-16 before:h-7 before:absolute before:bg-blue-500 before:-right-4 before:top-5 before:-z-20 before:transform before:rotate-[-52deg]  text-white p-6 rounded-lg m-8 z-10 bg-blue-500 self-end text-4xl ">
              {selectedChat.text}
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`text-white p-6 rounded-lg m-8 relative z-10 ${
                  message.user ? ' before:rounded before:content-"" before:w-16 before:h-7 before:absolute before:bg-blue-500 before:-left-4 before:top-5 before:-z-20 before:transform before:rotate-[52deg]  bg-blue-500 self-end text-4xl m-8 ' : ' before:rounded before:content-"" before:w-16 before:h-7 before:absolute before:bg-green-400 before:-left-4 before:top-5 before:-z-20 before:transform before:rotate-[52deg]   m-8 my-1 bg-green-400  self-start text-4xl  '
                }`}
              >
                {message.text}
               </div>
            ))
          )} 
        </div>
        <div className="w-9/12">{transcript}</div>
        <div className=' w-16/2 h-1/5 bg-green-100 absolute justify-between p-2  -bottom-9 mx-auto right-0  my-5  z-40 '>
        <div className="flex  relative top-1/4  overflow-y-auto z-40 ml-8">
          <input
            type="text"
            className="w-full bg-white border rounded-2xl  p-8 text-3xl"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            ref={inputRef}
          /> 
           <button
          className="rounded  text-4xl p-8 hover:scale-150 relative  z-10 -left-28"
          onClick={handleSendMessage}
        >
          <img src={SendIcon} className='scale-125'/>
        </button>
        <div className="main-content">
                </div>

                <div className="btn-style">
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                </div>

           <button className='relative p-8 -left-28'>
           <img src={MicIcon} className='hover:scale-125' onClick={startListening} />
           </button>
        
        </div></div>
       
      </div>
     
    </div>
    </div>
  );
};

export default Chatbot;
