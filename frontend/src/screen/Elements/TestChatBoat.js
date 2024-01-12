import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { RingLoader } from 'react-spinners';



const TestChat = () => {

    const [message, setMessage] = useState('');
    const chatBoxRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [outputLoading, setOutputLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null); // Track the selected chat

    useEffect(() => {
        // Function to scroll to the bottom
        const scrollToBottom = () => {
            if (chatBoxRef.current) {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
        };

        // Call the scroll function when new messages are added
        scrollToBottom();
    }, [messages]);


    const addMessage = (text, isUserMessage, type) => {
        const newMessage = { text, isUserMessage, type };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    const sendMessage = async () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage === '') return;

        addMessage(trimmedMessage, true, 'general');
        const newUserMessage = { text: trimmedMessage, isUserMessage: true, type: 'general' };
        setChatHistory([...chatHistory, newUserMessage]);
        setMessage('');
        setOutputLoading(true);

        try {
            var response1 =  [
              'What is your favorite programming language and why?',
              'How do you handle state management in React?',
              'Can you explain the concept of virtual DOM?',
              'What are the differences between class components and functional components?',
              'How do you optimize performance in a React application?',
            ];

            const content = response1;
            console.log(content)
            addMessage(content, false, 'general');

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setOutputLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };


    const handleChatClick = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="h-screen flex">

            <div className="w-1/5 bg-gray-200 p-4 overflow-y-auto" ref={chatBoxRef}>
                <span className="text-2xl font-semibold mb-2 text-gray-500">Chat History</span>
                <div className="text-2xl">
                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start mb-0 p-4 cursor-pointer ${message.user ? 'justify-end' : 'justify-start'
                                }`}
                            onClick={() => handleChatClick(message)}
                        >
                            <div
                                className={`rounded-lg p-2 max-w-xs ${message.user ? 'text-2xl bg-blue-500 min-w-1/2 p-4 hover-bg-blue-400 text-white' : 'bg-gray-300 text-gray-700'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="self-end flex-grow bg-gray-100 p-4 max-h-screen overflow-y-hidden">

                <div
                    className="flex-grow max-h-screen overflow-y-auto relative"
                    style={{ justifyContent: "flex-end", paddingBottom: '200px', paddingTop: '10px' }}
                    ref={chatBoxRef} // Add the ref to the chat box div
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`text-white p-6 rounded-lg m-8 relative z-10 ${message.isUserMessage
                                ? 'self-end w-1/4 bg-blue-500 text-4xl'
                                : 'self-start bg-green-400 text-4xl'
                                } before:rounded before:content-"" before:w-16 before:h-7 before:absolute before:-left-4 before:top-5 before:-z-20 before:transform before:rotate-[-50deg] m-8 rounded`}
                        >
                            {message.type === 'table' ? (
                                <div />
                            ) : message.type === 'general' ? (
                                <div className="text-data bg-red-300 p-5">
                                    <p>{message.text}</p>
                                </div>
                            ) : null}
                        </div>
                    ))}
                    {outputLoading && (
                        <div className="loading-spinner">
                            <RingLoader color={'#007bff'} loading={outputLoading} size={50} />
                        </div>
                    )}
                </div>

                <div className=' w-16/2 h-1/5 bg-green-100 absolute justify-between p-2  -bottom-4 mx-auto right-0  my-5  z-40 '>
                    <div className="flex  relative top-1/4  overflow-y-auto z-40 ml-8">

                        <input
                            type="text"
                            className="w-full bg-white border rounded-2xl p-8 text-3xl"
                            placeholder="Write a message..."
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="rounded text-4xl p-8 hover:scale-150 relative z-10 -left-28"
                            onClick={sendMessage}
                        >
                           
                        </button>
                       
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TestChat;