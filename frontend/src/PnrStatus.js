import React from 'react';

const TrainDetailsTable = ({ data }) => {
  return (
    <div className="table-container">
      <h3>Train General information</h3>
      <div>
        <table>
      <tbody>
        <tr>
          <td>Arrival Time</td>
          <td>{data.ArrivalTime}</td>
        </tr>getPNRStatus
        <tr>
          <td>Boarding Point</td>
          <td>{data.BoardingPoint}</td>
        </tr>
        <tr>
          <td>Boarding Station Name</td>
          <td>{data.BoardingStationName}</td>
        </tr>
        <tr>
          <td>Booking Date</td>
          <td>{data.BookingDate}</td>
        </tr>
        <tr>
          <td>Booking Fare</td>
          <td>{data.BookingFare}</td>
        </tr>
        <tr>
          <td>Chart Prepared</td>
          <td>{data.ChartPrepared ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Class</td>
          <td>{data.Class}</td>
        </tr>
        <tr>
          <td>Cleanliness Rating</td>
          <td>{data.CleanlinessRating}</td>
        </tr>
        <tr>
          <td>Coach Position</td>
          <td>{data.CoachPosition}</td>
        </tr>
        <tr>
          <td>Departure Time</td>
          <td>{data.DepartureTime}</td>
        </tr>
        <tr>
          <td>Destination Date of Journey</td>
          <td>{data.DestinationDoj}</td>
        </tr>
        <tr>
          <td>Destination Name</td>
          <td>{data.DestinationName}</td>
        </tr>
        <tr>
          <td>Date of Journey</td>
          <td>{data.Doj}</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>{data.Duration}</td>
        </tr>
        <tr>
          <td>Expected Platform Number</td>
          <td>{data.ExpectedPlatformNo}</td>
        </tr>
        <tr>
          <td>Food Rating</td>
          <td>{data.FoodRating}</td>
        </tr>
        <tr>
          <td>From</td>
          <td>{data.From}</td>
        </tr>
        <tr>
          <td>Has Pantry</td>
          <td>{data.HasPantry ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>OptVikalp</td>
          <td>{data.OptVikalp ? "Yes" : "No"}</td>
        </tr>
      </tbody>
    </table>
      </div>
    </div>
  );
};


function TrainInfoTable({ data }) {
  return (
    <div> 
   <h2>Table 2</h2>
    <table>
      <tbody>
        <tr>
          <td>PNR</td>
          <td>{data.Pnr}</td>
        </tr>
        <tr>
          <td>Punctuality Rating</td>
          <td>{data.PunctualityRating}</td>
        </tr>
        <tr>
          <td>Quota</td>
          <td>{data.Quota}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>{data.Rating}</td>
        </tr>
        <tr>
          <td>Rating Count</td>
          <td>{data.RatingCount}</td>
        </tr>
        <tr>
          <td>Reservation Upto</td>
          <td>{data.ReservationUpto}</td>
        </tr>
        <tr>
          <td>Reservation Upto Category</td>
          <td>{data.ReservationUptoDetails.category}</td>
        </tr>
        <tr>
          <td>Reservation Upto Division</td>
          <td>{data.ReservationUptoDetails.division}</td>
        </tr>
        <tr>
          <td>Reservation Upto Latitude</td>
          <td>{data.ReservationUptoDetails.latitude}</td>
        </tr>
        <tr>
          <td>Reservation Upto Longitude</td>
          <td>{data.ReservationUptoDetails.longitude}</td>
        </tr>
        <tr>
          <td>Reservation Upto State</td>
          <td>{data.ReservationUptoDetails.state}</td>
        </tr>
        <tr>
          <td>Reservation Upto Station Code</td>
          <td>{data.ReservationUptoDetails.stationCode}</td>
        </tr>
        <tr>
          <td>Reservation Upto Station Name</td>
          <td>{data.ReservationUptoDetails.stationName}</td>
        </tr>
        <tr>
          <td>Reservation Upto Name</td>
          <td>{data.ReservationUptoName}</td>
        </tr>
        <tr>
          <td>Source Date of Journey</td>
          <td>{data.SourceDoj}</td>
        </tr>
        <tr>
          <td>Source Name</td>
          <td>{data.SourceName}</td>
        </tr>
        <tr>
          <td>Ticket Fare</td>
          <td>{data.TicketFare}</td>
        </tr>
        <tr>
          <td>Destination</td>
          <td>{data.To}</td>
        </tr>
        <tr>
          <td>Destination Category</td>
          <td>{data.ToDetails.category}</td>
        </tr>
        <tr>
          <td>Destination Division</td>
          <td>{data.ToDetails.division}</td>
        </tr>
        <tr>
          <td>Destination Latitude</td>
          <td>{data.ToDetails.latitude}</td>
        </tr>
        <tr>
          <td>Destination Longitude</td>
          <td>{data.ToDetails.longitude}</td>
        </tr>
        <tr>
          <td>Destination State</td>
          <td>{data.ToDetails.state}</td>
        </tr>
        <tr>
          <td>Destination Station Code</td>
          <td>{data.ToDetails.stationCode}</td>
        </tr>
        <tr>
          <td>Destination Station Name</td>
          <td>{data.ToDetails.stationName}</td>
        </tr>
        <tr>
          <td>Train Cancelled Flag</td>
          <td>{data.TrainCancelledFlag ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td>Train Name</td>
          <td>{data.TrainName}</td>
        </tr>
        <tr>
          <td>Train Number</td>
          <td>{data.TrainNo}</td>
        </tr>
{/* 
    Not included data following

data.TrainStatus	
data.VikalpData	
data.VikalpTransferred	false
data.VikalpTransferredMessage 

*/}

      </tbody>
    </table>
    </div>
  );
};



const StationTable = ({ stationData }) => {
  return (
    <>
      <style>
        {`
          .station-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }

          .station-table th, .station-table td {
            border: 1px solid #e2e8f0;
            padding: 0.5rem 1rem;
          }

          .station-table th {
            background-color: #f7fafc;
          }

          .station-table tbody tr:nth-child(even) {
            background-color: #edf2f7;
          }

          .station-table thead {
            position: sticky;
            top: 0;
            z-index: 2;
          }

          @media (max-width: 600px) {
            .station-table {
              overflow-x: auto;
            }
          }
        `}
      </style>
      <table className="station-table">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Berth</th>
            <th className="py-2 px-4 border">BookingBerthCode</th>
            <th className="py-2 px-4 border">BookingBerthNo</th>
            <th className="py-2 px-4 border">BookingCoachId</th>
            <th className="py-2 px-4 border">BookingStatus</th>
            <th className="py-2 px-4 border">BookingStatusIndex</th>
            <th className="py-2 px-4 border">BookingStatusNew</th>
            <th className="py-2 px-4 border">Coach</th>
            <th className="py-2 px-4 border">ConfirmTktStatus</th>
            <th className="py-2 px-4 border">CurrentBerthNo</th>
            <th className="py-2 px-4 border">CurrentCoachId</th>
            <th className="py-2 px-4 border">CurrentStatus</th>
            <th className="py-2 px-4 border">CurrentStatusIndex</th>
            <th className="py-2 px-4 border">CurrentStatusNew</th>
            <th className="py-2 px-4 border">Number</th>
            <th className="py-2 px-4 border">PredictionPercentage</th>
          </tr>
        </thead>
        <tbody>
          {stationData.PassengerStatus.map((passenger, index) => (
            <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
              <td className="py-2 px-4 border">{passenger.Berth}</td>
              <td className="py-2 px-4 border">{passenger.BookingBerthCode}</td>
              <td className="py-2 px-4 border">{passenger.BookingBerthNo}</td>
              <td className="py-2 px-4 border">{passenger.BookingCoachId}</td>
              <td className="py-2 px-4 border">{passenger.BookingStatus}</td>
              <td className="py-2 px-4 border">{passenger.BookingStatusIndex}</td>
              <td className="py-2 px-4 border">{passenger.BookingStatusNew}</td>
              <td className="py-2 px-4 border">{passenger.Coach}</td>
              <td className="py-2 px-4 border">{passenger.ConfirmTktStatus}</td>
              <td className="py-2 px-4 border">{passenger.CurrentBerthNo}</td>
              <td className="py-2 px-4 border">{passenger.CurrentCoachId}</td>
              <td className="py-2 px-4 border">{passenger.CurrentStatus}</td>
              <td className="py-2 px-4 border">{passenger.CurrentStatusIndex}</td>
              <td className="py-2 px-4 border">{passenger.CurrentStatusNew}</td>
              <td className="py-2 px-4 border">{passenger.Number}</td>
              <td className="py-2 px-4 border">{passenger.PredictionPercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}



function Pnrstatus({ data }) {
  return (
    <div className="App">
      <TrainDetailsTable data={data.data} />
      <br></br>
      <br></br>
      <br></br>
      <TrainInfoTable data={data.data} />
      <br></br>
      <br></br>
      <br></br>
      <StationTable stationData={data.data} />
    </div>
  );
}

export default Pnrstatus;