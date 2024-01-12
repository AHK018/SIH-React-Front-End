// StationSuggestionsHook.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useStationSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [stationNames, setStationNames] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');

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

  const handleSelectChange = event => {
    const inputValue = event.target.value;
    setSelectedStation(inputValue);
    const filteredSuggestions = getSuggestions(inputValue);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = suggestion => {
    setSelectedStation(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const getSuggestions = inputValue => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();

    // Filter out non-string values and then perform the lowercase check
    const filteredStations = stationNames.filter(name => {
      if (typeof name === 'string') {
        return name.toLowerCase().includes(inputValueLowerCase);
      }
      return false; // Skip non-string values
    });

    return filteredStations;
  };

  return {
    suggestions,
    selectedStation,
    stationAnnouncement,
    handleSelectChange,
    handleSuggestionClick,
  };
};

export default useStationSuggestions;
