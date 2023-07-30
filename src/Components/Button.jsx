

function Button({ orderNumber, setOrderNumber, menu , setshowCart  }) {
  const orderIncrement = () => {
    setOrderNumber((prevNumber) => prevNumber + 1)
  };

  const orderDecrement = () => {
    setOrderNumber((prevNumber) => (prevNumber > 0? prevNumber - 1 : 0)) 
 orderNumber === 1 ? setshowCart(false):null
  
  };

  return (
    <div className="flex items-center">
      <button
        className="px-2 py-1 bg-secondary text-white rounded-md mr-1"
        onClick={orderIncrement}
      >
        +
      </button>
      <input
        className="w-8 text-center border border-gray-400 rounded-md"
        type="text"
        value={orderNumber}
        readOnly
      />
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-md ml-1"
        onClick={orderDecrement}
      >
        -
      </button>
    </div>
  );
}

export default Button