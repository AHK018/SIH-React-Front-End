import React, { useState, useRef, useEffect } from "react";
import { PiWechatLogoFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { PiSealQuestionDuotone } from "react-icons/pi";
import { BsSearch } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { RxSpeakerLoud } from "react-icons/rx";
import { RiQuestionnaireLine } from "react-icons/ri";
import axios from 'axios';
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { TbStars } from "react-icons/tb";
import { FcSpeaker } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import Topbar from "../component/Topbar";
import "../index.css"
import "../style/Chatbot.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import SliderBar from "../component/Slider";
import { RingLoader } from 'react-spinners';
import Pnrstatus from '../PnrStatus';
import TrainTable from '../TrainTable';
import GetLiveStation from '../GetLiveStation';
import TrainBetweenTwoStations from '../TrainBetweenTwoStations';
import GetFare from '../GetFare';
import GetTrainByStation from '../GetTrainByStation';
import GetTrainClasses from '../getTrainClasses';
import CheckSeatAvailability from '../checkSeatAvailability';
import GetTrainSchedule from '../getTrainSchedule';
import LiveTrainStatus from '../LiveTrainStatus';
import SearchTrain from '../searchTrain';
import SearchStation from '../searchStation';
import ReactDOM from 'react-dom'
import Modal from '../Model';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const announcements = [
];

const ChatBoat = () => {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [speech] = useState(new SpeechSynthesisUtterance());
  const [selectedChat, setSelectedChat] = useState(null); // Track the selected chat
  const inputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDislikePopup, setShowDislikePopup] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [prnNumber, setPrnNumber] = useState('');
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isAsked, setIsAsked] = useState(false);
  const top_items = [
    {
      icon: "https://img.icons8.com/stickers/100/train.png",
      name: "PNR Status",
    },
    {
      icon: "https://img.icons8.com/color/48/underground.png",
      name: "Train Status",
    },
    {
      icon: "https://img.icons8.com/emoji/48/station.png",
      name: "Train Station"
    },
    {
      icon: "https://img.icons8.com/matisse/100/train-ticket.png",
      name: "Train Classes",
    },
    {
      icon: "https://img.icons8.com/external-anggara-blue-anggara-putra/32/external-train-calendar-anggara-blue-anggara-putra.png",
      name: "Train Schedule",
    },
    {
      icon: "https://img.icons8.com/bubbles/50/google-web-search.png",
      name: "Search Train"
    },
  ];

  const path = 'http://127.0.0.1:5000'
  // const scrollableDivRef = useRef(null); 

  const [isListOpen, setListOpen] = useState(false);
  const lastItemRef = useRef(null);
  const listItems = ['Check PNR Status', 'Check live train Status'];
  let [questions, setQuestions] = useState([
    { label: 'Press 1. Ticket Status' },
    { label: 'Press 2. Train Live Status' },
    { label: 'Press 3. Plateform Number' },
    { label: 'Press 4. Announcements' },
  ]);
  const [voices, setVoices] = useState([]);
  const chatBoxRef = useRef(null);
  const [outputLoading, setOutputLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const [suggestions, setSuggestions] = useState([]);
  const [stationNames, setStationNames] = useState([]);
  const toggleList = () => {
    setListOpen(!isListOpen);
  };

  const [isLikedHeart, setIsLikedHeart] = useState([]);

  const toggleHeart = (id) => {
    setShowPopup(true);
    setIsLikedHeart((prevIsLikedHeart) => {
      const updatedIsLikedHeart = [...prevIsLikedHeart];
      updatedIsLikedHeart[id] = !updatedIsLikedHeart[id];
      return updatedIsLikedHeart;
    })
  };


  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [announcements]);

  const [selectedStation, setSelectedStation] = useState('');
  const [stationAnnouncement, setStationAnnouncement] = useState([]);
  const [previousAnnouncements, setpreviousAnnouncements] = useState([]);

  const handleSelectChange = event => {
    const inputvalll = event.target.value
    setSelectedStation(event.target.value);
    const filteredSuggestions = getSuggestions(inputvalll);
    setSuggestions(filteredSuggestions);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/getStationNamesCSV');
        const data = response.data;
        const formattedStationNames = data.map(item => `${item['Station Name']} (${item['Stn Code']})`);

        setStationNames(formattedStationNames);
      } catch (error) {
        console.error('Error fetching station names:', error.message);
      }
    };

    fetchData();
  }, []);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();

    // Filter out non-string values and then perform the lowercase check
    const filteredStations = stationNames.filter((name) => {
      if (typeof name === 'string') {
        return name.toLowerCase().includes(inputValueLowerCase);
      }
      return false; // Skip non-string values
    });

    console.log(filteredStations);
    return filteredStations;
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedStation(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const gettheannoucement = async () => {
    setStationAnnouncement('')
    setpreviousAnnouncements('')
    const selectedLanguage = localStorage.getItem('selectedLanguage')
    if (selectedStation) {
      axios.post(`${path}/announcement_by_station/${selectedStation}`, { language: selectedLanguage })
        .then(response => {
          setStationAnnouncement(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('There was a problem fetching the data:', error);
        });
    }
    if (selectedStation) {
      console.log('station: ', selectedStation);
      axios.post(`${path}/announcement_by_station/${selectedStation}/latest`, { language: selectedLanguage })
        .then(response => {
          setpreviousAnnouncements(response.data);
        })
        .catch(error => {
          console.error('There was a problem fetching the data:', error);
        });
    }
  }

  const addMessage = async (text, isUserMessage, type) => {
    setOutputLoading(true);
    let newMessage = { text, isUserMessage, type };
    if(!isUserMessage)
    {
      const textToSpeak = text;
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      } else {
        speech.text = textToSpeak;
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices[164];
        speech.voice = selectedVoice;
        window.speechSynthesis.speak(speech);
      }
    } 
    setOutputLoading(false);
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };


  useEffect(() => {
    const scrollToBottom = () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  const options = {
    method: 'GET',
    url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
    params: {
      pnrNumber: prnNumber
    },
    headers: {
      'X-RapidAPI-Key': 'f02416fc67mshb579fecab7d8f22p178af5jsn4ee8498d3c16',
      'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
    }
  };


  const [Data, setData] = useState([]);
  const [Data1, setData1] = useState([]);
  const [TrainNumber, setTrainNumber] = useState([]);
  const options1 = {
    method: 'GET',
    url: 'https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus',
    params: {
      trainNo: TrainNumber,
      startDay: '1'
    },
    headers: {
      'X-RapidAPI-Key': 'f02416fc67mshb579fecab7d8f22p178af5jsn4ee8498d3c16',
      'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
    }
  };
  const sendMessage = async (message) => {

    if (!message) return;
    const trimmedMessage = message.trim();
    if (trimmedMessage === '') return;
    var PnrInforamtion = ''
    if (trimmedMessage == ('Press 1. Ticket Status' || 'press 0')) {
      addMessage('Press 1. Ticket Status', true, 'general');
      addMessage('Please Enter PNR number', false, 'general');
    }
    if (trimmedMessage.length == 10) {
      addMessage(trimmedMessage, true, 'general');
      setPrnNumber(trimmedMessage)
      const response = await axios.request(options);
      addMessage('Thanks', false, 'general');
      setData(response)

      setQuestions([
        { label: 'Press 1. Confirm Ticket Status' },
        { label: 'Press 2. Train Class' },
        { label: 'Press 3. Arrival Time' },
        { label: 'Press 4. Departure Time' },
        { label: 'Press 5. Plateform Number' },
        { label: 'Press 6. Reload' }
      ]);
    }
    if (trimmedMessage == ('Press 1. Confirm Ticket Status' || '1' || 'one' || 'press 1')) {
      addMessage('Ticket Confermation', true, 'general')
      addMessage('Your Ticket Confermation Status ' + Data.data.data.PassengerStatus[0].CurrentStatus, false, 'general');
    }
    if (trimmedMessage == ('Press 2. Train Class' || '2' || 'two' || 'press 2')) {
      addMessage('Train Class', true, 'general')
      addMessage('Train Classes are ' + Data.data.data.Class, false, 'general');
    }
    if (trimmedMessage == ('Press 3. Arrival Time' || '3' || 'three' || 'press 3')) {
      addMessage('Arrival Time', true, 'general')
      addMessage('Train Arrival Time is ' + Data.data.data.ArrivalTime, false, 'general');
    }
    if (trimmedMessage == ('Press 4. Departure Time' || '4' || 'four' || 'press 4')) {
      addMessage('Departure Time', true, 'general')
      addMessage('Train Deparcher Time Is ' + Data.data.data.DepartureTime, false, 'general');
    }
    if (trimmedMessage == ('Press 5. Plateform Number' || '5' || 'five' || 'press 5')) {
      addMessage('Plateform Number', true, 'general')
      addMessage('Train is located at plateform ' + Data.data.data.ExpectedPlatformNo, false, 'general');
    }
    if (trimmedMessage == ('Press 6. Reload' || '6' || 'six' || 'press 6')) {
      setQuestions([
        { label: 'Press 1. Ticket Status' },
        { label: 'Press 2. Train Live Status' },
        { label: 'Press 3. Plateform Number' },
        { label: 'Press 4. Announcements' },
      ]);
    }
    if (trimmedMessage == 'Press 2. Train Live Status') {
      addMessage('Train Live Status', true, 'general');
      addMessage('Please give me your Train number', false, 'general');
    }
    if (trimmedMessage.length >= 3 && trimmedMessage.length < 7) {
      addMessage(trimmedMessage, true, 'general');
      setTrainNumber(trimmedMessage)
      const response = await axios.request(options1);
      setData1(response)
      console.log(response.data)
      setQuestions([
        { label: 'Press 1. current_station_name' },
        { label: 'Press 2. delay' },
        { label: 'Press 3. Total distance' },
        { label: 'Press 4. destination' },
        { label: 'Press 5. Reload' }
      ]);
    }
    if (trimmedMessage == 'Press 1. current_station_name') {
      addMessage('Current Station Name', true, 'general')
      addMessage('Your Current Station Name is ' + Data1.data.data.current_station_name, false, 'general');
    }
    if (trimmedMessage == 'Press 2. delay') {
      addMessage('Train Delay', true, 'general')
      addMessage('Your Train is delayed By ' + Data1.data.data.delay, false, 'general');
    }
    if (trimmedMessage == 'Press 3. Total distance') {
      addMessage('Total Distance Coverd', true, 'general')
      addMessage('Total Distance Coverd Is ' + Data1.data.data.total_distance, false, 'general');
    }
    if (trimmedMessage == 'Press 4. destination') {
      addMessage('Destination Station', true, 'general')
      addMessage('Destination Station is ' + Data1.data.data.destination, false, 'general');
    }
    if (trimmedMessage == 'Press 5. Reload') {
      setQuestions([
        { label: 'Press 1. Ticket Status' },
        { label: 'Press 2. Train Live Status' },
        { label: 'Press 3. Plateform Number' },
        { label: 'Press 4. Announcements' },

      ]);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  const handleSpeak = (announcement) => {
    const textToSpeak = announcement.text; // Use the announcement data
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      speech.text = textToSpeak;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices[164]; // Adjust this to select the desired voice
      speech.voice = selectedVoice;
      window.speechSynthesis.speak(speech);
    }
  };

  const speakQuestion = (question, index) => {
    const textToSpeak = question.label;
    const speech = new SpeechSynthesisUtterance(textToSpeak);

    // Use the first available voice or the default voice
    const selectedVoice = voices.length > 0 ? voices[0] : null;

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    // Add a delay before speaking each question
    setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, index * 2000); // Adjust the delay as needed
  };
  const handleSpeakQuestion = (text) => {
    // Iterate through questions and speak each one
    questions.forEach((question, index) => {
      speakQuestion(question, index);
    });
  };

  const handleSpeakAnnouncements = (id) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      const element = document.getElementById(id);
      const textToSpeak = element.textContent;
      speech.text = textToSpeak;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices[164]; // Adjust this to select the desired voice
      speech.voice = selectedVoice;
      window.speechSynthesis.speak(speech);
    }
  };

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const toggleAnnouncement = () => {
    setIsAnnouncementOpen(!isAnnouncementOpen);
  };


  useEffect(() => {
    const handleShortcutKeys = (e) => {
      if (e.shiftKey && e.key === "?") {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleShortcutKeys);

    return () => {
      window.removeEventListener("keydown", handleShortcutKeys);
    };
  }, []);

  useEffect(() => {
    const defaultVoice = window.speechSynthesis.getVoices()[160];
    speech.voice = defaultVoice;
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(message);
    }
  };

  useEffect(() => {
    let likeTimeout, dislikeTimeout;

    if (showPopup) {
      likeTimeout = setTimeout(() => {
        closeLikePopup();
      }, 2000);
    }

    // Cleanup the timeouts on component unmount or when pop-ups change
    return () => {
      clearTimeout(likeTimeout);
      clearTimeout(dislikeTimeout);
    };
  }, [showPopup, showDislikePopup]);

  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      const selectedLanguage = localStorage.getItem('selectedLanguage')
      const options = { continuous: true, language: selectedLanguage };
      SpeechRecognition.startListening(options);
    }
    setListening(!listening);
    if (listening && message.trim() !== "") {
      sendMessage(message);
      setMessage('');
    }
    resetTranscript();
  };

  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }


  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleDislikeButtonClick = () => {
    setShowDislikePopup(true);
    // Perform additional actions for a dislike (if needed)
  };

  const closeLikePopup = () => {
    setShowPopup(false);
  };



  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = () => {
    alert("Feedback submitted:", feedback);
    setFeedback("");
  };

  const extractPNRNumber = (query) => {
    const pnrNumberRegex = /\b\d{10}\b/;
    const pnrNumberMatch = query.match(pnrNumberRegex);
    const pnrNumber = pnrNumberMatch ? pnrNumberMatch[0] : null;
    return pnrNumber
  }

  const extractTrainNumber = (query) => {
    const trainNumberRegex = /\b\d{3,6}\b/;
    const trainNumberMatch = query.match(trainNumberRegex);
    const extractedTrainNumber = trainNumberMatch ? trainNumberMatch[0] : null;
    return extractedTrainNumber;
  };

  return (
    <div className="max-h-screen overflow-hidden">
      {/* <Topbar className="" /> */}
      <nav className="fixed top-0 left-0 right-0 z-50  shadow mb-2">
        <Topbar />
      </nav>

      <div className="absolute -translate-x-2 -translate-y-2 sm:-translate-x-6  bottom-20 right-0 ml-4 z-50 mmd:hidden min-h-12 block ">
        <button className="p-1 m-1  bg-orange-300 rounded-xl block">
          <FaHistory className="  text-indigo-950 w-9 scale-75 h-9 cursor-pointer" onClick={toggleSidebar} /> </button>
        <button className="p-1 m-1 bg-orange-300 rounded-xl ms:hidden">
          <GrAnnounce className="   text-indigo-900  w-9 h-9 cursor-pointer" onClick={toggleAnnouncement} />
        </button></div>


      {(isOpenSidebar) && (
        <div className={`fixed border-r-2 border-gray-400 mmd:hidden inset-y-0 left-0 z-30 bg-green-600 bg-opacity-20 max-w-1/5 md:w-1/5 shadow-[0_20px_25px_rgba(0,_1,_4,_0.7)] ${isAnnouncementOpen === true ? 'z-40 ' : 'z-20'} `}>

          <div className={`fixed cpm:max-w-[80%] cpm:w-[80%] esm:max-w-[65%]  esmm:w-[65%]  vsm:max-w-[46%] vsm:w-[46%] sm:max-w-2/6 sm:w-2/6  top-[10%]  overflow-hidden  shadow-[0_20px_25px_rgba(0,_1,_4,_0.7)] `}>

            <div className="w-full bg-blue-200  p-4 max-h-screen overflow-scroll h-screen ">
              <div className="flex flex-col  border-b-2 border-zinc-100  my-2 ms:my-4">
                <button className="cursor-pointer group relative flex items-center justify-center p-1 text-base xl:text-xl bg-orange-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                  <PiWechatLogoFill className="text-black  h-8 w-8 lg:h-10 lg:w-10 mr-2 " />
                  New Chat
                </button>
                <div className="cursor-pointer group relative flex items-center justify-center px-2 py-3 text-base xl:text-xl font-semibold space-y-1   -translate-x-8 lg:-translate-x-8">
                  <FaHistory className="text-indigo-500  mx-2 lg:mx-4   h-6 w-6 lg:h-8 lg:w-8  " />
                  History
                </div>
              </div>

              <div className="relative max-h-2/6 h-2/6  overflow-scroll rounded-x">
                <div className="max-h-1/2 overflow-scroll text-center text-sm ">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex hover:scale-105 duration-300  items-start p-2 rounded-lg border-2 border-slate-400 m-2 cursor-pointer ${message.user ? "justify-end" : "justify-start"
                        }`}
                      onClick={() => handleChatClick(message)} // Handle click on historical message
                    >
                      <div
                        className={`flex  rounded-lg text-base w-full mx-2 justify-end font-semibold text-right  duration-300  ${message.user
                          ? " min-w-1/2  text-indigo-950  self-end "
                          : " text-indigo-950 self-start "
                          }`}
                      >
                        {/* <p className="text-right">  */}
                        {message.text}
                        {/* </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col -translate-y-1 h-auto  border-t-2 border-zinc-100 ">
                <span
                  className=" cursor-pointer  duration-300 group relative flex gap-3   hover:scale-110  xl:scale-100 xl:text-xl text-indigo-950 items-center font-semibold  mx-5"
                  onClick={toggleList}>
                  <PiSealQuestionDuotone className=" h-8 w-8 lg:h-10 lg:w-10 text-blue-500" />
                  People also asks <FaAngleDown />
                </span>
                <ul className={`border-t-2 my-2 outline-offset-2 border-slate-400 no-style  text-base font-semibold mx-auto translate-x-3 flex-col ${isListOpen ? 'block' : 'hidden'}`}>
                  {questions.map((item, index) => (
                    <li key={index} className=" p-1 border-b cursor-pointer duration-300 hover:scale-110  offset-2 border-slate-400">
                      {item.label}
                    </li>
                  ))}
                </ul>
                <span className=" cursor-pointer group relative hover:scale-105 flex items-center gap-3 text-base scale-105 xl:text-xl font-semibold  opacity-60 hover:opacity-100 duration-300 ml-4 my-3  text-indigo-950 ">
                  <TbStars className="  h-8 w-8 lg:h-10 lg:w-10 text-orange-400" />
                  Feedback</span>

              </div>

              <div className="w-full relative flex flex-col rounded-xl border-2 border-slate-400 cursor-pointer group px-1 bg-clip-border text-gray-700 shadow-md">
                <div className="flex flex-col gap-1 font-semibold text-center text-indigo-950">
                  Watch the demo
                  <iframe
                    className="w-full h-[90%]"
                    src="https://www.youtube.com/embed/NHLnjWTEZps?si=FQzzza-UTo9_C1fO"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div className="flex w-1 h-10 my-4" />
            </div>
          </div>
        </div>
      )}

      <div className="flex relative  inset-0 top-20  gap-0 max-w-screen h-screen overflow-hidden ">

        <div className="hidden top-[10%]  border-r-2 border-gray-400 bg-red-600  mmd:flex h-full max-w-1/5 w-1/5 z-20 ">
          <div className="w-full bg-blue-200  p-4 max-h-screen overflow-scroll h-screen ">
            <div className="flex flex-col border-b-2 border-zinc-100">
              <button className="cursor-pointer group relative flex items-center justify-center p-1 text-base xl:text-xl bg-orange-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                <PiWechatLogoFill className="text-black  h-8 w-8 lg:h-10 lg:w-10 mr-2 " />
                New Chat
              </button>
              <div className="cursor-pointer group relative flex items-center justify-center px-2 py-3 text-base xl:text-xl font-semibold space-y-1   -translate-x-8 lg:-translate-x-8">
                <FaHistory className="text-indigo-500  mx-2 lg:mx-4   h-6 w-6 lg:h-8 lg:w-8  " />
                History
              </div>
            </div>

            <div className="relative max-h-2/6 h-2/6  overflow-scroll rounded-x">
              <div className="max-h-1/2 overflow-scroll text-center text-sm ">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex hover:scale-105 duration-300  items-start p-2 rounded-lg border-2 border-slate-400 m-2 cursor-pointer ${message.user ? "justify-end" : "justify-start"
                      }`}
                    onClick={() => handleChatClick(message)} // Handle click on historical message
                  >
                    <div
                      className={`flex  rounded-lg text-base w-full mx-2 justify-end font-semibold text-right  duration-300  ${message.user
                        ? " min-w-1/2  text-indigo-950  self-end "
                        : " text-indigo-950 self-start "
                        }`}
                    >
                      {/* <p className="text-right">  */}
                      {message.text}
                      {/* </p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col -translate-y-1 h-auto  border-t-2 border-zinc-100 ">
              <span
                className=" cursor-pointer  duration-300 group relative flex gap-3   hover:scale-110   xl:scale-100 xl:text-xl text-indigo-950 items-center font-semibold  mx-5"
                onClick={toggleList}>
                <PiSealQuestionDuotone className=" h-8 w-8 lg:h-10 lg:w-10 text-blue-500" />
                People also asked <FaAngleDown />
              </span>
              <ul className={`border-t my-2 outline-offset-2 border-gray-400 no-style  text-base font-semibold mx-auto translate-x-3 flex-col ${isListOpen ? 'block' : 'hidden'}`}>
                {questions.map((item, index) => (
                  <li key={index} className=" p-1 border-b cursor-pointer duration-300 hover:scale-110  offset-2 border-slate-400">
                    {item.label}
                  </li>
                ))}
              </ul>
              <span className=" cursor-pointer group relative hover:scale-105 flex items-center gap-3 text-base scale-105 xl:text-xl font-semibold  opacity-60 hover:opacity-100 duration-300 mx-4 my-2  text-indigo-950 ">
                <TbStars className="  h-8 w-8 lg:h-10 lg:w-10 text-orange-400" />
                Feedback</span>

            </div>

            <div className="w-full relative flex flex-col rounded-xl border-2 border-slate-400 cursor-pointer group px-1 bg-clip-border text-gray-700 shadow-md">
              <div className="flex flex-col gap-1 font-semibold text-center text-indigo-950">
                Watch the demo
                <iframe
                  className="w-full h-[90%]"
                  src="https://www.youtube.com/embed/NHLnjWTEZps?si=FQzzza-UTo9_C1fO"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="flex w-1 h-10 my-4" />
          </div>

        </div>

        <div className="flex flex-col  w-full ms:w-3/4 bg-gray-50 mmd:max-w-[60%] mmd:w-[60%] h-screen overflow-hidden  p-1 z-20">

          <div className="chatboat-top-items cursor-pointer flex overflow-x-auto h-12 w-full text-base bg-green gap-x-1 md:gap-x-8 lg:gap-x-10 shadow-lg bg-zinc-50">
            {top_items.map((item, index) => (
              <div
                key={index}
                className="flex w-full md:w-auto gap-1 justify-around items-center flex-shrink-0 bg-slate-200 shadow-2xl rounded p-2 md:p-3 lg:p-4"
              >
                <img
                  src={item.icon}
                  className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
                {/* <button className=" md:block" onClick={() => handleItemClick(item.name)}>
                  {item.name}
                  {console.log(item.name)}
                </button> */}
              </div>
            ))}
          </div>


          <div className="flex-grow p-6 pl-4 max-h-screen scroll-smooth overflow-y-scroll">
            <div className="flex-grow max-h-screen overflow-y-auto relative"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-2 gap-x-32 gap-y-4 m-auto">

                </div>

              </div>

              {messages.map((message, index) => (
                (message.isUserMessage) ? (

                  <div className="w-full h-full flex flex-col relative right-0 ">

                    <div
                      className={` rounded-2xl m-8 my-1  text-end  max-w-[70%] overflow-auto w-full relative  text-4xl right-0
                      ${message.isUserMessage
                          ? "text-white  self-end  "
                          : "hidden text-gray-700 p-5  self-end relative before:rounded before:content-[] before:w-16 before:h-7 before:absolute before:bg-green-400 before:-right-4 before:top-5 before:-z-20 before:transform before:rotate-[-52deg]  "
                        }`}
                    >
                      <div className="bg-blue-300 border border-slate-200 flex flex-col gap-1 rounded-xl p-2 text-sm">
                        <div className="flex gap-4 w-full">
                          <button
                            onClick={() => handleSpeak(message)}
                            className="absolute top-3 outline-lime-500 ring-lime-400  right-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-2 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
                          >
                            <FcSpeaker className=" scale-125 w-4 h-4 vsm:w-6 vsm:h-6  text-indigo-900" />
                          </button>
                          <p className=" text-slate-600 w-full text-right flex justify-start">{moment().format('LT')}</p>
                        </div>


                        <div className="flex flex-grow  bg-slate-100 text-slate-600 text-base sm:text-xl lg:text-2xl scroll-smooth max-h-80 max-w-full overflow-scroll border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 justify-end">
                          <p className="m-2 mt-3">{message.text}</p>
                        </div>
                        <div className="">
                          <button
                            className={`  flex justify-start items-center rounded-lg p-2 duration-300  focus:fill-red-200  ${isLikedHeart[index] ? "bg-fuchsia-300" : ""
                              }`}
                            onClick={() => toggleHeart(index)}
                          >
                            <FaRegHeart
                              className="⁠ w-2 h-2 vsm:w-3 scale-150 vsm:h-3 text-purple-500"
                            />
                          </button>
                          {showPopup && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                              <div className="bg-white  p-4 border  rounded-lg shadow-md">
                                <p className="text-lg text-blue-500 font-semibold">
                                  Thanks for the like!
                                </p>
                                <img
                                  width="100"
                                  height="100"
                                  src="https://img.icons8.com/stickers/100/facebook-like-skin-type-1.png"
                                  alt="facebook-like-skin-type-1"
                                />
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div
                    key={index}
                    className={`text-white p-2 w-auto max-w-full rounded-lg m-2 relative ${message.user
                      ? ' before:rounded p-20 before:content-"" before:w-16 before:h-7 before:absolute before:bg-blue-500 before:-left-4 before:top-5 before:-z-20 before:transform before:rotate-[52deg]  bg-blue-500 self-end text-4xl m-8 '
                      : ' before:rounded before:content-"" before:w-16 before:h-7 before:absolute  before:-left-4 before:top-5 before:-z-20 before:transform before:rotate-[52deg]   m-8 my-1 bg-green-300  self-start text-4xl  '
                      }`}
                  >
                    <div className="  border-slate-200  rounded-xl text-sm">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-4 w-full">
                          <button
                            onClick={() => handleSpeak(message)}
                            className="absolute top-3 outline-lime-500 ring-lime-400  right-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-2 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
                          >
                            <FcSpeaker className=" scale-125 w-4 h-4 vsm:w-6 vsm:h-6  text-indigo-900" />
                          </button>
                          <p className=" text-slate-600 w-full text-right flex justify-start">{moment().format('LT')}</p>

                        </div>


                        {showPopup && (
                          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-white p-4 border rounded-lg shadow-md">
                              <p className="text-lg text-red-500 font-semibold">
                                Thanks for the like!
                              </p>
                              <button
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={closePopup}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}

                        <p className="bg-slate-100  text-slate-600 text-base sm:text-xl lg:text-2xl scroll-smooth max-h-80 max-w-full overflow-scroll  placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600">
                          {message.type === 'general' ? (
                            <p className="m-2 mt-3">{message.text}</p>
                          ) : null}
                        </p>
                        <div className="flex gap-4">
                          <div className="">
                            <button
                              className={`  flex justify-start items-center rounded-lg p-2 duration-300  focus:fill-red-200  ${isLikedHeart[index] ? "bg-fuchsia-300" : ""
                                }`}
                              onClick={() => toggleHeart(index)}
                            >
                              <FaRegHeart
                                className="w-2 h-2 vsm:w-3 scale-150 vsm:h-3 text-purple-500" />
                            </button>
                            {showPopup && (
                              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="bg-white  p-4 border  rounded-lg shadow-md">
                                  <p className="text-lg text-blue-500 font-semibold">
                                    Thanks for the like!
                                  </p>
                                  <img
                                    width="100"
                                    height="100"
                                    src="https://img.icons8.com/stickers/100/facebook-like-skin-type-1.png"
                                    alt="facebook-like-skin-type-1"
                                  />
                                </div>
                              </div>
                            )}

                          </div>
                          <button className="" onClick={handleButtonClick}>
                            <BiLike className="text-indigo-900 w-3 h-3 vsm:w-5 vsm:h-5" />
                          </button>
                          <button onClick={handleDislikeButtonClick}>
                            <BiDislike className="text-indigo-900 w-3 h-3 vsm:w-5 vsm:h-5" />
                          </button>
                        </div>
                      </div>
                      {outputLoading && (
                        <div className="loading-spinner">
                          <RingLoader color={'#007bff'} loading={outputLoading} size={50} />
                        </div>
                      )}
                      {showPopup && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                          <div className="bg-white p-4 border rounded-lg shadow-md">
                            <p className="text-lg text-blue-500 font-semibold">
                              Thanks for the like!
                            </p>
                            <img
                              width="100"
                              height="100"
                              src="https://img.icons8.com/stickers/100/facebook-like-skin-type-1.png"
                              alt="facebook-like-skin-type-1"
                            />
                          </div>
                        </div>
                      )}

                      {showDislikePopup && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                          <div className="bg-white p-4 border rounded-lg shadow-md">
                            <p className="text-lg text-center font-semibold text-2xl-bold text-blue-500">
                              Sorry for your inconvenience.
                            </p>

                            <div class="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
                              <h1 class="text-center text-slate-500 text-xl font-bold col-span-6">
                                Please share your feedback below:
                              </h1>
                              <textarea
                                placeholder="Your feedback..."
                                value={feedback}
                                onChange={handleFeedbackChange}
                                class="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
                              ></textarea>
                              <button class="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20px"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                </svg>
                              </button>
                              <button class="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20px"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                </svg>
                              </button>
                              <span class="col-span-2"></span>
                              <button
                                onClick={handleSubmitFeedback}
                                class="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  height="30px"
                                  width="30px"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                                  ></path>
                                  <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="M10.11 13.6501L13.69 10.0601"
                                  ></path>
                                </svg>
                              </button>
                              <button
                                className="mt-2 flex bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowDislikePopup(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>


                ))

              )}
              <div className="flex gap-4">
                <RiQuestionnaireLine className="text-orange-400 w-6 h-6 mx-1" />
                <p className="font-bold">You may also try</p>
                <button onClick={handleSpeakQuestion}>
                  {" "}
                  <FcSpeaker className="relative scale-125 w-4 h-4 vsm:w-6 vsm:h-6  text-indigo-900" />
                </button>
              </div>
              <div className="flex flex-col">
                <ul className="list-disc m-2">
                  {questions.map((question, index) => (
                    <li key={index} className="p-1 list-disc">
                      <button
                        onClick={() => speakQuestion(question, index)}
                        className=" "
                      ></button>
                      <button
                        className="p-0"
                        onClick={() => sendMessage(question.label)}
                      >
                        <li className="p-0 list-disc">{question.label} </li>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="block my-6 w-1/6 h-28  "></div>
            </div>

            <div className="">
              <Modal isOpen={error !== null} message={error} onClose={closeModal} />
            </div>

            <div className=" absolute flex   items-center bg-red-200  bottom-[14%] xl:bottom-[13%] z-40 w-3/4 ms:w-[60%] mmd:w-1/2 after:content-[''] after:absolute after:h-[134%] ms:after:h-[132%] after:-left-5 after:-top-1 after:w-[135%] ms:after:w-[130%] mmd:after:w-[120%] after:bg-gray-300 after:bg-opacity-90 ">
              <div className="flex h-1/6  min-w-[115%]  outline-none items-start  overflow-y-auto z-10">

                <FontAwesomeIcon
                  className={`text-3xl m-4 -translate-x-4 sm:translate-x-0 duration-300 sm:m-5 scale-110 hover:scale-150 ${listening ? "text-red-500" : "" // Conditionally set red color
                    } hover:text-red-500 hover:scale-150 absolute`}
                  icon={listening ? faMicrophone : faMicrophoneSlash}
                  onClick={toggleListening}
                  onChange={selectedLanguage}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="text"
                  className="ring-0 w-full bg-white border-2 border-slate-300 rounded-2xl px-8 sm:px-12 sm:pl-16 py-5 text-sm vsm:text-xl sm:text-2xl"
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  className="absolute -right-[12%] my-3 text-2xl p-2 hover:outline-offset-2 hover:scale-125   z-10 bg-slate-100 stroke-slate-600 border border-slate-400 flex justify-center rounded-lg  duration-300 hover:border-slate-900 hover:text-white focus:stroke-blue-200 focus:border-slate-200 focus:bg-blue-400 "
                  onClick={() => sendMessage(message)}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                    ></path>
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="M10.11 13.6501L13.69 10.0601"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* ANNOUNCEMENT SECTION */}
        {/* <div className="w-1/5 bg-indigo-950 p-4 max-h-screen overflow-y-hidden msm:block"> */}


        <div className="hidden ms:flex px-3 bg-slate-100 emd:px-1 max-h-screen min-w-1/4 border-l-2  z-40 max-w-1/4 ">
          <div className=" p-4 bg-slate-100 mmd:p-3 mmd:mr-2 lg:p-4  h-full w-1/4 lg:w-1/5 fixed  ">

            <div className="flex items-center xl:gap-3">
              <img
                src="https://img.icons8.com/papercut/60/commercial.png"
                alt="commercial"
                className=" w-8 h-8 scale-80 lg:scale-100 lg:w-11 lg:h-11 2xl:w-15 2xl:h-15"
              />
              <p className="text-base mmd:text-xl scale-80 xl:scale-100 xl:text-2xl ml-1 font-semibold ">Quick Announcement</p>
            </div>
            <div className="flex items-center justify-center p-5 mmd:-translate-x-4 lg:translate-x-0">
              <div className="flex justify-center min-w-full ">
                <input
                  type="text"
                  className="mmd:w-full shadow-lg    rounded-l-lg bg-white indent-2 text-base outline-0"
                  placeholder="Search "
                  value={selectedStation}
                  onChange={handleSelectChange}
                />
                <button type="submit" onClick={gettheannoucement}>
                  <div className="flex items-center p-2 justify-center rounded-r-lg hover:scale-105 duration-300   bg-blue-500 rounded-tr-lg rounded-br-lg border-r border-gray-200 text-white ">
                    <BsSearch className="w-4 h-4" />
                  </div>
                </button>
              </div>

            </div>
            {selectedStation.length > 0 && (
              <div className="suggestions-dropdown">
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    overflowY: 'auto', // Set overflow-y to auto for vertical scrolling
                    maxHeight: '150px', // Set a constant height
                    width: 'px', // Set width dynamically
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div style={{ padding: '8px' }}>
                        {suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex-grow  max-h-screen h-full overflow-scroll -translate-x-3 w-[112%]">


              <div className="flex  flex-col justify-around gap-0 mmd:mr-2 lg:mr-0">

                <p className="text-gray-400 text-xs text-center font-semibold ms:text-sm">{new Date().toDateString()}</p>
                {stationAnnouncement.length > 0 ? (
                  <div className="absolute flex-grow flex-col p-2 top-6 mt-2 w-full font-semibold text-red-600">

                    {stationAnnouncement.map((announcement, index) => (
                      <div key={index} className="my-4  border-2 border-gray-200 px-4 py-2  rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px]" id={`admin_announcement_${index}`}>
                        <button
                          onClick={() => handleSpeakAnnouncements(`admin_announcement_${index}`)}
                          className="-translate-y-2/3 -translate-x-[40%] outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
                        >
                          <FcSpeaker className=" w-4 h-4 vsm:w-6 vsm:h-6  text-indigo-900" />
                        </button>
                        <span className="leading-6  bg-yellow-200 rounded-3xl p-2">New</span>{' '}
                        {announcement.message}
                      </div>
                    ))}
                    <hr />
                    <hr></hr>
                    <div className="text-gray-400 font-semibold my-4 text-center border-t px-4 border-gray-600">Previous Announcements</div>
                    {previousAnnouncements.length > 0 ? (
                      previousAnnouncements.map((announcement, index) => (
                        <div key={index} className="my-4  border-2 border-gray-200 px-4 py-2  rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px]" id={`admin_announcement_${index}`}>
                          <button
                            onClick={() => handleSpeakAnnouncements(`admin_announcement_${index}`)}
                            className="-translate-y-2/3 -translate-x-[40%] outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
                          >
                            <FcSpeaker className=" w-4 h-4 vsm:w-6 vsm:h-6  text-indigo-900" />
                          </button>
                          <span className="leading-6  bg-yellow-200 rounded-3xl p-2">Old</span>{' '}
                          {announcement.message}
                        </div>
                      ))
                    ) : (
                      <p>No previous announcements available.</p>
                    )}
                    <div className="w-full h-10 my-36"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-red-500">No previous announcements available.</p>
                  </>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>

      {(isAnnouncementOpen) && (
        <div className={`fixed flex border-r-2 flex-col top-[10%] h-full inset-0 max-h-screen  overflow-scroll  px-2 cp:p-0 w-full cp:w-[85%] cpm:w-3/5  cpm:min-w-2/5 vsm:w-2/5 ms:hidden bg-slate-100 ${isOpenSidebar === true ? 'z-40 ' : 'z-20'} shadow-[0_20px_25px_rgba(0,_1,_4,_0.7)] `}>
          <div className="ms:hidden flex flex-col max-h-screen border-l-2">
            <div className="flex mt-4 xl:gap-3 items-center">
              <img
                src="https://img.icons8.com/papercut/60/commercial.png"
                alt="commercial"
                className="w-12 h-12 scale-80 lg:scale-100 lg:w-14 lg:h-14 2xl:w-17 2xl:h-17"
              />
              <p className="text-base mmd:text-xl scale-80 xl:scale-100 xl:text-2xl ml-1 font-semibold">Announcement</p>
            </div>

            <div className="flex items-center justify-center p-5 mx-auto">
              <div className="flex justify-center min-w-40 w-36 z-40 ">
                <input
                  type="text"
                  className="w-full shadow-lg  text-xs sm:text-base emd:max-w-[120%] rounded-l-lg bg-white px-2 outline-0"
                  placeholder="Search "
                  value={selectedStation}
                  onChange={handleSelectChange}
                />
                <button type="submit" onClick={gettheannoucement} className="hover:scale-110">
                  <div className="flex items-center p-2 justify-center rounded-r-lg hover:scale-105 duration-300   bg-blue-500 rounded-tr-lg rounded-br-lg border-r border-gray-200 text-white ">
                    <BsSearch className="w-4 h-4" />
                  </div>
                </button>
              </div>

            </div>
            {selectedStation.length > 0 && (
              <div className="suggestions-dropdown">
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    overflowY: 'auto', // Set overflow-y to auto for vertical scrolling
                    maxHeight: '150px', // Set a constant height
                    width: 'px', // Set width dynamically
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div style={{ padding: '8px' }}>
                        {suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex-grow mx-auto ml-2 max-h-screen h-full overflow-scroll -translate-x-3 w-[100%]">

              <div className="flex  justify-around  gap-0 mmd:mr-2 lg:mr-0  p-3">
                <p className="text-gray-600 font-semibold text-sm ms:text-base mr-2 cpm:mr-1">20 oct 2023</p>
                <div className="relative flex-col">

                  {stationAnnouncement.length > 0 ? (
                    <div className="absolute top-6 mt-1 w-full font-bold text-red-600">
                      <h2>Top Four Announcements:</h2>
                      {stationAnnouncement.map((announcement, index) => (
                        <div key={index}>
                          <span className="bg-yellow-200 rounded-3xl p-2">New</span>{' '}
                          {announcement.message}
                        </div>
                      ))}
                      <hr />
                      <h2>Previous Announcements:</h2>
                      {previousAnnouncements.length > 0 ? (
                        previousAnnouncements.map((announcement, index) => (
                          <div key={index}>
                            <span className="bg-green-200 rounded-3xl p-2">Old</span>{' '}
                            {announcement.message}
                          </div>
                        ))
                      ) : (
                        <p>No previous announcements available.</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <p>No previous announcements available.</p>
                    </>
                  )}

                </div>
              </div>

              <div className="block w-1 h-20 my-12"></div>


            </div>
          </div>


        </div>
      )}
    </div>

  );


};

export default ChatBoat;


