import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../component/Topbar";

function ProfileMap() {
  const { profileId } = useParams();
  const [latitude, setLatitude] = useState(10.3633);
  const [longitude, setLongitude] = useState(77.9699);

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });
  }, []);

  return (
    <div>
        <Topbar></Topbar>
 <div className="bg-gray-800  py-4 px-6 flex justify-between items-center">
      <div className="input-container">
        <label className="block mb-2 text-white">
          Latitude:
          <input
            type="text"
            name="latitude"
            value={latitude}
            placeholder="Enter latitude"
            className="border-2 border-gray-300 text-indigo-900 rounded-md py-1 px-2 ml-2 focus:outline-none"
            // Add your onChange and value attributes here
          />
        </label>
      </div>
      <div className="input-container">
        <label className="block mb-2 text-white">
          Longitude:
          <input
            type="text"
            name="longitude"
            value={longitude}
            placeholder="Enter longitude"
            className="border-2 border-gray-300 text-indigo-900 rounded-md py-1 px-2 ml-2 focus:outline-none"
            // Add your onChange and value attributes here
          />
        </label>
      </div>
    </div>
    <div className=" flex h-screen w-screen">

        <iframe
          title="Google Map"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`}
         className="h-11/12 w-screen"
          style={{ border: "0" }}
        ></iframe>
        </div>
      </div>
    // </div>
  );
}

export default ProfileMap;