import React, { useState } from 'react';
import { FcSpeaker } from "react-icons/fc";
function GetLiveStation({ data }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!data || !data.data || !Array.isArray(data.data)) {
    return null;
  }

  const filteredData = data.data.filter(station =>
    station.trainName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const speakData = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    const textToSpeak = filteredData.map(station => {
      return `Train number ${station.trainNumber}, Train Name ${station.trainName}, Arrival time ${station.arrivalTime}, Departure time ${station.departureTime}`;
    }).join('. ');

    speakData(textToSpeak);
  };

  const renderTableRows = (data) => {
    return filteredData.map((station, index) => (
      <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
           <td className="py-2 px-4 border">{station.trainNumber}</td>
        <td className="py-2 px-4 border">{station.trainType}</td>
        <td className="py-2 px-4 border">{station.trainName}</td>
        <td className="py-2 px-4 border">{station.arrivalTime}</td>
        <td className="py-2 px-4 border">{station.departureTime}</td>
        <td className="py-2 px-4 border">{station.runDays.mon ? 'Mon' : ''}</td>
        <td className="py-2 px-4 border">{station.runDays.tue ? 'Tue' : ''}</td>
        <td className="py-2 px-4 border">{station.runDays.wed ? 'Wed' : ''}</td>
        <td className="py-2 px-4 border">{station.runDays.thu ? 'Thu' : ''}</td>
        <td className="py-2 px-4 border">{station.runDays.fri ? 'Fri' : ''}</td>
        <td className="py-2 px-4 border">{station.runDays.sat ? 'Sat' : ''}</td>
        <td className="py-2 px-4 border">{station.runDays.sun ? 'Sun' : ''}</td>
        <td className="py-2 px-4 border">{station.classes.map((cls) => cls.name).join(', ')}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-2 text-center">Train Information</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by train name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 mb-2"
        />
      </div>
      <div className="table-data">
      <button onClick={handleSpeak}
        className=" outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
      >
        <FcSpeaker className=" w-4 h-4 vsm:w-8 vsm:h-8  text-indigo-900 top-12" />
      </button>
        <table className="border-collapse w-full mt-1 styled-table">
          <thead className="bg-gray-200 sticky -top-3">
            <tr>
            <th className="py-2 px-4 border">Train Number</th>
              <th className="py-2 px-4 border">Train Type</th>
              <th className="py-2 px-4 border">Train Name</th>
              <th className="py-2 px-4 border">Arrival Time</th>
              <th className="py-2 px-4 border">Departure Time</th>
              <th className="py-2 px-4 border">Mon</th>
              <th className="py-2 px-4 border">Tue</th>
              <th className="py-2 px-4 border">Wed</th>
              <th className="py-2 px-4 border">Thu</th>
              <th className="py-2 px-4 border">Fri</th>
              <th className="py-2 px-4 border">Sat</th>
              <th className="py-2 px-4 border">Sun</th>
              <th className="py-2 px-4 border">Classes</th>
            </tr>
          </thead>
          <tbody>{renderTableRows(data)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default GetLiveStation;