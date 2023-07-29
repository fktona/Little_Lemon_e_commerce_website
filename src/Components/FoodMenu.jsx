import  { useState , useEffect , useContext} from 'react';
import { ItemOrderContext } from "../assets/Context/itemContext"
import FoodItem from "./FoodItem"

import Checkout from "./Checkout"

function FoodMenu({ items }) {
  // Create state variables to handle each section
  const [sectionOne, setSectionOne] = useState(true);
  const [sectionTwo, setSectionTwo] = useState(false);
  const [sectionThree, setSectionThree] = useState(false);

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

  return (
    <div className="container mx-auto px-8">
      

      {/* Render each section based on the corresponding state */}
      {sectionOne && (
        <div className="grid grid-cols-1 gap-8">
          {sectionOneItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}

      {sectionTwo && (
        <div className="grid grid-cols-1 gap-4">
          {sectionTwoItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}

      {sectionThree && (
        <div className="grid grid-cols-1 gap-4">
          {sectionThreeItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}
      {/* Buttons to toggle each section */}
      <div className="flex justify-center space-x-4 mb-4 mt-4 p-4 gap-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            sectionOne ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => toggleSection(1)}
        >
          1
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            sectionTwo ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
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
      </div>
    </div>
  );
}

export default FoodMenu;
