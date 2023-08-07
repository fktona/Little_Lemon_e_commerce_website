import React, { useState ,useContext } from 'react';
import FoodItem from './FoodItem';
import Checkout from './Checkout';
import { BsFilterCircle } from 'react-icons/bs';
import { UserContext } from '../assets/Context/userContext';
import items from "../Item.json"

function FoodMenu() {
  const [section, setSection] = useState(1);
 // const { items  } = useContext(UserContext)

  const sectionItems = {
    1: items.filter((menu) => menu.id >= 1 && menu.id <= 8),
    2: items.filter((menu) => menu.id >= 9 && menu.id <= 17),
      3: items.filter((menu) => menu.id >= 18 && menu.id <= 26),
    };

  const toggleSection = (sectionNumber) => {
    setSection(sectionNumber);
  };
  
  const uniqueCategories = [...new Set(items.map((menu) => menu.category))];
     

  return (
    <div className=" container mx-auto p-2 gap-8 ">
      <div className="search mt-6 p-2 gap-2 flex items-center justify-between">
        <div className=" flex ">
          <input type="text" name="" id="" placeholder='search' className=' shadow-md p-1 outline-none border-2 border-primary text-sm'/>
        <button className='bg-primary p-2 shadow-lg text-crisp-white '>search</button>
        </div>
        <button className='border-2 text-primary gap-2 border-primary p-2 text-sm flex items-center'>Filter 
        <span><BsFilterCircle /></span>
        </button>
      </div>
    <div>
    <h4 className="text-center text-accent mt-[6rem] text-xl "> CATEGORIES </h4>
    <ul className="flex justify-around gap-4 mt-4 mb-4 items-center h-20"> 
      {uniqueCategories.map((category) => (
<li className="transition duration-1000 linear transform hover:scale-105 shadow-outline hover:shadow-inner w-full font-bold border-l-2 border-primary h-full flex justify-center items-center text-center text-secondary" key={category}>
  {category}
</li>

      ))}
    </ul>
    </div>
  
      <div className="grid md:grid-cols-3 grid-cols-2 p-2 gap-6 ">
        {sectionItems[section].map((menu) => (
          <FoodItem
            key={menu.id}
            menu={menu}
            isBestMenu={menu.id === 2}
            
          />
        ))}
      </div>
      <div className="flex justify-center space-x-4 mb-4 mt-4 p-4 gap-3">
        <button
          className={`px-4 py-2 rounded-lg ${
            section === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => toggleSection(1)}
        >
          1
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            section === 2 ? 'bg-primary text-white' : 'bg-secondary text-crisp-white'
          }`}
          onClick={() => toggleSection(2)}
        >
          2
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            section === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => toggleSection(3)}
        >
          3
        </button>
      </div>
      <div className="md:hidden">
      <Checkout />
       
      </div>
    </div>
  );
}

export default FoodMenu;
