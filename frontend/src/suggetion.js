import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const stationNamesData = await axios.post('/getStationNamesCSV');

// Extract only the station names from the array of objects
const stationNames = stationNamesData.data.map(item => `${item['Station Name']} - ${item['Stn Code']} - ${item['District']} ( ${item['State']} )`);

console.log(stationNames);

const StationSuggest = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    const filteredStations = stationNames.filter(
      (name) => name.toLowerCase().includes(inputValueLowerCase)
    );
    return filteredStations;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const inputProps = {
    placeholder: 'Type a station name',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default StationSuggest;

