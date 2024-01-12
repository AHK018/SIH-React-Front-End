import React, { useState } from 'react';
import { FcSpeaker } from "react-icons/fc";
function StationTable({ stationData, speakData }) {
  return (
    <table className="border-collapse w-full mt-1">
      <thead className="bg-gray-200 sticky -top-3">
        <tr>
          <th className="py-2 px-4 border">Station Name</th>
          <th className="py-2 px-4 border">Station Code</th>
          <th className="py-2 px-4 border">State Name</th>
        </tr>
      </thead>
      <tbody>
        {stationData.map((station, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <td className="py-2 px-4 border">{station.name}</td>
            <td className="py-2 px-4 border">{station.code}</td>
            <td className="py-2 px-4 border">{station.state_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SearchStation({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data.data);


  const speakData = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    const textToSpeak = filteredData.map(station => {
      return `Station Name ${station.name}, Station Code ${station.code}, State Name ${station.state_name}`;
    }).join('. ');

    speakData(textToSpeak);
  };


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = data.data.filter(
      (station) =>
        station.name.toLowerCase().includes(searchTerm) ||
        station.code.toLowerCase().includes(searchTerm) ||
        station.state_name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold my-2 text-center">Station Information</h1>
      <input
        type="text"
        placeholder="Search by station name, code, or state"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 rounded border"
      />
      <button onClick={handleSpeak}
        className=" outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
      >
        <FcSpeaker className=" w-4 h-4 vsm:w-8 vsm:h-8  text-indigo-900 top-12" />
      </button>
      <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <StationTable stationData={filteredData} speakData={speakData} />
      </div> 
    </div>
  );
}

export default SearchStation;




// import { FcSpeaker } from "react-icons/fc";

// onClick={handleSpeak}