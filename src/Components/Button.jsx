import { useState, useEffect, useContext, useMemo } from "react";

const Button = ({ orderNumber, setOrderNumber, allOrder }) => {
  const decreaseQty = () => {
    if (orderNumber > 0) {
      setOrderNumber((prevOrderNumber) => prevOrderNumber - 1);
    }
  };

  const increaseQty = () => {
    setOrderNumber((prevOrderNumber) => prevOrderNumber + 1);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className="text-accen w-6 text-white p-1 bg-secondary aspect-square hover:bg-accent hover:text-white"
        onClick={decreaseQty}
      >
        _
      </button>
      <span>{orderNumber}</span>
      <button
        className="w-6 text-white p-1 bg-secondary hover:bg-accent hover:text-white"
        onClick={increaseQty}
      >
        +
      </button>
    </div>
  );
};

export default Button;
