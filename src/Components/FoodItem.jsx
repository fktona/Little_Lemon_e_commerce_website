import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../assets/Context/userContext';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from './Button';

function FoodItem({ menu, isBestMenu }) {
  const [showCart, setShowCart] = useState(false);
  const { allOrder, setAllOrder } = useContext(UserContext);
  const [orderNumber, setOrderNumber] = useState(0);
  

  const handleShow = () => {
    setShowCart(!showCart);
    showCart ?
    setOrderNumber(0):setOrderNumber(1)
  };

  const [totalOrder, setTotalOrder] = useState({
    menu: '',
    image: '',
    Qty: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    setTotalOrder((prevTotalOrder) => ({
      ...prevTotalOrder,
      menu: menu.name,
      image: menu.image,
      Qty: orderNumber,
      totalPrice: parseFloat((orderNumber * menu.price).toFixed(2)),
    }));
  }, [orderNumber]);

  useEffect(() => {
    
    const orderExistsWithDifferentQty = allOrder.some(
      (order) => order.menu === totalOrder.menu && order.Qty !== totalOrder.Qty
    );

    totalOrder.Qty === 0
      ? setAllOrder(allOrder.filter((order) => order.menu !== totalOrder.menu))
      : orderExistsWithDifferentQty
      ? setAllOrder(
          allOrder.map((order) =>
            order.menu === totalOrder.menu ? totalOrder : order
          )
        )
      : setAllOrder((prevAllOrder) => [...prevAllOrder, totalOrder]);
      
  }, [totalOrder.Qty]);

  return (
    <div className="grid md:grid-cols-2 place-items-center p-2 rounded-2xl  shadow-md mt-5 w-full h-full">
      <img
        src={menu.image}
        alt={menu.name}
        className="aspect-square w-[80%] mx-auto mb-1 rounded-full"
        
      />
      <ul className="text-center flex flex-col justify-center">

        <li className="text-md font-semibold">{menu.name}</li>
        <li className="text-sm text-accent">{menu.category}</li>
        <li className="text-md text-primary  font-semibold">${menu.price}</li>

      
     <div className="  mr-2 ml-2" >
     {showCart ? 
        <Button orderNumber={orderNumber} setOrderNumber={setOrderNumber}/>:null}
        </div>
      

        <button
          className="block mx-auto text-sm p-1 mt-2 bg- hover:bg-accent text-crisp-white bg-secondary rounded-lg"
          onClick={handleShow}
        >
          {showCart ? <AiOutlineDelete className=" rounded-sm text-lg "  /> : 'Add To Cart'}
        </button>
      </ul>

    </div>
  );
}

export default FoodItem;
