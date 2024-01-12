import React, { useState } from 'react';
import { FcSpeaker } from "react-icons/fc";

function CheckSeatAvailability({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  if (!data || !data.data || !Array.isArray(data.data)) {
    return null;
  }

  
  const speakData = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };



  const renderTableRows = (data) => {
    return data.map((station, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="py-2 px-4 border">{station.confirm_probability} {station.confirm_probability_percent}%</td>
        <td className="py-2 px-4 border">{station.current_status}</td>
        <td className="py-2 px-4 border">{station.date}</td>
        <td className="py-2 px-4 border">{station.total_fare}</td>
      </tr>
    ));
  };

  
  const handleSpeak = () => {
    const textToSpeak = displayData.map(station => {
      return `Confirm Probability ${station.confirm_probability} ${station.confirm_probability_percent}%, Current Status ${station.current_status}, Date ${station.date}, Total Fare ${station.total_fare}`;
    }).join('. ');

    speakData(textToSpeak);
  };


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = data.data.filter(
      (station) =>
        station.confirm_probability.toString().toLowerCase().includes(searchTerm) ||
        station.confirm_probability_percent.toString().toLowerCase().includes(searchTerm) ||
        station.current_status.toLowerCase().includes(searchTerm) ||
        station.date.toLowerCase().includes(searchTerm) ||
        station.total_fare.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const displayData = searchTerm ? filteredData : data.data;

  return (
    <div>
      <h1 className="text-2xl font-bold my-2 text-center">Train Information</h1>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search by availability, status, date, or fare"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 rounded border"
        />
          <button onClick={handleSpeak}
        className=" outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
      >
        <FcSpeaker className=" w-4 h-4 vsm:w-8 vsm:h-8  text-indigo-900 top-12" />
      </button>
        <table className="border-collapse w-full mt-1 styled-table">
          <thead className="bg-gray-200 sticky -top-3">
            <tr>
              <th className="py-2 px-4 border">Confirm Probability</th>
              <th className="py-2 px-4 border">Current Status</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Total Fare</th>
            </tr>
          </thead>
          <tbody>{renderTableRows(displayData)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckSeatAvailability;