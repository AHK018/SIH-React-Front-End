import React from 'react';

const TrainInforma = ({ data }) => {
  return (
    <div className="train-schedule">
      <table className="border-collapse w-full mt-1">
        <thead className="bg-gray-200 sticky top-3">
          <tr>
            <th className="py-2 px-4 border">Train Number</th>
            <th className="py-2 px-4 border">Train Name</th>
            <th className="py-2 px-4 border">Train Origin Station</th>
            <th className="py-2 px-4 border">Train Origin Station Code</th>
            <th className="py-2 px-4 border">Train Destination Station</th>
            <th className="py-2 px-4 border">Train Destination Station Code</th>
            <th className="py-2 px-4 border">Arrival Time</th>
            <th className="py-2 px-4 border">Departure Time</th>
            <th className="py-2 px-4 border">Distance</th>
            <th className="py-2 px-4 border">Day of Journey</th>
            <th className="py-2 px-4 border">Class Type</th>
            <th className="py-2 px-4 border">Run Days</th>
            <th className="py-2 px-4 border">Train Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((train) => (
            <tr key={train.train_number} className={train.train_number % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="py-2 px-4 border">{train.train_number}</td>
              <td className="py-2 px-4 border">{train.train_name}</td>
              <td className="py-2 px-4 border">{train.train_origin_station}</td>
              <td className="py-2 px-4 border">{train.train_origin_station_code}</td>
              <td className="py-2 px-4 border">{train.train_destination_station}</td>
              <td className="py-2 px-4 border">{train.train_destination_station_code}</td>
              <td className="py-2 px-4 border">{train.arrival_time}</td>
              <td className="py-2 px-4 border">{train.departure_time}</td>
              <td className="py-2 px-4 border">{train.distance}</td>
              <td className="py-2 px-4 border">{train.day_of_journey}</td>
              <td className="py-2 px-4 border">{train.class_type.join(', ')}</td>
              <td className="py-2 px-4 border">{train.run_days.join(', ')}</td>
              <td className="py-2 px-4 border">{train.train_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TrainBetweenTwoStations = ({ data }) => {
  return (
    <div className="App">
     <h1 className="text-2xl font-bold mb-4 text-center">Train Between Two Stations</h1>
      <TrainInforma data={data.data} /> {/* Render the table component */}
    </div>
  );
};

export default TrainBetweenTwoStations;