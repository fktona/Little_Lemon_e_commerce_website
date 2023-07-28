import  { useState , useEffect , useContext} from 'react';
import { ItemOrderContext } from "../assets/Context/itemContext"
import FoodItem from "./FoodItem"


function FoodMenu({ items }) {
  // Create state variables to handle each section
  const [sectionOne, setSectionOne] = useState(true);
  const [sectionTwo, setSectionTwo] = useState(false);
  const [sectionThree, setSectionThree] = useState(false);

  // Filter the items for each section
  const sectionOneItems = items.filter((menu) => menu.id >= 1 && menu.id <= 10);
  const sectionTwoItems = items.filter((menu) => menu.id >= 11 && menu.id <= 20);
  const sectionThreeItems = items.filter((menu) => menu.id >= 21 && menu.id <= 30);

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
    <div className="all">
      {/* Buttons to toggle each section */}
      <button onClick={() => toggleSection(1)}>1</button>
      <button onClick={() => toggleSection(2)}>2</button>
      <button onClick={() => toggleSection(3)}>3</button>

      {/* Render each section based on the corresponding state */}
      {sectionOne && (
        <div className="section">
          {sectionOneItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} className="FoodItem"/>
          ))}
        </div>
      )}

      {sectionTwo && (
        <div className="section">
          {sectionTwoItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}

      {sectionThree && (
        <div className="section">
          {sectionThreeItems.map((menu) => (
            <FoodItem menu={menu} key={menu.id} isBestMenu={menu.id === 2} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodMenu;
