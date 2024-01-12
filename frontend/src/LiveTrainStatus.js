import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css'; // Import the custom styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

// Modal.setAppElement('#root'); // Set the root element for accessibility




function TrainStatus({ data }) {
  const events = data
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderTimelineElements = () => {
    if (typeof events === 'object' && events !== null) {
      const { previous_stations } = events;
      console.log(events)
      if (Array.isArray(previous_stations) && previous_stations.length > 0) {
        return (
          <div>
            {events.previous_stations.map((station, index) => (
              <VerticalTimelineElement
                key={index}
                date={station.sta}
                iconStyle={{ background: '#2ecc71', color: '#fff' }}
              >

                <h3>{station.station_name}</h3>
                <p>platform_number: {station.platform_number}</p>
                <p>Standard Departure Time: {station.std}</p>

                {/* Add more details as needed */}
              </VerticalTimelineElement>

            ))}
            <VerticalTimelineElement
              date={events.eta}
              iconStyle={{ background: '	#ff0000', color: '	#ff0000' }}
            >

              <h3>{events.current_station_name}</h3>
              <p>distance_from_source: {events.distance_from_source}</p>
              <p>platform_number: {events.platform_number}</p>
              <p>departure time: {events.etd}</p>


              <button onClick={toggleExpand}>
                {isExpanded ? (
                  <span>
                    <FontAwesomeIcon icon={faEyeSlash} /> Collapse
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faEye} /> Expand
                  </span>
                )}
              </button>
              {isExpanded && (
                <div>
                  {events.current_location_info.map((station, index) => (
                    <div key={index}>
                      <h3>{station.station_name}</h3>

                      <p>message: {station.readable_message}</p>

                    </div>
                  ))}

                </div>
              )}

            </VerticalTimelineElement>


            {events.upcoming_stations.map((station, index) => (
              <VerticalTimelineElement
                key={index}
                date={station.sta} // Assuming 'std' is the station's standard time
               
                iconStyle={{ background: 'blue', color: '#fff' }}
              >
                <h3>{station.station_name}</h3>
                <p>platform_number: {station.platform_number}</p>
                <p>distance_from_source: {station.distance_from_source}</p>
                <p>Standard Departure Time: {station.std}</p>
              </VerticalTimelineElement>
            ))}
          </div>
        );
      } else {
        console.log('No or invalid previous_stations data.');
        return null;
      }
    } else {
      console.log('No events data or events is not an object.');
      return null;
    }
  };

  return (
    <div>
      <h1>Train Information Timeline</h1>

      <div>
        <p>Current_station: {data.current_station_name}</p>
        <p>distance_from_source: {data.distance_from_source}</p>
        <p>platform_number: {data.platform_number}</p>
        <p>departure time: {data.etd}</p>
      </div>

      <button
        onClick={openModal}
        style={{
          backgroundColor: '#3498db', // Blue background color
          color: '#ffffff', // White text color for better visibility
          padding: '5px 10px', // Adjust padding as needed
          borderRadius: '5px', // Optionally, add border-radius for rounded corners
          cursor: 'pointer',
          marginTop: '15px', // Add cursor pointer for better user experience
         
          
        }}
      >
        {isModalOpen ? 'Collapse' : 'show-Timeline'}
      </button>


      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Train Timeline Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="popup">
          <button onClick={closeModal}>Close</button>

          {/* Make the modal content scrollable */}
          <div className="modal-scrollable-content">
            <VerticalTimeline>{renderTimelineElements(events)}</VerticalTimeline>
          </div>
        </div>
      </Modal>
    </div>
  );
}


function LiveTrainStatus({ data }) {
  return (
    <div className="App">
      <TrainStatus data={data.data} />
    </div>

  );
}


export default LiveTrainStatus;