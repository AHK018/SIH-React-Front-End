import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function SliderBar() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <>
      <Slider {...settings}>
        <div className="flex flex-col justify-center">
          <div className="w-2/6 justify-center relative flex flex-wrap border rounded-md bg-white-200 border-box shadow-sm p-1 m-10 text-base">
          <label className="flex-1 text-center transition-transform transform hover:scale-105">
                    <input type="radio" name="radio" className="hidden" />
                    <span className="w-full gap-2 h-full flex justify-center items-center   px-5 py-2 text-1xl font-bold text-black rounded-[14px] bg-gradient-to-t hover:text-white hover:bg-[#3B82F6]">
                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/siren.png" alt="siren"/>
                      Alerts
                    </span>
                  </label>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-2/6 justify-center relative flex flex-wrap border rounded-md bg-white-200 border-box shadow-sm p-1 m-10 text-base">
          <label className="flex-1 text-center transition-transform transform hover:scale-105">
                    <input
                      type="radio"
                      name="radio"
                      className="hidden"
                      defaultChecked
                    />
                    <span className="w-full h-full flex items-center px-5 gap-2 py-2 text-1xl text-black font-bold rounded-[14px] bg-gradient-to-t hover:text-white hover:bg-[#00586c]">
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/stickers/100/train.png"
                      alt="train"
                    />
                      PNR 
                    </span>
                  </label>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-2/6 justify-center relative flex flex-wrap border rounded-md bg-white-200 border-box shadow-sm p-1 m-10 text-base">
          <label className="flex text-center items-center transition-transform transform hover:scale-105 rounded-md">
                    <input type="radio" name="radio" className="hidden" />
                    <span className="w-full gap-2 h-full flex items-center px-5 py-2 text-1xl font-bold text-black rounded-[14px] bg-gradient-to-t hover:text-white hover:bg-[#a62ce2]">
                    <img 
                      width="20"
                      height="20"
                      src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/external-backpack-camping-kiranshastry-lineal-color-kiranshastry.png"
                      alt="external-backpack-camping-kiranshastry-lineal-color-kiranshastry"
                    />
                    Real
                    </span>
                  </label>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-2/6 justify-center relative flex flex-wrap border rounded-md bg-white-200 border-box shadow-sm p-1 m-10 text-base">
            <label className="flex-1 text-center transition-transform transform hover:scale-105">
              <input
                type="radio"
                name="radio"
                className="hidden"
                defaultChecked
              />
               <span className="w-full gap-2 h-full flex justify-center items-center   px-5 py-2 text-1xl font-bold text-black rounded-[14px] bg-gradient-to-t hover:text-white hover:bg-[#3B82F6]">
                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/siren.png" alt="siren"/>
                      Alerts
                    </span>
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-2/6 justify-center relative flex flex-wrap border rounded-md bg-white-200 border-box shadow-sm p-1 m-10 text-base">
            <label className="flex-1 text-center transition-transform transform hover:scale-105">
              <input
                type="radio"
                name="radio"
                className="hidden"
                defaultChecked
              />
             <span className="w-full gap-2 h-full flex items-center px-5 py-2 text-1xl font-bold text-black rounded-[14px] bg-gradient-to-t hover:text-white hover:bg-[#a62ce2]">
                    <img 
                      width="20"
                      height="20"
                      src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/external-backpack-camping-kiranshastry-lineal-color-kiranshastry.png"
                      alt="external-backpack-camping-kiranshastry-lineal-color-kiranshastry"
                    />
                    Real
                    </span>
            </label>
          </div>
        </div>
      </Slider>
    </>
  );
}
