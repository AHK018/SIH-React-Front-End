// import React from 'react'
// import "../style/Announcement.css"
// export default function Announcements() {
//   return (
//     <div>
//         <section>

//         <div className="full-box-shri22">
       
//           <div className="first-box-shri-21" >
//           <img className="img-2" width="80" height="80" src="https://img.icons8.com/papercut/60/commercial.png" alt="commercial"/>
//             <h1>Announcements</h1>
           
//            <div className="search">
//             <input type="text" className="searchTerm rounded-4xl" placeholder="What are you looking for?"/>
//              <button type="submit" className="searchButton">
//              <i className="fa fa-search"></i>
//               </button>
//            </div>

//           </div>
//           <div className="ann-shri"> 
//             <ul>
//                 <li>
//                     <div className="date-time-33">
//                         <h2>Today <span></span></h2>
                        
//                     </div>
//                    <div className="ann-details">
//                     <h3>SIH winning ppt</h3>
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//                         Corrupti repellat similique, deleniti quo, excepturi quisquam 
//                         odit commodi ab molestias nesciunt possimus suscipit amet.</p>
                      
//                    </div>
//                 </li>
//             </ul>
//          </div>
//           <div className="ann-shri">
//             <ul>
//                 <li>
//                     <div className="date-time-33">
//                         <h2>24 <br></br><span>June</span></h2>
//                     </div>
//                    <div className="ann-details">
//                     <h3>Lorem ipsum dolor sit amet.</h3>
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//                         Corrupti repellat similique, deleniti quo, excepturi quisquam 
//                         odit commodi ab molestias nesciunt possimus suscipit amet.</p>
                      
//                    </div>
//                 </li>
//             </ul>
//          </div>
//           <div className="ann-shri">
//             <ul>
//                 <li>
//                     <div className="date-time-33">
//                         <h2>1 <br></br><span>Oct</span></h2>
//                     </div>
//                    <div className="ann-details">
//                     <h3>Lorem ipsum dolor sit amet.</h3>
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//                         Corrupti repellat similique, deleniti quo, excepturi quisquam 
//                         odit commodi ab molestias nesciunt possimus suscipit amet.</p>
                      
//                    </div>
//                 </li>
//             </ul>
//          </div>
//          </div>

         
        
       

//         </section>

        
//     </div>
//   )
// }










import React from 'react';
import SearchIcon from "../asset/search.png"

export default function Announcements() {
  return (

      <div className="bg-gray-100 py-10">
        <div className="w-screen max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img
                src="https://img.icons8.com/papercut/60/commercial.png"
                alt="commercial"
                className="w-20 h-20"
              />
              <h1 className="text-3xl font-bold ml-4">Announcements</h1>
            </div>
            <div className="relative rounded-lg w-6/12 overflow-hidden">
                <form action="">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-2xl focus:outline-none"
            />
            <button className="absolute top-2 right-5">
              <img src={SearchIcon} className='h-8 w-8'/>
            </button></form>
          </div>
          </div>
          {/* after:border-b-2 after:border-gray-300 after:-left-5 after:mr-4 after:top-3 after:content-'' after:w-4 after:h-1 after:absolute */}
<div className="gray-line-with-date text-xl text-gray-400 m-4 relative before:border-b-2 before:border-gray-300 before:left-12 before:ml-4 before:top-3  before:content-'' before before:w-1/5 before:h-1 before:absolute  ">Today</div>
        <div className="gray-line-with-text"></div>
          <div className="flex ">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm font-semibold">Today</div>
              <h2 className="text-lg font-semibold">SIH winning ppt</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat
                similique, deleniti quo, excepturi quisquam odit commodi ab molestias
                nesciunt possimus suscipit amet.
              </p>
            </div>
          </div>
        </div>
      </div>
   
  );
}
