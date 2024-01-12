import React, { useEffect, useState } from "react";
import Topbar from "../component/Topbar";

const RailwayProfilePage = () => {
  // Initialize state for user data
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Function to handle language selection
  const handleLanguage = (e) => {
    const selectedLanguage = e.target.value;
    // You can do something with the selectedLanguage if needed
  };

  // Effect to run once on component mount to fetch data from local storage
  useEffect(() => {
    // Get user data from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }

    // Get selected language from local storage
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  return (
    <div><Topbar></Topbar>
    <div className="flex flex-col items-center mb-8 ">
      
      <img
        width="120"
        height="120"
        src="https://bootdey.com/img/Content/avatar/avatar7.png"
        alt="user-male-circle"
      />
      <div className="circle-icon-center1"></div>
      <div className="flex gap-2 font-bold">
        <h2 className="text-xl font-bold text-gray-800">
          {userData.firstname} {userData.lastname}
        </h2>
        <img
          width="20"
          height="20"
          className="cursor-pointer"
          src="https://img.icons8.com/windows/32/edit--v1.png"
          alt="edit--v1"
        />
      </div>
      <p className="text-gray-600 mb-4">{userData.role}</p>
      <div className="flex items-center justify-center space-x-4 font-bold">
        <p href={`mailto:${userData.email}`} className="hover:underline">
          Email : {userData.email}
        </p>
        <img
          width="20"
          height="20"
          className="cursor-pointer"
          src="https://img.icons8.com/windows/32/edit--v1.png"
          alt="edit--v1"
        />
        <a href={`tel:${userData.phone}`} className="hover:underline">
          Phone Number: {userData.phone}
        </a>
        <img
          width="20"
          height="20"
          className="cursor-pointer"
          src="https://img.icons8.com/windows/32/edit--v1.png"
          alt="edit--v1"
        />
      </div>
      <div className="flex gap-2 font-bold">
        <p className="hover:underline">Choose language : {selectedLanguage}</p>
        <img
          width="20"
          height="20"
          className="cursor-pointer"
          src="https://img.icons8.com/windows/32/edit--v1.png"
          alt="edit--v1"
        />
      </div>
 <div className="mb-8 text-center border-4 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 ">User History</h2>
      {/* Add railway experience details here */}
      <div className="mb-4">
        
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
      </div>
      {/* Add more experience entries as needed */}
    </div>
 <div className="mb-8 text-center border-4 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Train Routes</h2>
      {/* Add train route details here */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-700">Route: City Express</h3>
        <p className="text-gray-600">Departure: City A - Arrival: City B</p>
      </div>
      {/* Add more train routes as needed */}
    </div>
 <div className="text-center border-4 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Feedback</h2>
      {/* Add customer feedback or testimonials here */}
      <div className="mb-4">
        <p className="text-gray-600">"John Doe is a fantastic train driver. Always on time and provides a smooth journey."</p>
        <p className="text-gray-500">- Jane Smith, Passenger</p>
      </div>
      {/* Add more feedback entries as needed */}
    </div>
    </div>
    </div>
  );
};

export default RailwayProfilePage;