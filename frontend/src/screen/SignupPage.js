import { React, useState } from "react";
import LogInImage from "../asset/icon/log.png";
import ArrivaLogo from "../asset/arrivaIcon.png";
import LockIcon from "../asset/icon/lock.png";

import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";

const path = 'http://127.0.0.1:5000'

// import { createUserWithEmailAndPassword } from 'firebase/auth'; 'firebase/auth'
export default function SignUp() {

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    language: "",
  });

  const handleLanguageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, language: value });
  };

  const postUserData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${path}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        window.navigator("/home")
        alert("User registered successfully")

        // Handle success, e.g., redirect to a login page
      } else {
        const errorData = await response.json();
        console.error('Error occurred:', errorData.message);
        // Handle the error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log(userData)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target)
    // console.log("Selected Language:", language);
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <div className="bg-slate-50 h-screen overflow-hidden ">
        <div className="w-screen flex gap-0 h-screen">
          <div className="flex  w-1/2">
            <img
              className="h-screen w-11/12 rounded-r-3xl "
              src={LogInImage}
              alt="img"
            />
          </div>

          <div class="flex flex-col  w-1/2 gap-1 justify-center align-center m-auto max-h-screen overflow-scroll  py-12 px-6 lg:px-8  scale-101">
            <div className="flex px-0 m-auto md:px-2 items-center after:content-[''] relative after:text-blue-950 after:border-l-2 after:border-amber-400 after:h-16 after:flex after:pl-1  after:items-center after:text-2xl esm:after:content-['ARRIVA']  ">
              <img src={ArrivaLogo} alt="Logo" className="h-16 " />
            </div>
            <div className="w-3/5 m-auto">
              <form>
                <div className="flex">
                  <div className="flex">
                    <div class="">
                      <label
                        for="fname"
                        class="block text-gray-900 font-small my-2 font-medium relative top-8 text-xl "
                      >
                        First Name
                      </label>

                      <div className="h-8 w-8 relative top-9 ml-2" ></div>
                      <input
                        type="text"
                        id="fname"
                        name="firstname"
                        class="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none focus:border-blue-500 text-xl"
                        placeholder="First Name"
                        value={userData.firstname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="">
                      <label
                        for="lname"
                        class="block text-gray-900 font-small my-2 font-medium relative top-8 text-xl "
                      >
                        Last Name
                      </label>
                      <div className="h-8 w-8 relative top-9 ml-2"></div>
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        class="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none focus:border-blue-500 text-xl"
                        placeholder="Last Name"
                        value={userData.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="">
                  <label
                    for="email"
                    class="block text-gray-900 font-small my-2 font-medium relative top-2 text-xl "
                  >
                    Email
                  </label>

                  <img
                    src="https://img.icons8.com/fluency/48/business-e-mail.png"
                    alt="business-e-mail"
                    className="h-8 w-8 relative top-10 ml-2"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none focus:border-blue-500 text-xl"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div class="">
                  <label
                    for="password"
                    class="block text-gray-900 font-medium relative top-4 text-xl"
                  >
                    Password
                  </label>
                  <img
                    src={LockIcon}
                    className="h-8 w-8 relative top-12 ml-2"
                  />

                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none bg-white focus:border-blue-500 my-2  text-xl"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="">
                  <label
                    for="phone"
                    class="block text-gray-900 font-medium relative top-3 text-xl"
                  >
                    Phone number
                  </label>

                  <img
                    className="h-8 w-8 relative top-12 ml-2"
                    src="https://img.icons8.com/fluency/48/phone--v1.png"
                    alt="phone--v1"
                  />

                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    class="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none bg-white focus:border-blue-500 my-2  text-xl"
                    placeholder="Number"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="">
                  <label
                    for="phone"
                    class="block text-gray-900 font-medium relative top-3 text-xl"
                  >
                    Choosen your language to get messages
                  </label>

                  <img
                    className="h-8 w-8 relative top-12 ml-2"
                    src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/external-interface-essential-ui-v4-creatype-outline-colourcreatype-7.png"
                    alt="external-interface-essential-ui-v4-creatype-outline-colourcreatype-7"
                  />

                  <select
                    className="w-full px-4 py-2 border font-bold rounded-lg indent-10 focus:outline-none bg-white focus:border-blue-500 my-2 text-xl"
                    id="language"
                    value={userData.language}
                    onChange={handleLanguageChange} // Update this line
                  >
                    <option
                      className=" px-4 py-2 hover:bg-gray-100 text-center "

                      value="en"
                    >
                      English{" "}
                    </option>
                    <option
                      className=" px-4 py-2 hover:bg-gray-100 text-center"

                      value="hi"
                    >
                      Hindi
                    </option>

                    <option
                      className=" px-4 py-2 hover:bg-gray-100 text-center"
                      value="mr"
                    >
                      Marathi
                    </option>
                    <option
                      className=" px-4 py-2 hover:bg-gray-100 text-center"
                      value="bn"
                    >
                      Bengali
                    </option>
                    <option
                      className=" px-4 py-2 hover:bg-gray-100 text-center"
                      value="ta"
                    >
                      Tamil{" "}
                    </option>
                  </select>
                </div>
                <Link to="/home">
                  <button
                    type="submit"
                    onClick={postUserData}
                    class="w-full px-4 py-2 my-2 text-white bg-blue-500 rounded-lg rounded-mm hover:bg-blue-600  text-2xl"
                  >
                    Sign Up
                  </button>
                </Link>
                <p class="text-center mt-1 text-gray-600 relative before:content-'' before:absolute before:left-0 before:w-2/5 before:border-b-2 before:top-3 before:border-gray-300  after:content-'' after:absolute after:right-0 after:w-2/5 after:border-b-2 after:top-3 after:border-gray-300">
                  or
                </p>
                <div>
                  <div className="text-center mt-2 text-xl">
                    Already have a account?{" "}
                    <Link to="/" className="text-blue-600 ">
                      Log In
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}