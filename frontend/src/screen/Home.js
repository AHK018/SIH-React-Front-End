
// import HomeComponent from '../component/Home'
import Topbar from '../component/Topbar'
import "../style/Home2.css"
import ImageComponent from '../asset/bot_1.png';
import React, { Suspense,useState, useEffect } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { styled } from "@mui/system";
import Model from "../component/Robo";
import * as THREE from "three";
import "../style/home.css"
import bot2 from '../asset/bot_2.png';
import chatbotIcon from "../asset/chatbot.png"
import languageIcon from "../asset/language.png"
import earthIcon from "../asset/earth.png"
import { FaArrowCircleRight } from "react-icons/fa";
import { Route, Link, BrowserRouter   as Router, Routes } from 'react-router-dom';


export default function Home() {

  const [modelPosition, setModelPosition] = useState([0, 0, 0]);

  useEffect(() => {
    let animationId;

    const updateModelPosition = () => {
      const newY = Math.sin(Date.now() * 0.0024) * 1;
      setModelPosition([0, newY, 0]);
    };

    const animate = () => {
      updateModelPosition();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);


  return (
    <div className='bg-white-500 h-auto w-screen  top-0 left-0 overflow-y-auto overflow-x-hidden  snap-y'>
      <Topbar className="fixed top-0 z-50 bg-blue-500"/>

    <section className='mb-12 snap-center  '>
    <div className="home-window-content h-full w-screen flex gap-0 justify-between bg-blue-500 ">
      <div className="home-container-left  relative  flex flex-col  max-w-3/4 h-full sm:w-3/4 cp:mx-auto esm:ml-8 w-4/5 mt-6 mb-0  xl:ml-24 mr-2 justify-around ">

       <div className="home-c-l-get-app text-sm md:text-xl ml-4 md:ml-4 lg:mb-4 mb-4 md:mb-2 xl:mb-8 font-bold text-white ">SUPER APP</div>
        <div className="home-c-l-main-heading text-6xl cp:text-2xl evs:my-4 evs:text-6xl  mmd:w-5/6  lg:w-5/6 md:ml-4 md:text-5xl md:my-3 mmd:text-6xl text-white mb-2 xl:mb-8 xl:text-7xl">Elevating Passenger Service with Our Dynamic Chatbot</div>
        <div className="home-c-l-main-description text-sm cp:text-xs text-gray-300 font-thin mb-6  md:mb-5 mmd:mb-3 md:text-sm md:ml-5 lg:w-3/4 xl:mb-8 ">
          Say goodbye to long time dolor sit amet consectetur adipisicing elit. Consectetur hic natus tempora excepturi 
          atque dolorum corrupti temporibus velit pariatur ipsam vitae aspernatur doloribus obcaecati neque,
           vero culpa molestias repellat consequuntur enim nemo officia. Veritatis autem cupiditate dolorem velit
            sapiente atque quod odit id, iste, dolore libero totam natus eaque mollitia sunt nostrum veniam </div>
        <div className="home-c-l-main-btn m-0 h-2/12 flex flex-wrap mb-4">{/*mb-3 md:mb-8*/}
         <Link to="/chat" className="inline-block">
           <button className="main-b-continue bg-white focus:outline-none hover:bg-blue-100 text-dark font-bold ml-4 cp:text-sm cp:ml-2 cp:mb-2 esm:text-xl rounded-3xl p-2  mb-4 md:mb-8 xl:mb-4 flex  items-center 2xl:mb-12">Get Train Info <span className='ml-2 md:ml-3'><FaArrowCircleRight /></span> 
           </button>
           </Link>
      

        </div>
        <div className="home-c-l-main-aditional-info hidden flex-col justify-center align-middle h-10 py-4 mb-12 md:mb-6 lg:mt-1 cp:mx-auto evs:ml-4 mt-1 ms:ml-40 md:mt-1 sm:ml-24 sm:mt-2 2xl:my-2 ">
          <span className="mt-2 mx-auto evs:ml-20 cp:text-sm evs:text-base mmd:text-xl">Satisfied more than 20Cr passengers across the India</span>
          <div className="home-c-l-m-ad-i-coontainer flex align-middle  ">
          <div className="home-c-l-m-ad-i-count flex      cp:text-xl text-4xl cp:m-0  lg:m-4      lg:text-5xl m-3 mx-8">20Cr+ </div>
          <div className="home-c-l-m-ad-i-count flex w-10 cp:text-xs text-sm  cp:mr-2 lg:m-4      lg:text-xl justify-center items-center font-thin 2xl:mb-4">Lorem, ipsum dolor.</div>
          <div className="home-c-l-m-ad-i-count flex      cp:text-xl text-4xl cp:m-0  lg:m-4      lg:text-5xl m-3 mx-8 ml-16">10K+</div>
          <div className="home-c-l-m-ad-i-count flex w-10 cp:text-xs text-sm  cp:m-0  lg:m-4 r-12 lg:text-xl justify-center items-center font-thin 2xl:mb-4">Lorem, ipsum.</div>
        </div></div> 
     </div>

      <div className="home-container-right hidden sm:w-3/6  md:flex md:w-4/12 lg:w-2/5 max-w-4/12 h-screen max-h-screen ">
    <Wrapper className="App">
      <CanvasContainer>
        
        <Canvas className="canvas-robo scale-20 w-screen" shadowMap camera={{ position: [0, 0, 15] }}>
          <OrbitControls
            maxDistance={7} 
            minDistance={6}// Limit the zoom distance
            cameraProps={{ fov: 45, near: 0.1, far: 100 }}
            enableZoom={true}
          />
          <ambientLight intensity={0.5} />
          <directionalLight
          position={[-2, 5, 2]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[2, 15, -2]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[0, 5, -5]} // Above and behind the model
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <directionalLight
          position={[5, 0, 0]} // To the right of the model
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-5, 0, 0]} // To the left of the model
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <directionalLight
          position={[0, 5, 5]} // Adjusted position
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
          <Suspense fallback={null}>
            <Model position={[modelPosition[0] - 2, modelPosition[1], modelPosition[2]]}  rotation={[0,45,0]} />
          </Suspense>
          <group position={[0, -5, 10]}>
            <mesh receiveShadow>
              <shadowMaterial opacity={0.3} />
            </mesh>
          </group>
        </Canvas>
      </CanvasContainer>
    </Wrapper>
    </div>
   </div>
    </section>

    <section className='snap-center  '>
    <div className='home2-page-container bg-white h-screen w-screen flex flex-col  justify-center'>

        <div className="home2-p-c-head">
            <div className="h2-p-c-h-bold-main-text font-bold cp:text-3xl ms:text-4xl lg:text-5xl xl:text-6xl text-center"> Features Of Advance AI Chatbot</div>
            <div className="h2-p-c-h-desc-text flex font-thin text-center cp:w-11/12 cp:mt-2 cp:mb-8 w-1/2 m-auto my-1 text-xs sm:my-2 lg:my-4 lg:text-base emd:w-2/6">Eva has Multi language support, Voice & Text input and response, checks ticket information, provide info. about Station facility of particular station.</div>
        </div>

        <div className='f-i-text-container flex items-center justify-around cp:gap-x-0 sm:gap-y-1  lg:gap-y-60  my-4' >
          
    
          <div className="flex flex-col gap-y-11">
          <div className="flex cursor-pointer text-center filter-none justify-center items-center border-2 rounded-3xl border-gray hover:bg-blue-500 hover:text-white p-4 scale-75 esm:text-base sm:p-2 cp:text-xs cp:p-2 cp:scale-90 sm:text-base emd:text-xl  xl:text-2xl mmd:text-2xl mmd:p-4  mix-blend-multiply cp:translate-x-1/3 ">Personalized Announcement</div>
          <div className="flex cursor-pointer text-center filter-none justify-center items-center border-2 rounded-3xl border-gray hover:bg-blue-500 hover:text-white p-4 scale-75 esm:text-base sm:p-2 cp:text-xs cp:p-2 cp:scale-90 sm:text-base emd:text-xl  xl:text-2xl  mmd:text-2xl mmd:p-4 mix-blend-multiply cp:-translate-x-1">Personalized Announcement</div>
           <div className="flex cursor-pointer text-center filter-none justify-center items-center border-2 rounded-3xl border-gray hover:bg-blue-500 hover:text-white p-4 scale-75 esm:text-base sm:p-2 cp:text-xs cp:p-2 cp:scale-90 sm:text-base emd:text-xl  xl:text-2xl mmd:text-2xl mmd:p-4  mix-blend-multiply cp:translate-x-1/3 cp:translate-y-1/3">Personalized Announcement</div>
          </div>
          
          <div className="f-i-image-container h-auto relative flex ">
            <div className="h-5/6 -translate-y-4 w-full   rounded-3xl  absolute  top-12  inset-0 bg-blue-100 justify-self-center vsm:h-3/5 vsm:w-4/5 vsm:m-auto ms:h-3/6 ms:m-auto ms:w-4/6"></div>
            <img src={ImageComponent} alt="Image" className="min-height-24 bg-cover z-10 cp:translate-y-3/4-20 scale-150 z-10 justify-center vsm:scale-100 " />
          </div>
          
          <div className="flex flex-col gap-y-11">
          <div className="flex cursor-pointer text-center filter-none justify-center items-center border-2 rounded-3xl border-gray hover:bg-blue-500 hover:text-white p-4 scale-75 esm:text-base sm:p-2 cp:text-xs cp:p-2 cp:scale-90 sm:text-base emd:text-xl xl:text-2xl  mmd:text-2xl mmd:p-4 mix-blend-multiply cp:-translate-x-1/3 ">Personalized Announcement</div>
          <div className="flex cursor-pointer text-center filter-none justify-center items-center border-2 rounded-3xl border-gray hover:bg-blue-500 hover:text-white p-4 scale-75 esm:text-base sm:p-2 cp:text-xs cp:p-2 cp:scale-90 sm:text-base emd:text-xl xl:text-2xl  mmd:text-2xl mmd:p-4 mix-blend-multiply cp:translate-x-1">Personalized Announcement</div>
           <div className="flex cursor-pointer text-center filter-none justify-center items-center border-2 rounded-3xl border-gray hover:bg-blue-500 hover:text-white p-4 scale-75 esm:text-base sm:p-2 cp:text-xs cp:p-2 cp:scale-90 sm:text-base emd:text-xl xl:text-2xl   mmd:text-2xl mmd:p-4 mix-blend-multiply cp:-translate-x-1/3 cp:translate-y-1/3">Personalized Announcement</div>
          </div>
          
        </div>

        </div>


    </section>

<section className='my-0 snap-center md:my-12 lg:my-16 lg:py-2'>
  
<div className='home3-page-window flex flex-col gap-0'>
<div className="home3-page-container bg-white h-auto w-screen flex  justify-around cp:mt-4 vsm:mt-0">
<div className="f-i-image-container relative hidden vsm:flex ">
  <div className="w-3/4 h-2/5 rotate-45 top-1/3 translate-x-1/6 md:h-3/5 md:w-5/6  vsm:flex vsm:h-1/3 cp:translate-y-0 rounded-3xl  absolute  inset-0 bg-blue-100    "/>
  <img src={bot2} alt="Image" className="h-4/5 bg-cover z-10  scale-150 z-10 justify-center vsm:scale-100 sm:scale-150 md:h-full" />
         
</div>

<div className="h3-p-c-right-content w-full flex flex-col vsm:w-1/2 text-center">
  <div className="h3-p-c-r-c-bold-text cp:text-4xl text-6xl font-bold vsm:my-6 cp:my-4">
    Improve Passenger Satisfaction
  </div>
  <div className="h3-p-c-r-c-thin-text text-xl text-gray-500 cp:text-base cp:p-2">
    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, adipisci accusantium! 
    Necessitatibus tempore ad pariatur numquam ea cumque a ipsum?
  </div>

  <div className="home-c-l-main-btn my-6">
         <Link to="/chat"><button className="main-b-continue bg-blue-500 text-white focus:outline-none hover:bg-blue-400 text-dark font-bold py-4  px-8 text-xl rounded-3xl mb-4">Get Started </button></Link> 
        </div>
</div>
</div>
</div>
</section>

<section className='my-12 snap-center '>
<div className='h3-p-c-r-c-bottom-container flex flex-col md:flex-row gap-4 justify-around mt-12 snap-center max-w-screen overflow-hidden w-screen'>
    <div className="h3-p-c-r-c-bottom flex flex-col w-full md:w-4/6 lg:w-5/6 items-center">
      <div className="h3-p-c-r-c-b-text-bold text-center w-full font-bold p-2 md:p-4 text-2xl md:text-4xl mb-2">
        Discover the Advantages of Our Innovative Services
      </div>
      <div className="h3-p-c-r-c-b-text-bold text-center cp:text-sm vsm:text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
 
      <div className=" snap-x h3-p-c-r-c-b-card-container scroll-smooth  p-12 m-auto flex gap-16 w-screen max-w-screen overflow-auto">

  <div className="snap-center h3-b-c-c-card group snap-always hover:bg-gradient-to-r from-cyan-500 to-blue-500 snap-center scroll-ps-8  flex flex-col border-2 p-4  rounded-3xl  w-[24%] min-w-[24%]  cursor-pointer">
     <div className="h3-b-c-c-c-icon min-w-4/5 ">
        <img src={earthIcon} className='w-16 h-16 '/>
        </div>
        <span className='h3-b-c-c-c-head scroll-ml-6 snap-start text-4xl font-bold group-hover:text-white flex'>Available 24/7</span>
        <div className="h3-b-c-c-c-desc flex w-11/12 max-w-4/5 my-4 group-hover:text-zinc-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur atque aliquam vero 
        quam expedita nemo ad quos ut minus omnis?</div>
        <span className='text-xl text-sky-600 flex cursor-pointer group-hover:text-fuchsia-50'>Learn more</span>
    </div>

    
    <div className="snap-center h3-b-c-c-card group snap-always hover:bg-gradient-to-r from-cyan-500 to-blue-500 snap-center scroll-ps-8  flex flex-col border-2 p-4  rounded-3xl  w-[24%] min-w-[24%]  cursor-pointer">
      <div className="h3-b-c-c-c-icon">
        <img src={languageIcon} className='w-16 h-16'/>
        </div>
        <span className='h3-b-c-c-c-head scroll-ml-6 snap-start text-4xl font-bold group-hover:text-white flex'>Multi-Language Support</span>
        <div className="h3-b-c-c-c-desc flex w-11/12 max-w-4/5 my-4 group-hover:text-zinc-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur atque aliquam vero 
        quam expedita nemo ad quos ut minus omnis?</div>
        <span className='text-xl text-sky-600 flex cursor-pointer group-hover:text-fuchsia-50'>Learn more</span>
    </div>

    <div className="snap-center h3-b-c-c-card group snap-always hover:bg-gradient-to-r from-cyan-500 to-blue-500 snap-center scroll-ps-8  flex flex-col border-2 p-4  rounded-3xl  w-[24%] min-w-[24%]  cursor-pointer">
      <div className="h3-b-c-c-c-icon">
        <img src={chatbotIcon} className='w-16 h-16'/>
        </div>
        <span className='h3-b-c-c-c-head scroll-ml-6 snap-start text-4xl font-bold group-hover:text-white flex'>Chatboat</span>
        <div className="h3-b-c-c-c-desc flex w-11/12 max-w-4/5 my-4 group-hover:text-zinc-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur atque aliquam vero 
        quam expedita nemo ad quos ut minus omnis?</div>
        <span className='text-xl text-sky-600 flex cursor-pointer group-hover:text-fuchsia-50'>Learn more</span>
    </div>

   

  </div>

  
  </div>
  </div>
    </section>

    </div>
  )
}



const Wrapper = styled("div")`
  display: flex;
  position: relative;
  background: transparent;  
`;

const CanvasContainer = styled("div")`
  flex: 1;
  width:60vw;
  z-index:11;
  top:0;
  align-items:center;
  justify-content:center
`;
