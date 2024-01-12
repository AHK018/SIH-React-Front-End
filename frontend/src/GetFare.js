import React, { useState, useEffect } from 'react';
import { FcSpeaker } from "react-icons/fc";
function GetFare({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGeneralData, setFilteredGeneralData] = useState([]);
  const [filteredTatkalData, setFilteredTatkalData] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      const generalData = data.data['general'];
      const tatkalData = data.data['tatkal'];

      setFilteredGeneralData(generalData);
      setFilteredTatkalData(tatkalData);
    }
  }, [data]);


  
  const speakData = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSpeak = (classType) => {
    const classData = classType === 'general' ? filteredGeneralData : filteredTatkalData;

    const textToSpeak = classData.map(fare => {
      return `Class type ${fare.classType}, Fare ${fare.fare}, Base Charges ${fare.baseCharges}, Reservation Charges ${fare.reservationCharges}, GST ${fare.gst}, Total Amount ${fare.totalAmount}, Tatkal Charges ${fare.tatkalCharges}`;
    }).join('. ');

    speakData(textToSpeak);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (data && data.data) {
      const generalData = data.data['general'].filter((fare) =>
        fare.classType.toLowerCase().includes(term)
      );
      const tatkalData = data.data['tatkal'].filter((fare) =>
        fare.classType.toLowerCase().includes(term)
      );

      setFilteredGeneralData(generalData);
      setFilteredTatkalData(tatkalData);
    }
  };

  const renderTableRows = (classType) => {
    const classData = classType === 'general' ? filteredGeneralData : filteredTatkalData;

    return classData.map((fare, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="py-2 px-4 border">{fare.classType}</td>
        <td className="py-2 px-4 border">{fare.fare}</td>
        {/* Add other columns based on your data structure */}
        {fare.breakup.map((item, i) => (
          <td key={i} className="py-2 px-4 border">{item.cost}</td>
        ))}
        {classType === 'tatkal' && <td className="py-2 px-4 border">{fare.tatkalCharges}</td>}
        {/* Add more columns if needed */}
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-2 text-center">Fare Details</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by class type"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 rounded border"
      />

      {/* General Fare */}
      <div>
        <h2 className="text-xl font-bold my-2">General Fare</h2>
        <div className="table-data">
        <button onClick={() => handleSpeak('general')} className="bg-red-700 p-3">Speak General Fare</button>
         
          <table className="border-collapse w-full mt-1 styled-table">
            <thead className="bg-gray-200 sticky -top-3">
              <tr>
                <th className="py-2 px-4 border">Class Type</th>
                <th className="py-2 px-4 border">Fare</th>
                <th className="py-2 px-4 border">Base Charges</th>
                <th className="py-2 px-4 border">Reservation Charges</th>
                <th className="py-2 px-4 border">GST</th>
                <th className="py-2 px-4 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows('general')}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tatkal Fare */}
      <div>
        <h2 className="text-xl font-bold my-2">Tatkal Fare</h2>
        <div className="table-data">
        <button onClick={handleSpeak}
        className=" outline-lime-500 ring-lime-400  left-2 fill-slate-600 hover:animate-pulse  flex justify-center items-center rounded-3xl p-1 bg-green-100 hover:border-cyan-200 focus:fill-indigo-600 focus:bg-yellow-200  hover:scale-110 duration-300 border-green-500 border-2"
      >
        <FcSpeaker className=" w-4 h-4 vsm:w-8 vsm:h-8  text-indigo-900 top-12" />
      </button> 
          <table className="border-collapse w-full mt-1 styled-table">
            <thead className="bg-gray-200 sticky -top-3">
              <tr>
                <th className="py-2 px-4 border">Class Type</th>
                <th className="py-2 px-4 border">Fare</th>
                <th className="py-2 px-4 border">Base Charges</th>
                <th className="py-2 px-4 border">Reservation Charges</th>
                <th className="py-2 px-4 border">GST</th>
                <th className="py-2 px-4 border">Tatkal Charges</th>
                <th className="py-2 px-4 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows('tatkal')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetFare;