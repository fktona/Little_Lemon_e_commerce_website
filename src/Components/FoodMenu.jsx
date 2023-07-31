import React, { useState } from 'react';
import FoodItem from './FoodItem';
import { FiShoppingCart } from 'react-icons/fi';
import Checkout from './Checkout';

function FoodMenu({ items }) {
  const [section, setSection] = useState(1);

  const sectionItems = {
    1: items.filter((menu) => menu.id >= 1 && menu.id <= 5),
    2: items.filter((menu) => menu.id >= 6 && menu.id <= 10),
    3: items.filter((menu) => menu.id >= 11 && menu.id <= 15),
  };

  const toggleSection = (sectionNumber) => {
    setSection(sectionNumber);
  };

  return (
    <div className="container mx-auto px-2 gap-8">
      <h4 className="text-center text-accent text-xl">CATEGORIES</h4>
      <div className="grid grid-cols-2 p-2 gap-6">
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
      <div>
        <Checkout />
        <FiShoppingCart />
      </div>
    </div>
  );
}

export default FoodMenu;
