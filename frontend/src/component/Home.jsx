
import React, { Suspense,useState, useEffect } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { styled } from "@mui/system";
import Model from "./Robo";
import * as THREE from "three";
import "../style/home.css"

function HomeComponent() {
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
    <div className="home-window-content h-full w-screen flex gap-0 justify-between bg-blue-500 ">
      <div className="home-container-left  flex flex-col w-4/6 max-w-4/6 h-full mt-8 mb-0 ml-28 mr-2 justify-around">

       <a href="#"><span className="home-c-l-get-app text-xl font-bold text-white mb-8">SUPER APP</span></a> 
        <div className="home-c-l-main-heading text-6xl text-white mb-8">Elevating Passenger Service with Our Dynamic Chatbot</div>
        <div className="home-c-l-main-description text-sm text-gray-300 font-thin mb-16">
          Say goodbye to long time dolor sit amet consectetur adipisicing elit. Consectetur hic natus tempora excepturi 
          atque dolorum corrupti temporibus velit pariatur ipsam vitae aspernatur doloribus obcaecati neque,
           vero culpa molestias repellat consequuntur enim nemo officia. Veritatis autem cupiditate dolorem velit
            sapiente atque quod odit id, iste, dolore libero totam natus eaque mollitia sunt nostrum veniam </div>
        <div className="home-c-l-main-btn mb-12">
          <button className="main-b-continue bg-white focus:outline-none hover:bg-blue-100 text-dark font-bold py-4  px-8 text-xl rounded-3xl mb-8">Get Started ></button>
        </div>
        <div className="home-c-l-main-aditional-info flex flex-col justify-center align-middle h-10">
          <span className="mt-2 ml-20 text-base">Satisfied more than 20Cr passengers across the India</span>
          <div className="home-c-l-m-ad-i-coontainer flex align-middle  ">
          <div className="home-c-l-m-ad-i-count flex text-6xl m-2 mx-8">20Cr+ </div>
          <div className="home-c-l-m-ad-i-count flex w-10 text-2xl justify-center items-center font-thin">Lorem, ipsum dolor.</div>
          <div className="home-c-l-m-ad-i-count flex text-6xl m-2 mx-8 ml-16">10K+</div>
          <div className="home-c-l-m-ad-i-count flex w-10 mr-12 text-2xl justify-center items-center font-thin">Lorem, ipsum.</div>
        </div></div>


   
     </div>

      <div className="home-container-right  flex w-5/12 max-w-4/12 h-screen max-h-screen ">
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
  );
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

export default  HomeComponent;