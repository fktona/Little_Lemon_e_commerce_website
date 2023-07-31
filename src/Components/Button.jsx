import React from 'react';

function Button({ orderNumber, setOrderNumber }) {
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
        className="text-red-600 p-1 rounded-full hover:bg-red-600 hover:text-white"
        onClick={decreaseQty}
      >
        -
      </button>
      <span>{orderNumber}</span>
      <button
        className="text-green-600 p-1 rounded-full hover:bg-green-600 hover:text-white"
        onClick={increaseQty}
      >
        +
      </button>
    </div>
  );
}

export default Button;
