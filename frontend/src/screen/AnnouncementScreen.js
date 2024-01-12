import React, { useState, useEffect, useRef } from "react";
import "../style/Announcement.css"
import { BsSearch } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import axios from 'axios';
import Topbar from "../component/Topbar";

import { RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

function AnnouncementScreen() {

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [listening, setListening] = useState(false);
  const [listening2, setListening2] = useState(false);
  const [speech] = useState(new SpeechSynthesisUtterance());
  const path = 'http://127.0.0.1:5000'
  const [records, setRecords] = useState([]);
  const [records1, setRecords1] = useState([]);
  const [records2, setRecords2] = useState([]);
  const selectedLanguage = localStorage.getItem('selectedLanguage')
  const [to, setTo] = useState([]);
  const [from, setFrom] = useState([]);
  const [toDelayFrom, setToDelayFrom] = useState([]);
  const [Atstation, setAtstation] = useState([]);
  const [Moreinfo, setMoreinfo] = useState([]);
  const [plateformNumber, setplateformNumber] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [stationNames, setStationNames] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [stationAnnouncement, setStationAnnouncement] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/getStationNamesCSV');
        const data = response.data;
        const formattedStationNames = data.map(item => `${item['Station Name']} (${item['Stn Code']})`);

        setStationNames(formattedStationNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching station names:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    if(listening){
    setMessage(transcript);
    }
    else if(listening2) {
      setMessage2(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    const defaultVoice = window.speechSynthesis.getVoices()[160];
    speech.voice = defaultVoice;
  }, []);

  
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    console.log(message)
  };

  const handleSelectChange = event => {
    const inputvalll = event.target.value;
    setMessage2(message2);
    setSelectedStation(event.target.value);
    const filteredSuggestions = getSuggestions(inputvalll);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedStation(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();

    // Filter out non-string values and then perform the lowercase check
    const filteredStations = stationNames.filter((name) => {
      if (typeof name === 'string') {
        return name.toLowerCase().includes(inputValueLowerCase);
      }
      return false; // Skip non-string values
    });

    return filteredStations;
  };

  const buildAnnouncementText = (announcement) => {
    announcement = 'The' + announcement.train_name + ', is delayed by' + announcement.delay_hr + 'hrs' + announcement.delay_ms + 'minits'
      + ', from' + announcement.source + ', to' + announcement.destination + ', Junction' + ',the current location of train is,' + announcement.current_station_name
      + 'Platefrom number' + announcement.platform_number + ' , More Information is,' + announcement.readable_message;
    return announcement
  }

  const buildAnnouncementText1 = (announcement) => {
    announcement = announcement.train_name + ', को विलंबित किया जाता है' + announcement.delay_hr + 'hrs' + announcement.delay_ms + 'minits से'
      + ', रेलवे प्रस्थान बिंदू' + announcement.source + ', रेलवे अंतिम बिंदु' + announcement.destination + ', संगम' + ', किस स्टेशन पर है,' + announcement.current_station_name
      + ', पटरी नंबर' + announcement.platform_number + ' , अधिक जानकारी,' + announcement.readable_message;
    return announcement
  }

  const buildAnnouncementText2 = (announcement) => {
    announcement = announcement.train_name + `${toDelayFrom}` + announcement.delay_hr + 'hrs' + announcement.delay_ms + 'minits'
      + `, ${from}` + announcement.source + `, ${to}` + announcement.destination + ', ' + `,${Atstation},` + announcement.current_station_name
      + `, ${plateformNumber}` + announcement.platform_number + ` , ${Moreinfo},` + announcement.readable_message;
    return announcement
  }


  const handleSpeak = (announcement) => {
    const textToSpeak = buildAnnouncementText(announcement);

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


  const handleSpeak1 = (announcement) => {

    const textToSpeak = buildAnnouncementText1(announcement); // Use the announcement data
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


  const handleSpeak2 = (announcement) => {

    const textToSpeak = buildAnnouncementText2(announcement); // Use the announcement data
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


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getAnnouncements();
    }
  };

  const translationMain = async (inputTransMeassage) => {
    try {
      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/translation/automatic_translation",
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2Y0ZTU1MWYtODJmNy00ZDliLWJkMWUtYmU3YzcxMmY5MTE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.akjNg6WygsfegM_1c4Hd-ZvVvkI1YEXGNYMNIyTuVkg",
        },
        data: {
          providers: "microsoft",
          text: inputTransMeassage,
          target_language: 'hi',
          fallback_providers: "",
        },
      };

      const response = await axios.request(options);
      const translatedText = response.data.microsoft.text;
      return translatedText
    }
    catch (error) {
      console.error(error);
    }
  }

  

  const toggleListening2 = () => {

    if (listening2) {
      SpeechRecognition.stopListening();
    } else {
      const selectedLanguage = 'en'
      //   localStorage.getItem('selectedLanguage')
      const options = { continuous: true, language: selectedLanguage };
      SpeechRecognition.startListening(options);
    }
    setListening2(!listening2);

    if (listening2 && message2.trim() !== ""    ) {
      setMessage2(message2);
    setSelectedStation(message2);
    const filteredSuggestions = getSuggestions(message2);
    setSuggestions(filteredSuggestions);
      // selectedStation(message);
    }
    resetTranscript();
  };


  const toggleListening = () => {

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      const selectedLanguage = 'en'
      //   localStorage.getItem('selectedLanguage')
      const options = { continuous: true, language: selectedLanguage };
      SpeechRecognition.startListening(options);
    }
    setListening(!listening);
    if (listening && message.trim() !== "") {
      setMessage(message);
      // selectedStation(message);
    }
    resetTranscript();
  };


  const translationMain1 = async (inputTransMeassage) => {
    try {
      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/translation/automatic_translation",
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2Y0ZTU1MWYtODJmNy00ZDliLWJkMWUtYmU3YzcxMmY5MTE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.akjNg6WygsfegM_1c4Hd-ZvVvkI1YEXGNYMNIyTuVkg",
        },
        data: {
          providers: "google",
          text: inputTransMeassage,
          target_language: selectedLanguage,
          fallback_providers: "",
        },
      };

      const response = await axios.request(options);
      const translatedText = response.data.google.text;
      return translatedText
    }
    catch (error) {
      console.error(error);
    }
  }

  const transaltionMain2 = async (inputTransMeassage) => {
    const translatedText = await axios.post(`${path}/translationAnyLnaguage`,{inputMessage: inputTransMeassage, language :selectedLanguage})
    console.log(translatedText)
    return translatedText.data
  }

  const getAnnouncements = async () => {
    console.log('the announcement function is trigerred')
    setStationAnnouncement('')
    try {
      if (selectedStation) {
        axios.get(`${path}/announcement_by_station_single/${selectedStation}`)
          .then(response => {
            setStationAnnouncement(response.data.message);
          })
          .catch(error => {
            console.error('There was a problem fetching the data:', error);
          });
      }
      const announcementData = await axios.post(`${path}/announcement`, { message: message });

      if (announcementData && announcementData.data) {
        let api_data = announcementData.data.data;
        api_data.current_station_name = api_data.current_station_name.replace(/~/g, '');
        const hours = Math.floor(api_data.delay / 60);
        const minutes = api_data.delay % 60;
        // Creating an object with the specified fields
        const newAnnouncement = {
          update_time: api_data.update_time,
          current_station_code: api_data.current_station_code,
          current_station_name: api_data.current_station_name,
          destination: api_data.destination,
          source: api_data.source,
          last_station_name: api_data.last_station_name,
          delay: api_data.delay,
          delay_hr: hours,
          delay_ms: minutes,
          new_alert_msg: api_data.new_alert_msg,
          train_name: api_data.train_name,
          train_number: api_data.train_number,
          readable_message: api_data.readable_message,
          platform_number: api_data.platform_number,
          departure_time: api_data.departure_time,
          is_train_cancelled: api_data.is_train_cancelled,
          is_train_reached: api_data.is_train_reached
        };

        setRecords([...records, newAnnouncement]);

        const variable = api_data.current_station_code + "," +
          api_data.current_station_name + "," +
          api_data.destination + "," +
          api_data.source + "," +
          api_data.last_station_name + "," +
          api_data.new_alert_msg + "," +
          api_data.train_name + "," +
          api_data.readable_message

        const variable1 = await translationMain(variable)
        console.log(variable1)
        const dataArray = variable1.split(',');
        const newAnnouncement1 = {
          update_time: api_data.update_time,
          current_station_code: dataArray[0],
          current_station_name: dataArray[1],
          destination: dataArray[2],
          source: dataArray[3],
          last_station_name: dataArray[4],
          delay: api_data.delay,
          delay_hr: hours,
          delay_ms: minutes,
          new_alert_msg: dataArray[5],
          train_name: dataArray[6],
          train_number: api_data.train_number,
          readable_message: dataArray[7],
          platform_number: api_data.platform_number,
          departure_time: api_data.departure_time,
          is_train_cancelled: api_data.is_train_cancelled,
          is_train_reached: api_data.is_train_reached
        };

        if (newAnnouncement1.train_name.trim() === 'अपरिभाषित') {
          newAnnouncement1.train_name = api_data.train_name
        }
        setRecords1([...records1, newAnnouncement1]);

        const variable2 = await transaltionMain2(variable)
        
        const dataArray1 = variable2.split(',');
        // console.log(dataArray1)
        const newAnnouncement2 = {
          update_time: api_data.update_time,
          current_station_code: dataArray1[0],
          current_station_name: dataArray1[1],
          destination: dataArray1[2],
          source: dataArray1[3],
          last_station_name: dataArray1[4],
          delay: api_data.delay,
          delay_hr: hours,
          delay_ms: minutes,
          new_alert_msg: dataArray1[5],
          train_name: dataArray1[6],
          train_number: api_data.train_number,
          readable_message: dataArray1[7],
          platform_number: api_data.platform_number,
          departure_time: api_data.departure_time,
          is_train_cancelled: api_data.is_train_cancelled,
          is_train_reached: api_data.is_train_reached
        };

        setRecords2([...records2, newAnnouncement2]);

        const variable4 = await transaltionMain2('final destination' + ';' + 'starting point' + ';' + ' is delayed by ' + ';' + ' live location ' + ';' + ' More Information' + ';' + 'plateform Number')
        const dataArray2 = variable4.split(';');

        setTo(dataArray2[0])
        setFrom(dataArray2[1])
        setToDelayFrom(dataArray2[2])
        setAtstation(dataArray2[3])
        setMoreinfo(dataArray2[4])
        setplateformNumber(dataArray2[5])

      } else {
        console.error('No data received or incorrect response structure');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function HeadingBar() {
    return (
      <div className="flex bg-cyan-50 rounded-t-lg bg-opacity-90 justify-between items-center font-bold text-gray-900 px-4 py-1 mt-4">
        <h2 className="text-xl ">English</h2>
        <h2 className="text-xl ">Hindi</h2>
        <h2 className="text-xl ">Other Language: {selectedLanguage}</h2>
      </div>
    );
  }

  function firstPaneContent() {
    return (
      <div className="">
         {loading && (
        // Show ring loader if loading is true
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RingLoader color="#3498db" size={50} loading={loading} />
        </div>
      )}
        {records.map((announcement, index) => (
          <div
            // ref={index === announcements.length - 1 ? lastItemRef : null}
            key={index} className="snap-always snap-center flex  gap-3 items-center  mx-3 md:mx-0 mt-10 scale-100 delay-100   duration-75 w-[90%] h-30 bg-white rounded-lg shadow-lg" >

            <section className="block mx-1 mt-3 ">
              <button

                onClick={() => handleSpeak(announcement)}
                className=" bg-green-200 hover:scale-125 rounded-3xl  -translate-y-6 cursor-pointer"
              >
                <FcSpeaker className="w-8 h-8 " />
              </button>
              <div className="pl-2 -translate-y-4">
                <p className="flex flex-wrap font-bold mb-2 text-xs emd:text-base">
                  The
                  <span className="mx-1 flex font-semibold text-xs emd:text-base whitespace-nowrap">
                    {announcement.train_name || '---'}
                  </span>

                  <span className="whitespace-normal">
                    {(!announcement.is_train_cancelled || !announcement.is_train_reached) && (<p>is delayed by<span className="mx-1" />{announcement.delay_hr}<span>hr</span> {announcement.delay_ms} min</p>
                    )}
                  </span>
                </p>

                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/train.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    From:  {announcement.source || '---'}
                  </p>
                </div>
                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/train.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    To: {announcement.destination || '---'}
                  </p>
                </div>
                {(!announcement.is_train_cancelled) && (
                  <div className="flex gap-3">
                    <img
                      className="w-6 h-6 relative"
                      src="https://img.icons8.com/material-rounded/24/marker.png"
                      alt="marker"
                    />
                    <h3 className="text-gray-600 font-semibold text-xs emd:text-base">
                      At station: {announcement.current_station_name || '---'}
                    </h3>
                  </div>

                )}
                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/marker.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    Platefrom: {announcement.platform_number || 'unknown'}
                  </p>
                </div>
                <p>More info: {announcement.new_alert_msg || 'Not available'}</p>
              </div>
              <p className="text-sm text-gray-500 text-end ">{new Date().toLocaleTimeString()}</p>
            </section>

          </div>
        ))}
        <div className="flex w-2 h-6 my-4"></div>
      </div>
    );
  };

  function secondPaneContent() {
    return (
      <div className="flex-grow flex-col-reverse ">
         {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RingLoader color="#3498db" size={50} loading={loading} />
        </div>
      )}
        {records1.map((announcement, index) => (
          <div
            // ref={index === announcements.length - 1 ? lastItemRef : null}
            key={index} className="snap-always snap-center flex  gap-3 items-center  mx-3 md:mx-0 mt-10 scale-100 delay-100  duration-75 w-[90%] h-30 bg-white rounded-lg shadow-lg" >

            <section className="block mx-1 mt-3 ">
              <button
                onClick={() => handleSpeak1(announcement)}
                className=" bg-green-200 hover:scale-125 rounded-3xl  -translate-y-6 cursor-pointer"
              >
                <FcSpeaker className="w-8 h-8 " />
              </button>
              <div className="pl-2 -translate-y-4">
                <p className="flex flex-wrap font-bold mb-2 text-xs emd:text-base">

                  <span className="mx-1 flex font-semibold text-xs emd:text-base whitespace-nowrap">
                    {announcement.train_name || '---'}
                  </span>

                  <span className="whitespace-normal">
                    {(!announcement.is_train_cancelled || !announcement.is_train_reached) && (<p>को विलंबित किया जाता है<span className="mx-1" />{announcement.delay_hr}<span>hr</span> {announcement.delay_ms} min से</p>
                    )}
                  </span>
                </p>

                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/train.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    प्रस्थान बिंदू:  {announcement.source || '---'}
                  </p>
                </div>
                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/train.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    अंतिम बिंदु: {announcement.destination || '---'}
                  </p>
                </div>
                {(!announcement.is_train_cancelled) && (
                  <div className="flex gap-3">
                    <img
                      className="w-6 h-6 relative"
                      src="https://img.icons8.com/material-rounded/24/marker.png"
                      alt="marker"
                    />
                    <h3 className="text-gray-600 font-semibold text-xs emd:text-base">
                      किस स्टेशन पर है: {announcement.current_station_name || '---'}
                    </h3>
                  </div>
                )}
                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/marker.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    पटरी नंबर: {announcement.platform_number || 'unknown'}
                  </p>
                </div>
                <p>अधिक जानकारी: {announcement.new_alert_msg || 'Not available'}</p>
              </div>
              <p className="float-right text-sm text-gray-500"><span className="hidden mr-1" ></span>{new Date().toLocaleTimeString()}</p>
            </section>

          </div>
        ))}
      </div>
    );
  };

  function thirdPaneContent() {
    return (
      <div className="flex flex-col  ">
        {records2.map((announcement, index) => (
          <div
            key={index} className="snap-always snap-center flex  gap-3 items-center  mx-3 md:mx-0 mt-10 scale-100 delay-100   duration-75 w-[90%] h-30 bg-white rounded-lg shadow-lg" >
            <section className="block mx-1 mt-3 ">
              <button
                onClick={() => handleSpeak2(announcement)}
                className=" bg-green-200 hover:scale-125 rounded-3xl  -translate-y-6 cursor-pointer"
              >
                <FcSpeaker className="w-8 h-8 " />
              </button>
              <div className="pl-2 -translate-y-4">
                <p className="flex flex-wrap font-bold mb-2 text-xs emd:text-base">

                  <span className="mx-1 flex font-semibold text-xs emd:text-base whitespace-nowrap">
                    {announcement.train_name || '---'}
                    {(index == 1) && (<p></p>)}
                  </span>

                  <span className="whitespace-normal">
                    {(!announcement.is_train_cancelled || !announcement.is_train_reached) && (<p>{toDelayFrom}<span className="mx-1" />{announcement.delay_hr}<span>hr</span> {announcement.delay_ms} min</p>
                    )}
                  </span>
                </p>

                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/train.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    {from}:  {announcement.source || '---'}
                  </p>
                </div>
                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/train.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    {to}: {announcement.destination || '---'}
                  </p>
                </div>
                {(!announcement.is_train_cancelled) && (
                  <div className="flex gap-3">
                    <img
                      className="w-6 h-6 relative"
                      src="https://img.icons8.com/material-rounded/24/marker.png"
                      alt="marker"
                    />
                    <h3 className="text-gray-600 font-semibold text-xs emd:text-base">
                      {Atstation}: {announcement.current_station_name || '---'}
                    </h3>
                  </div>

                )}
                <div className="flex  gap-3">
                  <img
                    className="w-6 h-6 relative"
                    src="https://img.icons8.com/stickers/100/marker.png"
                    alt="train"
                  />
                  <p className="text-gray-600 font-semibold text-xs emd:text-base">
                    {plateformNumber}: {announcement.platform_number || 'unknown'}
                  </p>
                </div>
                <p>{Moreinfo}: {announcement.new_alert_msg || 'Not available'}</p>
              </div>
              <p className="float-right text-sm text-gray-500"><span className="hidden mr-1" ></span>{new Date().toLocaleTimeString()}</p>
            </section>
          </div>
        ))}

      </div>
    );
  };

  return (
    <div className="bg-slate-100">
      <nav className="fixed top-0 left-0 right-0 z-50  shadow mb-2">
        <Topbar />
      </nav>

      <div className="bg-slate-100 py-10 relative top-11 h-full">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <div className="fixed top-[11%] bg-gray-100 left-0 right-0 z-50 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] flex items-center justify-around">

            <div className="flex items-center translate-y-[-2/3] md:translate-y-0 my-1">
              <img
                src="https://img.icons8.com/papercut/60/commercial.png"
                alt="commercial"
                className="w-14 h-14 sm:w-18"
              />
              <h1 className="flex text-sm sm:text-2xl font-semibold ml-4 xl:text-3xl">Announcements</h1>
            </div>
            <div className="relative">
              <div className="flex items-center rounded-lg  shadow-lg  overflow-hidden">
              <button
            type="button"
            class="p-2  hover:scale-110 rounded-lg cursor-pointer  hover:bg-gray-100   "
          >
            <FontAwesomeIcon
              className={`text-3xl duration-300  scale-110 hover:scale-110 ${listening2 ? "text-green-500 before:content[''] before:absolute before:z-20 before:items-center before:w-8 before:h-8 before:bg-cyan-300" : ""}  hover:scale-110 `}
              icon={listening2 ? faMicrophone : faMicrophoneSlash}
              onClick={toggleListening2}
              style={{ cursor: "pointer" }}
            />
          </button>
                <input
                  type="text"
                  placeholder="Station Name"
                  className="text-base border focus:border-cyan-400 focus:border-2  duration-300   rounded-l-lg  border-gray-300 px-2 py-2 focus:outline-none sm:text-xl  w-[44%]"
                  value={selectedStation}
                  onChange={handleSelectChange}
                />

                <div className="border-l border-gray-300"></div>
                <button
            type="button"
            class="p-2  hover:scale-110 rounded-lg cursor-pointer  hover:bg-gray-100   "
          >
            <FontAwesomeIcon
              className={`text-3xl duration-300  scale-110 hover:scale-110 ${listening ? "text-green-500 before:content[''] before:absolute before:z-20 before:items-center before:w-8 before:h-8 before:bg-cyan-300" : ""}  hover:scale-110 `}
              icon={listening ? faMicrophone : faMicrophoneSlash}
              onClick={toggleListening}
              style={{ cursor: "pointer" }}
            />
          </button>

                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Train Number"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="text-base px-2 py-2   focus:border-cyan-400 focus:border-2  duration-300 rounded-r-lg focus:outline-none sm:text-xl w-full"
                  />

                  <button onClick={getAnnouncements} className="absolute rounded p-1 sm:px-1 top-0 right-0 bg-blue-500 h-full">
                    <BsSearch className='w-4 vsm:scale-150  first-letter vsm:w-10 ms:w-12  text-white ' />
                  </button>
                </div>
              </div>

              {selectedStation.length > 0 && (
                <div className="suggestions-dropdown absolute bg-white border border-gray-300 rounded-lg mt-1">
                  <div
                    style={{
                      overflowY: 'auto', // Set overflow-y to auto for vertical scrolling
                      maxHeight: '150px', // Set a constant height
                      width: '100%', // Set full width
                    }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item border-b border-gray-200"
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
            </div>
          </div>

            <div className="bg-gray-100 py-10 relative top-8 ">
              {stationAnnouncement.length > 0 ? (
                <div className=" text-center w-full font-bold text-red-600 z-10 bg-white p-4 shadow-md">
                    <div className="text-center">
                    <marquee behavior="scroll" direction="left">
                      <span className="bg-yellow-200 rounded-2xl p-2">New</span>{' '}
                      {stationAnnouncement}
                    </marquee>
                  </div>

                </div>
              ) : (
                <div className="absolute  left-0 w-full font-bold text-red-600 z-10 bg-white p-4 shadow-md">
                  <marquee behavior="scroll" direction="left">
                      <p>No previous announcements available.</p>
                      </marquee>
                </div>
              )}
              </div>

              <div className="function-list-content relative top-10 mt-2  max-w-screen h-screen-1/2 w-full overflow-hidden">
              <HeadingBar />
                <SplitterComponent id="expand-collapse" className="w-full h-full">
                  <PanesDirective>
                    <PaneDirective className="flex flex-col-reverse first-letter:" content={firstPaneContent} collapsible={true} />
                    <PaneDirective content={secondPaneContent} collapsible={true} />
                    <PaneDirective content={thirdPaneContent} collapsible={true} />
                  </PanesDirective>
                </SplitterComponent>
              </div>
        </div>
      </div>
    </div>
  );

}
export default AnnouncementScreen;


