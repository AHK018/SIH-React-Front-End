import React from 'react'
import bot2 from '../asset/bot_2.png';
import chatbotIcon from "../asset/chatbot.png"
import languageIcon from "../asset/language.png"
import earthIcon from "../asset/earth.png"

export default function Home3() {
  return (    

<div className='home3-page-window flex flex-col'>
<div className="home3-page-container bg-white h-auto w-screen flex px-32 justify-around">

{/* Left side with the image */}
<div className="f-i-image-container relative w-1/4 top-8">
  <img src={bot2} alt="Image" className="w-full h-auto bg-cover relative z-10 scale-150 m-auto" />
  <div className="h-2/5 rotate-45  w-full left-2 rounded-3xl  absolute    flex top-12 -z-1 inset-0 bg-blue-100 o"></div>
         
</div>

{/* Right side with headline and description */}
<div className="h3-p-c-right-content w-1/2 p-4">
  <div className="h3-p-c-r-c-bold-text text-6xl font-bold my-12">
    Improve Passenger Satisfaction
  </div>
  <div className="h3-p-c-r-c-thin-text text-xl text-gray-500">
    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, adipisci accusantium! 
    Necessitatibus tempore ad pariatur numquam ea cumque a ipsum?
  </div>

  <div className="home-c-l-main-btn my-12">
          <button className="main-b-continue bg-blue-500 text-white focus:outline-none hover:bg-blue-400 text-dark font-bold py-4  px-8 text-xl rounded-3xl mb-8">Get Started </button>
        </div>
</div>
</div>

<div className='h3-p-c-r-c-bottom-container flex gap-4 justify-around mt-12 '>
<div className="h3-p-c-r-c-bottom flex flex-col ">
  <div className="h3-p-c-r-c-b-text-bold text-center text-4xl  font-bold">Discover the Advantages of Our Innovative Services</div>
  <div className="h3-p-c-r-c-b-text-bold text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
  <div className="h3-p-c-r-c-b-card-container flex justify-around my-8 flex-row gap-12">

    <div className="h3-b-c-c-card flex flex-col border-2 p-4 rounded-3xl min-w-96 w-96 cursor-pointer">
      <div className="h3-b-c-c-c-icon">
        <img src={earthIcon} className='w-16 h-16'/>
        </div>
        <span className='h3-b-c-c-c-head text-4xl font-bold flex'>Available 24/7</span>
        <div className="h3-b-c-c-c-desc flex w-11/12 max-w-4/5 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur atque aliquam vero 
        quam expedita nemo ad quos ut minus omnis?</div>
        <span className='text-xl text-sky-600 flex cursor-pointer'>Learn more</span>
    </div>

    
    <div className="h3-b-c-c-card flex flex-col border-2 p-4 rounded-3xl min-w-96 w-96  cursor-pointer">
      <div className="h3-b-c-c-c-icon">
        <img src={languageIcon} className='w-16 h-16'/>
        </div>
        <span className='h3-b-c-c-c-head text-4xl font-bold flex'>Multi-Language Support</span>
        <div className="h3-b-c-c-c-desc flex w-11/12 max-w-4/5 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur atque aliquam vero 
        quam expedita nemo ad quos ut minus omnis?</div>
        <span className='text-xl text-sky-600 flex cursor-pointer'>Learn more</span>
    </div>

    <div className="h3-b-c-c-card flex flex-col border-2 p-4 rounded-3xl min-w-96 w-96  cursor-pointer">
      <div className="h3-b-c-c-c-icon">
        <img src={chatbotIcon} className='w-16 h-16'/>
        </div>
        <span className='h3-b-c-c-c-head text-4xl font-bold flex'>Chatboat</span>
        <div className="h3-b-c-c-c-desc flex w-11/12 max-w-11/12 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur atque aliquam vero 
        quam expedita nemo ad quos ut minus omnis?</div>
        <span className='text-xl text-sky-600 flex cursor-pointer'>Learn more</span>
    </div>

  </div>

  
  </div>

  

  </div>

</div>

// </div>
  )
}

