import React, { useState,useEffect } from 'react';
import Topbar from '../component/Topbar'
import  "../style/AboutUs.css"
import textRoboImage from '../asset/texting_robo.png';
import hiRobo from '../asset/welcome_robo.png';

const images = [hiRobo,textRoboImage, textRoboImage ];
const texts = ['Hello sir, welcome back', 'Text for Image 2', 'I will like to solve your train related queries'];
    
export default function AboutUs() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  

  const textStyles = [
    { top: '5%', left: '22%' }, // Style for Text 1
    { top: '20%', left: '30%' }, // Style for Text 2
    { top: '100%', left: '10%' }, // Style for Text 3
  ];

  const imageStyles = [
    { top: '25%', left: '25%' }, // Style for Image 1
    { top: '5%', left: '5%' }, // Style for Image 2
    { top: '90%', left: '60%' }, // Style for Image 3
  ];


  const handleScreenClick = () => {
    if (slideIndex < images.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === images.length - 1) {
      setShowIntro(false);
    }
  };
  
  useEffect(() => {
    if (showIntro) {
      window.addEventListener('click', handleScreenClick);
      return () => window.removeEventListener('click', handleScreenClick);
    }
  }, [slideIndex, showIntro]);

  return (
    <div>
      <Topbar/>
      {/* ... (other JSX code) */}
      {showIntro && (
        <div className="intro-section absolute w-screen min-h-screen" style={{ backgroundColor: 'rgba(8, 1, 22, 0.838)' }}>
          <div className="intro-item relative" onClick={handleScreenClick}>
            <p className="text-gray-700 flex bg-white rounded-xl p-4 min-w-1/12 max-w-4/12 m-4 absolute text-center after:content-['']" style={{ ...textStyles[slideIndex] }}>
              {texts[slideIndex]}
            </p>
            <img
              src={images[slideIndex]}
              alt={`Slide ${slideIndex + 1}`}
              className="animate-heart"
              style={{ ...imageStyles[slideIndex] }}
            />
          </div>
        </div>
      )}
          <div className="main-page">

        <section class="about">
        <h1>About Us</h1>
        <p className='font-bold'>Ministry of Indian Railways</p>
        <div class="about-info">
            <div class="about-img">
                <img src="https://t4.ftcdn.net/jpg/05/68/95/95/240_F_568959557_ubkX6IdvYrUUHVGj6FWhw65h6LFFEFRZ.jpg"/>
            </div>
            <div>
                <p>We are the dedicated team behind this project, representing a group of ambitious third-year B.Tech students from the renowned Maharashtra Institute of Technology (MIT) AOE, Alandi, Pune. This endeavor is the fruit of our participation in the esteemed Smart India Hackathon, showcasing our zeal for innovation and our drive to tackle real-world challenges. Our mission centers on revolutionizing the railway travel experience, addressing prevailing issues such as language barriers and inadequate information access. By harnessing cutting-edge AI and real-time technologies, we aim to create a seamless and enjoyable railway journey for passengers.</p>
            </div>
        </div>
    </section>


    <section class="team">
        <h1>Meet Our Team</h1>
        <div class="team-cards">
           
            <div class="card">
                <div class="card-img">
                    <img src="https://t4.ftcdn.net/jpg/05/68/95/95/240_F_568959557_ubkX6IdvYrUUHVGj6FWhw65h6LFFEFRZ.jpg" alt="User 3"/>
                </div>
                <div class="card-info">
                    <h2 class="card-name">Amey</h2>
                    <p class="card-role">Leader</p>
                    <p class="card-email">amey.khamkar@mitaoe.ac.in</p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>
        </div>

       
    </section>
    </div>
        {/* )}
        {slideIndex < images.length - 1 && (
          <button className="next-button" onClick={nextSlide}>
            Next
          </button>
        )}
      </section> */}
    </div>
  )
}



  // return (
  //   <div>
  //     {/* ... (other JSX code) */}
  //     {showIntro && (
  //       <div className="intro-section absolute w-screen min-h-screen " style={{ backgroundColor: 'rgba(8, 1, 22, 0.838)' }}>
  //         <div className="intro-item relative">
  //           <p className="text-gray-700 bg-white rounded-xl p-4 w-1/12 m-4 absolute text-center after:content-['']" style={{ ...textStyles[slideIndex] }}>
  //             {texts[slideIndex]}
  //           </p>
  //           <img
  //             src={images[slideIndex]}
  //             alt={`Slide ${slideIndex + 1}`}
  //             className='animate-heart'
  //             style={{ ...imageStyles[slideIndex] }}
  //           />
  //           {slideIndex < images.length - 1 && (
  //             <button className="next-button  text-white bg-blue-500 rounded-lg text-2xl p-2" onClick={nextSlide}>
  //               Next
  //             </button>
  //           )}
  //           {slideIndex === images.length - 1 && (
  //             <button className="get-started-button text-white bg-blue-500 rounded-lg text-2xl p-2" onClick={handleGetStarted}>
  //               Get Started
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     )}









// local storage
  // useEffect(() => {
  //   const hasIntroShown = localStorage.getItem('introShown');
  //   if (hasIntroShown) {
  //     setShowIntro(false);
  //   }
  // }, []);

  // const nextSlide = () => {
  //   if (slideIndex < images.length - 1) {
  //     setSlideIndex(slideIndex + 1);
  //   } else {
  //     setShowIntro(false);
  //     localStorage.setItem('introShown', 'true');
  //   }
  // };

  // const handleScreenClick = () => {
  //   if (slideIndex < images.length - 1) {
  //     setSlideIndex(slideIndex + 1);
  //   } else if (slideIndex === images.length - 1) {
  //     setShowIntro(false);
  //     localStorage.setItem('introShown', 'true');
  //   }
  // };