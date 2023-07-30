import  { useState , useEffect , useContext} from 'react';
import { ItemOrderContext } from "../assets/Context/itemContext"
import FoodItem from "./FoodItem"
import {  FiShoppingCart} from 'react-icons/fi';
import Checkout from "./Checkout"

function FoodMenu({ items }) {
  // Create state variables to handle each section
  const [sectionOne, setSectionOne] = useState(true);
  const [sectionTwo, setSectionTwo] = useState(false);
  const [sectionThree, setSectionThree] = useState(false);
  const [category, setCategory] = useState([]);

  // Filter the items for each section
  const sectionOneItems = items.filter((menu) => menu.id >= 1 && menu.id <= 5);
  const sectionTwoItems = items.filter((menu) => menu.id >= 6 && menu.id <= 10);
  const sectionThreeItems = items.filter((menu) => menu.id >= 11 && menu.id <= 15);

  // Function to toggle each section
  const toggleSection = (section) => {
    setSectionOne(false);
    setSectionTwo(false);
    setSectionThree(false);
    switch (section) {
      case 1:
        setSectionOne(true);
        break;
      case 2:
        setSectionTwo(true);
        break;
      case 3:
        setSectionThree(true);
        break;
      default:
        break;
    }
  };
 
   
     
     const uniqueCategories = [...new Set(items.map((menu) => menu.category))];
     
    
   

  return (
    <div className="container mx-auto px-2  gap-8">
    <div>
    <h4 className="text-center text-accent text-xl "> CATEGORIES </h4>
    <ul class="flex justify-around gap-4 mt-4 mb-4 items-center h-20"> 
      {uniqueCategories.map((category) => (
        <li className=" shadow-lg w-full font-bold border-2 border-primary h-full flex justify-center items-center text-center text-secondary "key={category}>{category}</li>
      ))}
    </ul>
    </div>
      {/* Render each section based on the corresponding state */}
      {sectionOne && (
        <div className="md:grid grid-cols-2 p-2 gap-6">
          {sectionOneItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}

      {sectionTwo && (
        <div className="">
          {sectionTwoItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}

      {sectionThree && (
        <div className="">
          {sectionThreeItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}
      {/* Buttons to toggle each section */}
      <div className="flex justify-center space-x-4 mb-4 mt-4 p-4 gap-3">
        <button
          className={`px-4 py-2 rounded-lg ${
            sectionOne ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => toggleSection(1)}
        >
          1
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            sectionTwo ? 'bg-primary text-white' : 'bg-secondary text-crisp-white'
          }`}
          onClick={() => toggleSection(2)}
        >
          2
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            sectionThree ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => toggleSection(3)}
        >
          3
        </button>
      </div>
      <div>
      <Checkout />
      <FiShoppingCart />
      </div>
    </div>
  );
}

export default FoodMenu;
