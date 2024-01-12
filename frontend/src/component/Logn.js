import { React, useState } from "react";
import LogInImage from "../asset/icon/log.png";
import ArrivaLogo from "../asset/arrivaIcon.png";
import LockIcon from "../asset/icon/lock.png";

import {
  Route,
  Link,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios  from "axios";
export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const path = 'http://127.0.0.1:5000';
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${path}/login`, {
        password1: password,
        email1: email,
      });
      if (response.data == 'True') {
        
        console.log("Login successful!");
        navigate("/home"); // Redirects the user to "/home" route
        // Redirect or perform an action upon successful login
      }
      else{
        console.error("Login failed!");
      }
      if(response.data == 'False') {
        console.error("Login failed!");
        // Handle login failure, show error message, etc.
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors during login
    }
  };
  return (
    <>
   
      <div className="bg-slate-50 ">
        <div className="w-screen flex gap-0 h-screen">
          <div className="flex  w-1/2">
            <img
              className="h-screen w-11/12 rounded-r-3xl "
              src={LogInImage}
              alt="img"
            />
          </div>

          <div class="flex flex-col  w-1/2 gap-1 justify-center align-center m-auto  py-12 px-6 lg:px-8  scale-101">
            <div className="flex px-0 m-auto md:px-2 items-center after:content-[''] relative after:text-blue-950 after:border-l-2 after:border-amber-400 after:h-16 after:flex after:pl-1  after:items-center after:text-2xl esm:after:content-['ARRIVA']  ">
              <img src={ArrivaLogo} alt="Logo" className="h-16 " />
            </div>
            <div className="w-3/5 m-auto">
            <form onSubmit={handleSubmit}>
                <div class="">
                  <label
                    for="email"
                    class="block text-gray-900 font-small my-2 font-medium relative top-8 text-xl "
                  >
                    Email
                  </label>

                  <img
                    src="https://img.icons8.com/fluency/48/business-e-mail.png"
                    alt="business-e-mail"
                    className="h-8 w-8 relative top-9 ml-2"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none focus:border-blue-500 text-xl"
                    placeholder="Email"
                    autoComplete="username"
                  />
                </div>

                <div class="">
                  <label
                    for="password"
                    class="block text-gray-900 font-medium relative top-8 text-xl"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg indent-10 focus:outline-none bg-white focus:border-blue-500 my-2  text-xl"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  <div class="text-sm">
                    <a
                      href="#"
                      class=" text-black-600 hover:text-black-500 my-3 font-semibold px-1 float-right  text-blue-500  text-xl"
                    >
                      Reset Password!
                    </a>
                  </div>
                </div>
                
                  <button
                    type="submit"
                    
                    class="w-full px-4 py-2 my-2 text-white bg-blue-500 rounded-lg rounded-mm hover:bg-blue-600  text-2xl"
                  >
                    Login
                  </button>

                <p class="text-center mt-1 text-gray-600 relative before:content-'' before:absolute before:left-0 before:w-2/5 before:border-b-2 before:top-3 before:border-gray-300  after:content-'' after:absolute after:right-0 after:w-2/5 after:border-b-2 after:top-3 after:border-gray-300">
                  or
                </p>
                <div>
                  <div class="flex justify-around my-4 ">
                    <article className="h-16 w-16 bg-white rounded-xl flex  justify-center items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 48 48"
                        class="stroke-1 hover:stroke-2"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                    </article>

                    <article className="h-16 w-16 bg-white rounded-xl flex  justify-center items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 48 48"
                        class="stroke-1 hover:stroke-2"
                      >
                        <path
                          fill="#039be5"
                          d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                        ></path>
                      </svg>
                    </article>

                    <article className="h-16 w-16 bg-white rounded-xl flex  justify-center items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-1 hover:stroke-2"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                      >
                        <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"></path>
                      </svg>
                    </article>
                  </div>

                  <div className="text-center  mt-2 text-xl">
                    Don't have a account?{" "}
                    <Link className="text-blue-500" to="/signup">
                      Create Account
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