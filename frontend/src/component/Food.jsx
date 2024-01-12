import React from "react";
import CartIcon from "../asset/icon/cart.png"
import Topbar from "../component/Topbar"
export default function Food() {

    // Define an array of food items
  const foodItems = [
    {
      name: 'Crispy Sandwich',
      imageSrc: 'https://media.istockphoto.com/id/157431311/photo/turkey-sandwich.jpg?s=612x612&w=0&k=20&c=uB6byErFAnWxFkkAqMiGNRJGE8r3nqsSDdqrfBE8HOA=',
      stars: 4.5,
      price: 12.45,
    },
    {
      name: 'Pan Cakes',
      imageSrc: 'https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-superJumbo.jpg',
      stars: 4.5,
      price: 12.45,
    },
    {
      name: 'Paper-Dosa',
      imageSrc: 'https://t4.ftcdn.net/jpg/04/05/17/95/360_F_405179537_tTBUdIy8hXDBWP5lpLLGuzM5ZXx5nruX.jpg',
      stars: 4.5,
      price: 12.45,
    },
    {
      name: 'Udid-Vada',
      imageSrc: 'https://www.foodieist.com/wp-content/uploads/2021/02/dfsfs.jpg',
      stars: 4.5,
      price: 12.45,
    },
    {
        name: "Special Chaat",
        imageSrc: "https://t4.ftcdn.net/jpg/04/35/23/83/360_F_435238390_8xLSPJbpRppo2ZTVeR9gaJs17svK7OE6.jpg",
        stars: 6.9,
        price: 5
    }
  ];

  return (
    <div>
      <Topbar/>

    <div>
      {/* <!-- dishes sections --> */}
      <section className="p-10 dishes" id="dishes">
       
        <div className="text-center text-4xl pb-2 relative text-black font-bold  z-20">
          Popular Items
        </div>
          <div className="w-1/4 flex mx-auto relative -top-6 h-4 bg-yellow-200 z-0"></div>
        <div class="flex">
    <div class="flex items-center h-5 m-4">
        <input id="helper-radio" aria-describedby="helper-radio-text" type="checkbox" value="" class="w-4 h-4 mx-4 outline-none text-green-600 border-0 bg-green-100 "/>
    
        <label for="helper-radio" class="font-medium text-gray-900 dark:text-gray-800 text-xl">Vegiterian</label>
    </div>
</div>
  
        <div className="grid grid-cols-3 gap-8 ">
          {foodItems.map((foodItem, index) => (
            <div className="box-shri-55 group m-4 hover:scale-105 transition ease-in-out" key={index}>
              <div className="bg-white  p-8 shadow-md rounded-lg">
                <img
                  src={foodItem.imageSrc}
                  alt={foodItem.name}
                  className="h-68 w-68 mb-4"
                />
                <h3 className="text-black text-2xl">{foodItem.name}</h3>
                <img src={CartIcon} className="w-12 animate-spin h-12 absolute top-8 invisible cursor-pointer hover:scale-125 transition ease-in-out right-8 bg-gray-100 hover:bg-green-50 rounded-full p-2 group-hover:visible " alt={foodItem.name}></img>
                <div className="stars p-4">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <i
                      key={starIndex}
                      className={`fas fa-star${
                        starIndex + 1 <= foodItem.stars ? '' : '-half-alt '
                      }`}
                    ></i>
                  ))}
                </div>
                <div className="flex justify-between">
                <div className="text-green text-2xl mr-4">
                  ${foodItem.price}
                </div>
               <div> <button className="border border-green-500 visible  relative right-0 px-8 py-2 text-2xl font-semibold text-green-400 rounded transition ease-in-out hover:bg-green-500 hover:text-white">
                  Buy</button></div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
  
  );
}