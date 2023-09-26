import React, { useState, useEffect } from "react";
import FoodMenu from "./FoodMenu";
import { ItemOrderContext } from "../assets/Context/itemContext";
import items from "../Item.json";
// Replace this with the actual path to your menu items

function AllMenu() {
  const [allOrder, setAllOrder] = useState([]);

  // Save the cart items to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(allOrder));
  }, [allOrder]);

  // Retrieve the cart items from local storage on initial mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && Array.isArray(storedCart)) {
      setAllOrder(storedCart);
    }
  }, []);

  return (
    <div>
      <ItemOrderContext.Provider value={{ allOrder, setAllOrder }}>
        <FoodMenu items={items} />
      </ItemOrderContext.Provider>
    </div>
  );
}

export default AllMenu;
