import React, { useState } from 'react';
import { FcSpeaker } from "react-icons/fc";

function TrainTable({ trainData,speakData  }) {
  return (
    <table className="border-collapse w-full mt-1">
      <thead className="bg-gray-200 sticky -top-3">
        <tr>
          <th className="py-2 px-4 border">Train Name</th>
          <th className="py-2 px-4 border">New Train Number</th>
        </tr>
      </thead>
      <tbody>
        {trainData.map((train, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <td className="py-2 px-4 border">{train.train_name}</td>
            <td className="py-2 px-4 border">
              {train.train_number && !train.new_train_number ? (
                train.train_number
              ) : (
                `${train.train_number} / ${train.new_train_number}`
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SearchTrain({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data.data);

  
  const speakData = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    const textToSpeak = filteredData.map(train => {
      return `Train Name ${train.train_name}, Train Number ${train.train_number}, New Train Number ${train.new_train_number}`;
    }).join('. ');

    speakData(textToSpeak);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = data.data.filter(
      (train) =>
        train.train_name.toLowerCase().includes(searchTerm) ||
        (train.train_number && train.train_number.toLowerCase().includes(searchTerm)) ||
        (train.new_train_number && train.new_train_number.toLowerCase().includes(searchTerm))
    );
    setFilteredData(filtered);
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Train Information</h1>
      <input
        type="text"
        placeholder="Search by train name, train number, or new train number"
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
        <TrainTable trainData={filteredData} />
      </div>
    </div>
  );
}

export default SearchTrain;