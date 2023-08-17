import  { useState ,useContext , useMemo} from 'react';
import FoodItem from './FoodItem';
import Checkout from './Checkout';
import { BsFilterCircle } from 'react-icons/bs';
import { UserContext } from '../assets/Context/userContext';
import items from "../Item.json"
import HeadingText from "./HeadingText";
import { Navigation, Pagination, Scrollbar, EffectCoverflow, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function FoodMenu() {
  const [section, setSection] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
 // const { items  } = useContext(UserContext)
const sectionItems = {
    1: items.filter((menu) => menu.id >= 1 && menu.id <= 12),
    2: items.filter((menu) => menu.id >= 13 && menu.id <= 24),
      3: items.filter((menu) => menu.id >= 24 && menu.id <= 29),
    };
  ;
const filteredItems = items.filter((menu) => 
   menu.name.toLowerCase().includes(searchTerm.toLowerCase())
   
  );

  const toggleSection = (sectionNumber ) => {
    setSection(sectionNumber);
    
  };
  
  const uniqueCategories = [...new Set(items.map((menu) => menu.category))];
     
const memoizedFoodItems = useMemo(
  () =>
    sectionItems[section].map((menu) => (
      <FoodItem
        key={menu.id}
        menu={menu}
        isBestMenu={menu.id === 2}
      />
    )),
  [section, sectionItems]
);


// Function to generate a random number between min (inclusive) and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumbers = Array.from({ length: 10 }).reduce((acc, _, index) => {
  const randomNumber = getRandomNumber(1, 29);
  return [...acc, randomNumber];
}, []);






  return (
    <div className=" relative z-[-1] mx-auto p-2 md:p-[5rem] pb-[4rem] gap-8 ">
      {/* <div className="search mt-6 p-2 gap-2 flex items-center justify-between">
        <div className=" flex  mt-[5rem]">
         <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="shadow-md p-1 outline-none border-2 border-primary text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        /><button className='bg-primary p-2 shadow-lg text-crisp-white '>search</button>
        </div>
        <button className='border-2 text-primary gap-2 border-primary p-2 text-sm mt-[5rem] flex items-center'>Filter 
        <span><BsFilterCircle /></span>
        </button>
      </div>
      {searchTerm === ""? "" :
    <div className=" ">
     <div className="flex flex-col gap-2 mt-[2rem]">
              {filteredItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-crisp-white p-3  border-primary border-b-[0.5px] ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 ml-2"
                />
                <div className="text-center flex justify-between flex-1 " >
                  <p className="text-sm md:text-md ml-3 ">{item.name}</p>
                 
                </div>
               
   
              </div>
            ))}
          </div>
 
</div>} */}
    <div>
    <h4 className="text-center text-accent mt-[6rem] text-xl "> CATEGORIES </h4>
    <ul className="flex justify-around gap-4 mt-4 mb-4 items-center h-20"> 
      {uniqueCategories.map((category) => (
<li className="transition duration-1000 linear transform 
hover:scale-105 shadow-outline hover:shadow-inner w-full font-bold 
border-l-2 border-primary h-full flex justify-center items-center  text-center text-secondary" key={category}>
  {category}
</li>

      ))}
    </ul>
    </div>
    
<div className="">
  <h4 className="font-bold text-secondary">JUST FOR YOU</h4>
  <Swiper
  modules={[Navigation, EffectCoverflow , Pagination, Scrollbar, A11y]}
  effect = { 'coverflow'}

grabCursor = {true}

centeredSlides = {true}

// slides PerView= {'auto'}

coverflowEffect = {{
stretch:0,
rotate: 50,
depth:50,slideShadows:true,
modifier:1,
}}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      //scrollbar={{ draggable: true }}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      //onSlideChange={() => console.log('slide change')}
  className="shadow-inner relative p-1">
    {items.map((menu) =>
      randomNumbers.includes(menu.id) ? (
        <SwiperSlide  key={menu.id} className="min-w-[7rem] max-w-[7rem] md:min-w-[10rem]  relative">
          <p className="w-full flex items-end 
          h-full text-white text-sm text-center font-md absolute top-0 left-0 bg-black bg-opacity-50 justify-center p-2">
            {menu.name}
          </p>
                    <p className="w-full flex items-start h-full text-white text-sm text-center font-md absolute top-0 left-0  justify-end p-2">
            {menu.price}
          </p>
          <img
            className="w-full aspect-square"
            src={menu.image}
            alt={menu.name}
          />
        </SwiperSlide>
      ) : (
        ""
      )
    )}
  </Swiper>
</div>

  
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-3 gap-6 ">
     {/*   {sectionItems[section].map((menu) => (
          <FoodItem
            key={menu.id}
            menu={menu}
            isBestMenu={menu.id === 2}
            
          />
        ))} */}
        {memoizedFoodItems}
      </div>

      <div className="flex justify-center space-x-4 mb-4 mt-4 p-4 gap-6">
        <button
          className={`px-4 py-2 shadow-md rounded-md ${
            section === 1 ? 'border-b-2 border-primary' : ''
          }`}
          onClick={() => toggleSection(1)}
        >
          1
        </button>
        <button
          className={`px-4 py-2 shadow-md rounded-md ${
            section === 2 ? 'border-b-2 border-primary' : ''
          }`}
          onClick={() => toggleSection(2)}
        >
          2
        </button>
        <button 
          className={`px-4 py-2 shadow-md rounded-md ${
            section === 3 ? ' border-b-2 border-primary' : ''
          }`}
          onClick={() => toggleSection(3)}
        >
          3
        </button>
      </div>
      {/* <div className="sm:hidden mb:block">
      <Checkout />
       
      </div> */}
    </div>
  );
}

export default FoodMenu;
