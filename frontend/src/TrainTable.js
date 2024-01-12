import React from 'react';

function TrainTable({ tableData }) {
  return (
    <div className="table-data">
      <h3>Table Data:</h3>
      <table>
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>From</th>
            <th>To</th>
            <th>Data ID</th>
            <th>Operating Days</th>
            <th>To ID</th>
            <th>Classes</th>
            <th>From ID</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((train, trainIndex) => (
            <tr key={trainIndex}>
              <td>{train.train_num}</td>
              <td>{train.name}</td>
              <td>{train.train_from}</td>
              <td>{train.train_to}</td>
              <td>{train.data.id}</td>
              <td>{Object.keys(train.data.days).join(', ')}</td>
              <td>{train.data.to_id}</td>
              <td>{train.data.classes.join(', ')}</td>
              <td>{train.data.from_id}</td>
              <td>{train.data.arriveTime}</td>
              <td>{train.data.departTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainTable;
