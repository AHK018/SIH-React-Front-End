import React from 'react'
import "../style/Home2.css"
import ImageComponent from '../asset/bot_1.png';

// const imageStyles = 'w-64 h-32';



export default function Home2() {
  return (
    <div className='home2-page-container bg-white h-screen w-screen flex flex-col pt-12 '>

        <div className="home2-p-c-head">
            <div className="h2-p-c-h-bold-main-text font-bold text-6xl text-center"> Features Of Advance AI Chatbot</div>
            <div className="h2-p-c-h-desc-text flex font-thin text-center max-w-2/5 w-2/5 m-auto mt-8 text-xl">Eva has Multi language support, Voice & Text input and response, checks ticket information, provide info. about Station facility of particular station.</div>
        </div>


        <div className="h2-p-c-h-feature-image mx-32 my-32">
        {/* Apply custom styles to the container */}
        <div className='f-i-text-container flex flex-row items-center  justify-around space-x-4 gap-60  ' >
          <div className='flex flex-col gap-20 relative left-12' >
            <div className='f-i-t-c-textbox min-w-full max-h-2/12 text-center cursor-pointer rounded-3xl  py-4 px-16 border-2 border-gray-300 hover:bg-blue-500 hover:text-white tex text-2xl relative left-32'>
              Muiltilingual 
            </div> 
            <div className='f-i-t-c-textbox cursor-pointer rounded-3xl py-4 px-16 border-2 border-gray-300 hover:bg-blue-500 hover:text-white text-center text-2xl'>
              Ticket Info
            </div> 
            <div className='f-i-t-c-textbox cursor-pointer rounded-3xl py-4 px-4 w-full border-2 border-gray-300 hover:bg-blue-500 hover:text-white text-center text-2xl relative left-32' >
               Voice & Text Support
            </div>
          </div>
          
          <div className="f-i-image-container relative">
            <img src={ImageComponent} alt="Image" className="w-11/12 scale-150 h-auto bg-cover relative z-10 m-auto" />
            <div className="h-4/5 w-full left-2 rounded-3xl  absolute flex top-12 -z-1 inset-0 bg-blue-100 o"></div>
          </div>
          
          <div className='flex flex-col gap-20 relative right-12'>
            <div className='f-i-t-c-textbox cursor-pointer rounded-3xl py-4 px-16 border-2 border-gray-300 hover:bg-blue-500 hover:text-white text-center text-2xl relative right-32'>
              Train Schedule 
            </div> 
            <div className='f-i-t-c-textbox cursor-pointer rounded-3xl py-4 px-16 border-2 border-gray-300 hover:bg-blue-500 hover:text-white text-center text-2xl'>
              Annoucements 
            </div> 
            <div className='f-i-t-c-textbox cursor-pointer rounded-3xl py-4 px-16 border-2 border-gray-300 hover:bg-blue-500 hover:text-white text-center text-2xl relative right-32'>
              Station Facility
            </div> 
          </div>
        </div>
      </div>
        


        </div>


  )
}



