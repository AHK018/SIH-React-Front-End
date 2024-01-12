import React, { useState, useEffect } from 'react'
import arrivaIcon from "../asset/arrivaIcon.png"
import bellIcon from "../asset/bellI.png"
import profileIcon from "../asset/profile.png"
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RiRobot2Fill } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { MdDeviceUnknown } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
// import "node_modules/flag-icons/css/flag-icons.min.css";

export const Topbar = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage")
  );

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'mr', label: 'Marathi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'ta', label: 'Tamil' },
    { value: 'bho', label: 'Bhojpuri' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'gn', label: 'Guarani' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'gom', label: 'Konkani' },
    { value: 'mr', label: 'Marathi' },
    { value: 'ru', label: 'Russian' },
    { value: 'sd', label: 'Sindhi' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'ur', label: 'Urdu' },
  ];
  
const handleLanguage = (event) => {
  const language = event.target.value;

  // Update the selected language state
  setSelectedLanguage(language);

  // Store the selected language in local storage
  localStorage.setItem("selectedLanguage", language);

  // You can implement logic here to update the website content based on the selected language
  // For example, you can use context, Redux, or any other state management solution
  // ...
  window.location.reload();
  console.log("Selected Language:", language);
};

useEffect(() => {
  // Load initial translations
}, [selectedLanguage]);

const { pathname } = useLocation(); // Get current path
const menus = [
  { icon: <RiRobot2Fill />, id: 'chatbot', label: 'Chatbot', path: '/chat' },
  { icon: <HiSpeakerphone />, id: 'announcement', label: 'Announcement', path: '/announcement' },
  { icon: <GiKnifeFork />, id: 'food', label: 'Food', path: '/food' },
  { icon: <MdDeviceUnknown />, id: 'finder', label: 'Finder', path: '/finder' },
];


const [isOpenSidebar, setIsOpenSidebar] = useState(false);
const [isLargeScreen, setIsLargeScreen] = useState(false);
const [selectedMenu, setSelectedMenu] = useState('chatboat');
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

const closeDropdown = () => {
  setIsDropdownOpen(false);
};
const toggleSidebar = () => {
  setIsOpenSidebar(!isOpenSidebar);
};

useEffect(() => {
  const checkScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 750); // Set breakpoint as 'md'
  };

  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  return () => {
    window.removeEventListener('resize', checkScreenSize);
  };
}, []);


return (
  <div className='sticky top-0 z-50 bg-blue-500 shadow-4xl'>
    <div className="sticky px-2 sm:px-2 py-1 min-sm:mx-4 flex  justify-between items-center mx-auto  bg-blue-500 h-20  max-ms:h-16 ">
      <Link to="/home">  <div className="flex px-0 md:px-2 items-center after:content-[''] relative after:border-l-2 after:h-16 after:flex after:pl-1  after:items-center after:text-2xl esm:after:content-['ARRIVA'] after:text-white  ">

        <img src={arrivaIcon} alt="Logo" className="h-16 " />

      </div></Link>


      <div className="text-white space-x-4 md:space-x-6 text-xl xl:text-2xl ">
        <ul className="flex-row gap-2 justify-evenly md:gap-16 hidden sm:flex ">
          {menus.map((menu) => (
            <Link to={menu.path}>
              <li
                className='flex'
              >
                <div
                  className={` hover:scale-105 
           mr-2 hover:ring-white hover:delay-100 hover:animate-pulse hover:outline outline-indigo-600 rounded-xl p-2 hover:outline-offset-2 hover:outline-2  md:block before:content-[''] 
           ${pathname === menu.path ? 'rounded-lg px-2 py-1  text-indigo-800 bg-white outline ' : ''} ${pathname !== '/chat' && menu.id === 'chatbot' ? ' text-white hover:scale-110 ' : ''}`}
                  // ${menu.label !=='announcement'? 'before:border-r-2 before:border-white before:mr-2 before:border-l-0':'before:border-r-0'}
                  key={menu.id}
                >
                  <div className='flex flex-row gap-x-1 items-center'>
                    <span>
                      {menu.icon}
                    </span>
                    {menu.label}
                  </div>
                </div>

              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="flex">
          <select
            className="border-2 mx-5 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-lg px-3 py-1 text-center inline-flex items-center"
            id="languageSelector"
            value={selectedLanguage}
            onChange={handleLanguage}
          >
            {languages.map((lang) => (
              <option
                key={lang.value}
                className="px-4 py-2 hover:bg-gray-100 text-center"
                value={lang.value}
              >
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-8">
          <img src={profileIcon} onClick={toggleDropdown} alt="Profile Icon" className={`h-10  cursor-pointer hidden ms:block`} />
          {isDropdownOpen && (
            <div
              className="absolute mr-1 mt-2 bg-white border rounded shadow-md p-2">
              <ul className='justify-center cursor-pointer  '>
                <li onClick={closeDropdown} className=' my-1'>
                  <Link to="/profile">
                    Profile
                  </Link>
                </li>
                <li className='border-t border-gray-500 my-1' >
                  <Link to="/map">
                    Map</Link>
                </li>
                <li className='border-t border-gray-500 my-1'>
                  <a href="https://www.irctc.co.in/nget/train-search" className=''> Booking</a>
                </li>
                <li className='border-t border-gray-500 my-1'>
                  <Link to="/" >
                    logOut
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <FaBars className=" ms:hidden min-h-8 block  mx-4 scale-125" onClick={toggleSidebar} />
      </div>

    </div>

    {(isOpenSidebar) && (
      <div className=" top-1 bg-blue-500 z-20 block absolute top-14 w-full flex justify-center shadow-[0_20px_50px_rgba(0,_112,_184,_0.9)]">
        <div className="text-white space-x-6 text-2xl pointer">
          <ul className="flex w-screen flex-col gap-2 justify-center sm:hidden  text-center ">
            <li className='hover:scale-105  border-b border-neutral-100'><Link to="/chat" className="hover:bg-white hover:text-indigo-950 mr-2  md:block active:p-4 active:rounded-lg active:bg-blue-900 ">Chatbot</Link></li>
            <li className='hover:scale-105  border-b border-neutral-100'> <Link to="/announcement" className="hover:bg-white hover:text-indigo-950  mr-2  min-md:block">Announcement</Link></li>
            <li className='hover:scale-105  border-b border-neutral-100'> <Link to="/food" className="hover:bg-white hover:text-indigo-950  mr-2  min-md:block ">Food</Link></li>
            <li className='hover:scale-105  border-b border-neutral-100'> <Link to="/finder" className="hover:bg-white hover:text-indigo-950  mr-2  min-md:block">Finder</Link></li>
          </ul></div>
      </div>
    )}



  </div>
);
};

export default Topbar;
