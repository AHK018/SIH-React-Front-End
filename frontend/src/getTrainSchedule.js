import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrainScheduleTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoute, setFilteredRoute] = useState(data.route);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [listening, setListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      const selectedLanguage = localStorage.getItem('selectedLanguage')
      const options = { continuous: true, language: selectedLanguage };
      SpeechRecognition.startListening(options);
    }
    setListening(!listening);
    if (listening && searchTerm.trim() !== "") {
      setSearchTerm(searchTerm);
      // setMessage('');
    }
    resetTranscript();
  };

  useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = data.route.filter(
      (item) =>
        item.station_name.toLowerCase().includes(searchTerm) ||
        item.station_code.toLowerCase().includes(searchTerm) ||
        item.state_name.toLowerCase().includes(searchTerm) ||
        item.state_code.toLowerCase().includes(searchTerm)
    );
    setFilteredRoute(filtered);
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold my-2 text-center">Train Schedule Information</h1>
      <div className="search-bar mb-4 mx-auto w-3/4">
        <input
          type="text"
          placeholder="Search by station name, code, or state"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 rounded border"
        />
        <FontAwesomeIcon
          className={`text-3xl m-4 -translate-x-4 sm:translate-x-0 duration-300 sm:m-5 scale-110 hover:scale-150 ${listening ? "text-red-500" : "" // Conditionally set red color
            } hover:text-red-500 hover:scale-150 absolute`}
          icon={listening ? faMicrophone : faMicrophoneSlash}
          onClick={toggleListening}
          onChange={selectedLanguage}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="table-container">
        <div className="train-info">
          <h3>Train General information</h3>
          <p>
            <strong>Train Name:</strong> {data.trainName},&nbsp;
            <strong>Train Number:</strong> {data.trainNumber},&nbsp;
            {/* <strong>Run Days:</strong> {data.runDays.join(', ')},&nbsp; */}
            <strong>Train Type:</strong> {data.trainType}
          </p>
        </div>

        <div className="train-route">
          <h3>Train route</h3>
          <table className="border-collapse w-full mt-1">
            {/* Table header */}
            <thead className="bg-gray-200 sticky -top-3">
              <tr>
                <th className="py-2 px-4 border">Station Name</th>
                <th className="py-2 px-4 border">State Name</th>
                <th className="py-2 px-4 border">STA</th>
                <th className="py-2 px-4 border">Platform Number</th>
                <th className="py-2 px-4 border">Distance from Source</th>
                <th className="py-2 px-4 border">Stop</th>
                <th className="py-2 px-4 border">Day</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoute.map((item, index) => (
                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                  <td className="py-2 px-4 border">{`${item.station_name} (${item.station_code})`}</td>
                  <td className="py-2 px-4 border">{`${item.state_name} (${item.state_code})`}</td>
                  <td className="py-2 px-4 border">{item.sta}</td>
                  <td className="py-2 px-4 border">{item.platform_number}</td>
                  <td className="py-2 px-4 border">{item.distance_from_source}</td>
                  <td className="py-2 px-4 border">{item.stop}</td>
                  <td className="py-2 px-4 border">{item.day}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function GetTrainSchedule({ data }) {
  return (
    <div className="App">
      <TrainScheduleTable data={data.data} />
    </div>
  );
}

export default GetTrainSchedule;