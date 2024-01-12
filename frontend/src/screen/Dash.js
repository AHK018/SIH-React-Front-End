import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import arrivaIcon from "../asset/arrivaIcon.png";
import { Link } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa6";
import axios from "axios";
import { FcSpeaker } from "react-icons/fc";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const path = "http://127.0.0.1:5000";

export default function Dash() {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const [speech] = useState(new SpeechSynthesisUtterance());
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [suggestions3, setSuggestions3] = useState([]);
  const [suggestions4, setSuggestions4] = useState([]);
  const [suggestions5, setSuggestions5] = useState([]);
  const [suggestions6, setSuggestions6] = useState([]);
  const [suggestions7, setSuggestions7] = useState([]);
  const [suggestions8, setSuggestions8] = useState([]);
  const [suggestions9, setSuggestions9] = useState([]);
  const [suggestions10, setSuggestions10] = useState([]);
  const [suggestions11, setSuggestions11] = useState([]);
  const [suggestions12, setSuggestions12] = useState([]);
  const [stationNames, setStationNames] = useState([]);
  const [fetchData, setFetchData] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      const response2 = await axios.get("http://127.0.0.1:5000/transcribe_audio");
      setFetchData(response2.data);
      console.log(response2.data);
      announcement6.message = response2.data;
    } catch (e) {
      console.log("Fetched");
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/getStationNamesCSV"
        );
        const data = response.data;
        const formattedStationNames = data.map(
          (item) => `${item["Station Name"]} (${item["Stn Code"]})`
        );

        setStationNames(formattedStationNames);
      } catch (error) {
        console.error("Error fetching station names:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const defaultVoice = window.speechSynthesis.getVoices()[160];
    speech.voice = defaultVoice;
  }, []);

  const [announcement, setAnnouncement] = useState({
    station_code: "",
    station_name: "",
    source_name: "",
    destination_name: "",
    train_name: "",
    train_number: "",
    message: "",
    old_route: "---",
    changed_route: "---",
    platform: "---",
    delay: "---",
    arrivingAt: "",
    departingAt: "",
  });

  const [announcement2, setAnnouncement2] = useState({
    station_code: "",
    station_name: "",
    source_name: "",
    destination_name: "",
    train_name: "",
    train_number: "",
    message: "---",
    old_route: "---",
    changed_route: "--",
    platform: "---",
    delay: "--",
    arrivingAt: "",
    departingAt: "",
  });

  const [announcement4, setAnnouncement4] = useState({
    station_code: "",
    station_name: "",
    source_name: "",
    destination_name: "",
    train_name: "",
    train_number: "",
    message: "---",
    old_route: "---",
    changed_route: "--",
    platform: "---",
    delay: "--",
    arrivingAt: "",
    departingAt: "",
  });

  const [announcement3, setAnnouncement3] = useState({
    station_code: "",
    station_name: "",
    source_name: "",
    destination_name: "",
    train_name: "",
    train_number: "",
    message: "--",
    old_route: "---",
    changed_route: "---",
    platform: "--",
    delay: "--",
    arrivingAt: "",
    departingAt: "",
  });

  const [announcement5, setAnnouncement5] = useState({
    station_code: "",
    station_name: "",
    source_name: "",
    destination_name: "",
    train_name: "",
    train_number: "",
    arrivingAt: "",
    departingAt: "",
    message: "--",
    old_route: "--",
    changed_route: "--",
    platform: "",
    delay: "--",
  });

  const [announcement6, setAnnouncement6] = useState({
    station_code: "",
    station_name: "",
    source_name: "",
    destination_name: "",
    train_name: "",
    train_number: "",
    arrivingAt: "",
    departingAt: "",
    message: "--",
    old_route: "--",
    changed_route: "--",
    platform: "",
    delay: "--",
  });

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage")
  );


  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'mr', label: 'Marathi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'ta', label: 'Tamil' }
  ];
  const handleLanguage = (event) => {
    const language = event.target.value;

    setSelectedLanguage(language);
    window.location.reload()

    localStorage.setItem("selectedLanguage", language);
    console.log("Selected Language:", language);
  };

  useEffect(() => {
    // Load initial translations
  }, [selectedLanguage]);
  const handleSend = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Do you really want to continue?");
    if (confirmed) {
      try {
        announcement4.message = message;
        const response4 = await axios.post(
          `${path}/master_add_announcements`,
          announcement4
        );
        console.log(response4.data); // Log the response from the backend
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Action cancelled by the user
      console.log("Action cancelled!");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleInputChange = (e) => {
    announcement4.message = message;
    setMessage(e.target.value);
  };

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();

    // Filter out non-string values and then perform the lowercase check
    const filteredStations = stationNames.filter((name) => {
      if (typeof name === "string") {
        return name.toLowerCase().includes(inputValueLowerCase);
      }
      return false; // Skip non-string values
    });

    return filteredStations;
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      const selectedLanguage = localStorage.getItem("selectedLanguage")
      const options = { continuous: true, language: selectedLanguage };
      SpeechRecognition.startListening(options);
    }
    setListening(!listening);
    if (listening && message.trim() !== "") {
      setMessage(message);
    }
    resetTranscript();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Train Cancelation Responce Is Submited Sucessfully");
    try {
      announcement.message = `Your attention please, we are sorry that the ${announcement.train_name} having train number ${announcement.train_number} with route from ${announcement.source_name} to ${announcement.destination_name} Station has been cancelled. This is due to unforeseen issues.`;
      const response = await axios.post(
        `${path}/master_add_announcements`,
        announcement
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error In Submitting");
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    alert("Train Delayed Responce Is Submited Sucessfully");
    try {
      announcement2.message = `Attention, please. We regret to inform you that the ${announcement2.train_name} train, numbered ${announcement2.train_number} is delayed by ${announcement2.delayed}, scheduled to travel from ${announcement2.source_name} to ${announcement2.destination_name}, is experiencing a delay. `;
      const response2 = await axios.post(
        `${path}/master_add_announcements`,
        announcement2
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error In Submitting");
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    alert("Route Changed Responce Is Submited Sucessfully");
    try {
      announcement3.message = `Attention, please. We would like to inform you that the route for the ${announcement3.train_name} train, numbered ${announcement3.train_number}, previously scheduled from ${announcement3.old_route} has been changed. The new route will now include ${announcement3.changed_route}. `;
      const response3 = await axios.post(
        `${path}/master_add_announcements`,
        announcement3
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error In Submitting");
    }
  };

  const handleSubmit5 = async (e) => {
    e.preventDefault();
    alert("Train Arriving Responce Is Submited Sucessfully");
    console.log(announcement5);
    try {
      const response5 = await axios.post(
        `${path}/master_add_announcements`,
        announcement5
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error In Submitting");
    }
  };

  const handleSubmit6 = async (e) => {
    e.preventDefault();
    alert("Train Arriving Responce Is Submited Sucessfully");
    console.log(announcement5);
    try {
      const response6 = await axios.post(
        `${path}/master_add_announcements`,
        announcement6
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error In Submitting");
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const { name, value } = e.target;
    const filteredSuggestions = getSuggestions(inputValue);
    let updatedAnnouncement = { ...announcement };
    if (name === "station_name") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        station_name: value,
      };
      setSuggestions8(filteredSuggestions);
    } else if (name === "source_name") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        source_name: value,
      };
      setSuggestions9(filteredSuggestions);
    } else if (name === "station_code") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        station_code: value,
      };
    } else if (name === "message") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        message: value,
      };
    } else if (name === "destination_name") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        destination_name: value,
      };
      setSuggestions10(filteredSuggestions);
    } else if (name === "train_name") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        train_name: value,
      };
    } else if (name === "old_route") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        old_route: value,
      };
    } else if (name === "changed_route") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        changed_route: value,
      };
    } else if (name === "train_number") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        train_number: value,
      };
    } else if (name === "platform") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        platform: value,
      };
    } else if (name === "delay") {
      updatedAnnouncement = {
        ...updatedAnnouncement,
        delay: value,
      };
    }
    setAnnouncement(updatedAnnouncement);
  };

  const handleChange2 = (e) => {
    const inputValue = e.target.value;
    const { name, value } = e.target;
    const filteredSuggestions = getSuggestions(inputValue);
    let updatedAnnouncement2 = { ...announcement2 };
    if (name === "station_name") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        station_name: value,
      };
      setSuggestions5(filteredSuggestions);
    } else if (name === "source_name") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        source_name: value,
      };
      setSuggestions6(filteredSuggestions);
    } else if (name === "station_code") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        station_code: value,
      };
    } else if (name === "message") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        message: value,
      };
    } else if (name === "destination_name") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        destination_name: value,
      };
      setSuggestions7(filteredSuggestions);
    } else if (name === "train_name") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        train_name: value,
      };
    } else if (name === "old_route") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        old_route: value,
      };
    } else if (name === "changed_route") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        changed_route: value,
      };
    } else if (name === "train_number") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        train_number: value,
      };
    } else if (name === "platform") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        platform: value,
      };
    } else if (name === "delay") {
      updatedAnnouncement2 = {
        ...updatedAnnouncement2,
        delay: value,
      };
    }
    setAnnouncement2(updatedAnnouncement2);
  };

  const handleChange3 = (e) => {
    const inputValue = e.target.value;
    const { name, value } = e.target;
    const filteredSuggestions = getSuggestions(inputValue);
    let updatedAnnouncement3 = { ...announcement3 };
    if (name === "station_name") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        station_name: value,
      };
      setSuggestions2(filteredSuggestions);
    } else if (name === "source_name") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        source_name: value,
      };
      setSuggestions3(filteredSuggestions);
    } else if (name === "station_code") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        station_code: value,
      };
    } else if (name === "message") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        message: value,
      };
    } else if (name === "destination_name") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        destination_name: value,
      };
      setSuggestions4(filteredSuggestions);
    } else if (name === "train_name") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        train_name: value,
      };
    } else if (name === "old_route") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        old_route: value,
      };
    } else if (name === "changed_route") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        changed_route: value,
      };
    } else if (name === "train_number") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        train_number: value,
      };
    } else if (name === "platform") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        platform: value,
      };
    } else if (name === "delay") {
      updatedAnnouncement3 = {
        ...updatedAnnouncement3,
        delay: value,
      };
    }
    setAnnouncement3(updatedAnnouncement3);
  };

  const handleChange4 = (e) => {
    const inputValue = e.target.value;
    const { name, value } = e.target;
    setAnnouncement4({ ...announcement4, [name]: value });
    const filteredSuggestions = getSuggestions(inputValue);
    setSuggestions1(filteredSuggestions);
  };

  const handleChange5 = (e) => {
    const inputValue = e.target.value;
    const { name, value } = e.target;
    setAnnouncement5({ ...announcement5, [name]: value });
    if (name === "station_name") {
      const filteredSuggestions = getSuggestions(inputValue);
      setSuggestions11(filteredSuggestions);
    }
  };

  const handleChange6 = (e) => {
    const inputValue = e.target.value;
    const { name, value } = e.target;
    setAnnouncement6({ ...announcement6, [name]: value });
    if (name === "station_name") {
      const filteredSuggestions = getSuggestions(inputValue);
      setSuggestions12(filteredSuggestions);
    }
  };

  const handleSuggestionClick1 = (suggestion) => {
    announcement4.station_name = suggestion;
    setSuggestions1([]);
  };

  const handleSuggestionClick2 = (suggestion) => {
    announcement3.station_name = suggestion;
    setSuggestions2([]);
  };

  const handleSuggestionClick3 = (suggestion) => {
    announcement3.source_name = suggestion;
    setSuggestions3([]);
  };

  const handleSuggestionClick4 = (suggestion) => {
    announcement3.destination_name = suggestion;
    setSuggestions4([]);
  };

  const handleSuggestionClick5 = (suggestion) => {
    announcement2.station_name = suggestion;
    setSuggestions5([]);
  };

  const handleSuggestionClick6 = (suggestion) => {
    announcement2.source_name = suggestion;
    setSuggestions6([]);
  };

  const handleSuggestionClick7 = (suggestion) => {
    announcement2.destination_name = suggestion;
    setSuggestions7([]);
  };

  const handleSuggestionClick8 = (suggestion) => {
    announcement.station_name = suggestion;
    setSuggestions8([]);
  };

  const handleSuggestionClick9 = (suggestion) => {
    announcement.source_name = suggestion;
    setSuggestions9([]);
  };

  const handleSuggestionClick10 = (suggestion) => {
    announcement.destination_name = suggestion;
    setSuggestions10([]);
  };

  const handleSuggestionClick11 = (suggestion) => {
    announcement5.station_name = suggestion;
    setSuggestions11([]);
  };

  const handleSuggestionClick12 = (suggestion) => {
    announcement6.station_name = suggestion;
    setSuggestions12([]);
  };

  return (
    <div className="bg-zinc-100  flex w-screen h-screen overflow-hidden">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-200">
          <ul className="space-y-2 font-medium">
            <li className="border-b-2 border-white">
              <Link to="/home">
                {" "}
                <div className="flex px-0 md:px-2 mb-4 items-center after:content-[''] relative after:border-l-2 after:h-16 after:flex after:pl-1  after:items-center after:text-2xl esm:after:content-['ARRIVA'] after:text-indigo-900  ">
                  <img src={arrivaIcon} alt="Logo" className="h-16 " />
                </div>
              </Link>
            </li>

            <li>
              <Link
                to="/dash"
                className="flex items-center cursor-pointer p-2 text-indigo-900  hover:text-white hover:bg-blue-600 rounded-lg group"
              >
                <MdDashboard className="w-7 h-7 text-indigo-600 group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <div className="flex">
                <select
                  className="border-2 mx-5 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-lg px-3 py-1 text-center inline-flex items-center"
                  id="languageSelector"
                  value={selectedLanguage}
                  onChange={handleLanguage}
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.value}
                      className="px-4 py-2 hover:bg-gray-100 text-center"
                      value={lang.value}
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center cursor-pointer p-2  text-indigo-950 hover:text-white hover:bg-blue-600 rounded-lg group"
              >
                <PiSignOutBold className="w-7 h-7  text-indigo-600 group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className=" static p-4 sm:ml-64 z-50 hover:outline-blue-400 max-w-full max-h-full w-full h-full overflow-y-scroll ">
        {/* Custom announcement field */}

        <div class="flex items-center px-3 py-2 rounded-lg bg-blue-200 border border-slat-600">
          <button
            type="button"
            class="inline-flex justify-center p-2 hover:scale-110 rounded-lg hover:border-gray-300 hover:bg-gray-100 mr-2 "
          ></button>

          <div>
            <input
              type="text"
              placeholder="Station"
              name="station_name"
              value={announcement4.station_name}
              onChange={handleChange4}
              className="outline-1 focus:outline-2 py-2 mx-2  focus:outline-blue-400 outline ring-blue-400 text-start indent-4 max-w-xs overflow-hidden rounded-lg"
            />
            {suggestions1.length > 0 && (
              <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                <div
                  style={{
                    overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                    maxHeight: "150px", // Set a constant height
                    width: "100%", // Set full width
                  }}
                >
                  {suggestions1.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item border-b border-gray-200"
                      onClick={() => handleSuggestionClick1(suggestion)}
                    >
                      <div style={{ padding: "8px" }}>{suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            class="p-2  hover:scale-110 rounded-lg cursor-pointer  hover:bg-gray-100   "
          >
            <FontAwesomeIcon
              className={`text-3xl duration-300  scale-110 hover:scale-110 ${listening
                  ? "text-green-500 before:content[''] before:absolute before:z-20 before:items-center before:w-8 before:h-8 before:bg-cyan-300"
                  : ""
                }  hover:scale-110 `}
              icon={listening ? faMicrophone : faMicrophoneSlash}
              onClick={toggleListening}
              style={{ cursor: "pointer" }}
            />
          </button>
          <textarea
            id="chat"
            value={message}
            onChange={handleInputChange}
            rows="1"
            class="custom-announcement-class block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 placeholder-gray-600 outline-blue-400 outline-offset-2  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Create your custom announcement..."
          ></textarea>
          <button
            className="text-base p-2 hover:outline-offset-2 hover:scale-110 z-10 bg-slate-100 border border-gray-400 flex justify-center items-center rounded-lg duration-300 hover:border-slate-900 hover:text-white focus:stroke-blue-200 focus:border-slate-200 focus:bg-blue-400"
            onClick={handleSend}
          >
            Submit
            <svg
              fill="gray"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-600 hover:text-green-500"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M10.11 13.6501L13.69 10.0601"
              ></path>
            </svg>
          </button>
        </div>

        <span className=" text-gray-500 text-xl">Quick Announcements</span>

        <div className=" flex flex-row gap-6 mt-6 xl:mt-4 ">
          <div class=" flex-col shadow-2xl rounded-xl hover:cursor-pointer bg-slate-50 max-w-[30%] p-4">
            <label className="text-xl font-bold ">Route Changed</label>
            <div class="flex flex-wrap -mx-3 mt-3 mb-1">
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Station name
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="station_name"
                    value={announcement3.station_name}
                    onChange={handleChange3}
                    placeholder="New Delhi"
                    required
                  />
                  {suggestions2.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions2.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick2(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  From (station)
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="source_name"
                    value={announcement3.source_name}
                    onChange={handleChange3}
                    placeholder="New Delhi"
                    required
                  />
                  {suggestions3.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions3.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick3(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  To (station)
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="destination_name"
                    value={announcement3.destination_name}
                    onChange={handleChange3}
                    placeholder="Kanpur"
                    required
                  />
                  {suggestions4.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions4.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick4(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Train number
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="train_number"
                  value={announcement3.train_number}
                  onChange={handleChange3}
                  placeholder="16339"
                  required
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Train name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="train_name"
                  value={announcement3.train_name}
                  onChange={handleChange3}
                  placeholder="Nagarcoil Express"
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-0">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Old Route
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="old_route"
                  value={announcement3.old_route}
                  onChange={handleChange3}
                  placeholder="Kamshet"
                  required
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Changed Route
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="changed_route"
                  value={announcement3.changed_route}
                  onChange={handleChange3}
                  placeholder="Panvel"
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <button
                type="submit"
                onClick={handleSubmit3}
                className="rounded-lg hover:scale-95 duration hover:bg-blue-600 bg-blue-500 text-white w-11/12 py-2 mx-auto mt-4 content-baseline   text-xl "
              >
                Submit
              </button>
            </div>
          </div>

          <div class=" flex-col shadow-2xl rounded-xl hover:cursor-pointer bg-slate-50 max-w-[30%] p-4">
            <label className="text-xl font-bold ">Train Delayed</label>
            <div class="flex flex-wrap -mx-3 mt-3 mb-1">
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Station name
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="station_name"
                    value={announcement2.station_name}
                    onChange={handleChange2}
                    placeholder="New Delhi"
                    required
                  />
                  {suggestions5.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions5.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick5(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  From (station)
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="source_name"
                    value={announcement2.source_name}
                    onChange={handleChange2}
                    placeholder="Mumbai"
                    required
                  />
                  {suggestions6.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions6.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick6(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  To (station)
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="destination_name"
                    value={announcement2.destination_name}
                    onChange={handleChange2}
                    placeholder="Kalyan"
                    required
                  />
                  {suggestions7.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions7.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick7(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Train number
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="train_number"
                  value={announcement2.train_number}
                  onChange={handleChange2}
                  placeholder="16339"
                  required
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Train name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="train_name"
                  value={announcement2.train_name}
                  onChange={handleChange2}
                  placeholder="Nagarcoil Express"
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full md:w-1/3 px-3  md:mb-0 justify-around  ">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-zip"
                >
                  Delayed
                </label>
                <input
                  class="appearance-none block w-[120%] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="time"
                  name="delayed"
                  value={announcement2.delay}
                  onChange={handleChange2}
                  placeholder="01:30"
                  required
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit2}
                className="rounded-lg hover:scale-95 duration hover:bg-blue-600 bg-blue-500 text-white w-11/12 py-2 mx-auto mt-4 content-baseline   text-xl "
              >
                Submit
              </button>
            </div>
          </div>

          <div class=" flex-col shadow-2xl rounded-xl hover:cursor-pointer bg-slate-50 max-w-[30%] p-4">
            <label className="text-xl font-bold ">Train Cancelled</label>
            <div class="flex flex-wrap -mx-3 mt-3 mb-1">
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Station name
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    value={announcement.station_name}
                    name="station_name"
                    onChange={handleChange}
                    placeholder="Dindigul"
                    required
                  />
                  {suggestions8.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions8.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick8(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mt-3 mb-1">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  From (station)
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    value={announcement.source_name}
                    name="source_name"
                    onChange={handleChange}
                    placeholder="Mumbai"
                    required
                  />
                  {suggestions9.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions9.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick9(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  To (station)
                </label>
                <div>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    value={announcement.destination_name}
                    name="destination_name"
                    onChange={handleChange}
                    placeholder="Kalyan"
                    required
                  />
                  {suggestions10.length > 0 && (
                    <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                      <div
                        style={{
                          overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                          maxHeight: "150px", // Set a constant height
                          width: "100%", // Set full width
                        }}
                      >
                        {suggestions10.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item border-b border-gray-200"
                            onClick={() => handleSuggestionClick10(suggestion)}
                          >
                            <div style={{ padding: "8px" }}>{suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Train number
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  value={announcement.train_number}
                  name="train_number"
                  onChange={handleChange}
                  placeholder="16339"
                  required
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Train name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="train_name"
                  value={announcement.train_name}
                  onChange={handleChange}
                  placeholder="Tejas Express"
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <button
                type="submit"
                onClick={handleSubmit}
                // onSubmit={handleChange}
                className="rounded-lg  hover:scale-95 duration hover:bg-blue-600 bg-blue-500 text-white w-11/12 py-2 mx-auto mt-4 content-baseline   text-xl "
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="flex-col shadow-2xl rounded-xl hover:cursor-pointer bg-slate-50 max-w-[95%] p-4 mt-8">
          <label className="text-xl font-bold ">Train arrived</label>
          <div class="flex flex-wrap -mx-3 mt-3 mb-1">
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Station name
              </label>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  value={announcement5.station_name}
                  name="station_name"
                  onChange={handleChange5}
                  placeholder="Dindigul"
                  required
                />
                {suggestions11.length > 0 && (
                  <div className="suggestions-dropdown z-30 absolute bg-white border border-gray-300 rounded-lg mt-1 ">
                    <div
                      style={{
                        overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                        maxHeight: "150px", // Set a constant height
                        width: "100%", // Set full width
                      }}
                    >
                      {suggestions11.map((suggestion, index) => (
                        <div
                          key={index}
                          className="suggestion-item border-b border-gray-200"
                          onClick={() => handleSuggestionClick11(suggestion)}
                        >
                          <div style={{ padding: "8px" }}>{suggestion}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Arriving At (Time)
              </label>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  value={announcement5.arrivingAt}
                  name="arrivingAt"
                  onChange={handleChange5}
                  placeholder="Dindigul"
                  required
                />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mt-3 mb-1">
            <div class="w-full md:w-1/2 px-3  md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Platefrom number
              </label>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  value={announcement5.platform}
                  name="platform"
                  onChange={handleChange5}
                  placeholder="2"
                  required
                />
              </div>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Departing At (Time)
              </label>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  value={announcement5.departingAt}
                  name="departingAt"
                  onChange={handleChange5}
                  placeholder="Kalyan"
                  required
                />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-1">
            <div class="w-full md:w-1/2 px-3  md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Train number
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={announcement5.train_number}
                name="train_number"
                onChange={handleChange5}
                placeholder="16339"
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Train name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="train_name"
                value={announcement5.train_name}
                onChange={handleChange5}
                placeholder="Tejas Express"
                required
              />
            </div>
            <div class="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit5}
                className="rounded-lg hover:scale-95 duration hover:bg-blue-600 bg-blue-500 text-white w-11/12 py-2 content-baseline text-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col shadow-2xl rounded-xl hover:cursor-pointer bg-gray-100 max-w-[95%] p-6 mt-8">
          <label class="text-2xl font-semibold">Train arrived</label>
          <div class="flex flex-wrap -mx-2 mt-4 mb-2">
            <button
              onClick={handleFetch}
              class="bg-blue-600 hover:bg-blue-800 text-white font-semibold h-10 py-2 px-4 rounded-md top-8"
            >
              Fetch
            </button>
            <input type="file" accept="audio/wav" onChange={handleFileChange} />
            <div class="w-full md:w-1/2 px-2">
              <label
                class="block uppercase tracking-wide text-gray-800 text-sm font-semibold mb-2"
                for="grid-last-name"
              >
                Announcement Message
              </label>
              <div>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  value={announcement6.station_name}
                  name="station_name"
                  onChange={handleChange6}
                  placeholder="Station Name"
                  required
                />
              </div>
              {suggestions12.length > 0 && (
                  <div className="suggestions-dropdown z-30 bg-white border border-gray-300 rounded-lg mt-1 ">
                    <div
                      style={{
                        overflowY: "auto", // Set overflow-y to auto for vertical scrolling
                        maxHeight: "150px", // Set a constant height
                        width: "100%", // Set full width
                      }}
                    >
                      {suggestions12.map((suggestion, index) => (
                        <div
                          key={index}
                          className="suggestion-item border-b border-gray-200"
                          onClick={() => handleSuggestionClick12(suggestion)}
                        >
                          <div style={{ padding: "8px" }}>{suggestion}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  value={announcement6.message}
                  name="message"
                  onChange={handleChange6}
                  placeholder="Train arrived"
                  required
                />
              </div>
              <div class="flex justify-center mt-4">
                <button
                  type="submit"
                  onClick={handleSubmit6}
                  class="rounded-lg hover:scale-95 transition duration-300 hover:bg-blue-700 bg-blue-600 text-white w-11/12 py-3 text-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
