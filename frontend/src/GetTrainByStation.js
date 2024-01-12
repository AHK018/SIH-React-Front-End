import React, { useState } from 'react';
import { FcSpeaker } from "react-icons/fc";

const TrainTable = ({ data, tableType, searchQuery, setSearchQuery, speakData}) => {
  const filteredData = data.filter(item =>
    item.trainName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleSpeak = () => {
    const textToSpeak = filteredData.map(item => {
      return `Train number ${item.trainNo}, Train Name ${item.trainName}, Arrival time ${item.arrivalTime}, Departure time ${item.departureTime}`;
    }).join('. ');

    speakData(textToSpeak);
  };

  return (
    <div className="table-container">
      <h3>Train {tableType}</h3>
      <div>
      <button onClick={handleSpeak}
        className=" outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
      >
        <FcSpeaker className=" w-4 h-4 vsm:w-8 vsm:h-8  text-indigo-900 top-12" />
      </button>
        <input
          type="text"
          placeholder={`Search ${tableType} trains...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 mb-2"
        />
        <table className="border-collapse w-full mt-1">
          <tr>
            <th className="py-2 px-4 border">Train No</th>
            <th className="py-2 px-4 border">Train Name</th>
            <th className="py-2 px-4 border">Arrival Time</th>
            <th className="py-2 px-4 border">Departure Time</th>
            <th className="py-2 px-4 border">Run Days</th>
          </tr>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border">{item.trainNo}</td>
                <td className="py-2 px-4 border">{item.trainName}</td>
                <td className="py-2 px-4 border">{item.arrivalTime}</td>
                <td className="py-2 px-4 border">{item.departureTime}</td>
                <td className="py-2 px-4 border">
                  {Object.keys(item.runDays).map((day, dayIndex) => (
                    <span key={day}>
                      {item.runDays[day] ? day : null}
                      {dayIndex !== Object.keys(item.runDays).length - 1 ? ' ' : null}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


function GetTrainByStation({ data }) {
  const [selectedTable, setSelectedTable] = useState('originating');
  const [searchQuery, setSearchQuery] = useState('');

  const speakData = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleTableChange = (table) => {
    setSelectedTable(table);
    setSearchQuery('');
  };
  return (
    <div className="App">
      <style>
      {`
    button {
      margin: 5px;
      padding: 1px 12px;
      cursor: pointer;
      border: none;
      border-radius: 4px; /* Adjust the radius for your preference */
      
      align-items: center;
      justify-content: center;
      height: 30px;
       
    }

    button.active {
      background-color: #4caf50;
      color: white;
    }
  `}
      </style>

      <div>
        <select
          value={selectedTable}
          onChange={(e) => handleTableChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 mb-2"
        >
          <option value="originating">Originating</option>
          <option value="passing">Passing</option>
          <option value="destination">Destination</option>
        </select>
      </div>

      <TrainTable
        data={data.data[selectedTable]}
        tableType={selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        speakData={speakData}
      />
    </div>
  );
}

export default GetTrainByStation;