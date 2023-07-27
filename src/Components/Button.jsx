

function Button({ orderNumber, setOrderNumber, menu , setshowCart  }) {
  const orderIncrement = () => {
    setOrderNumber((prevNumber) => prevNumber + 1)
  };

  const orderDecrement = () => {
    setOrderNumber((prevNumber) => (prevNumber > 0? prevNumber - 1 : 0)) 
 orderNumber === 1 ? setshowCart(false):null
  
  };

  return (
    <div>
      <button onClick={orderIncrement}>+</button>
      <input type="text" value={orderNumber} readOnly />
      <button onClick={orderDecrement}>-</button>
    </div>
  );
}

export default Button