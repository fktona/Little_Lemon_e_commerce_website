import React, { useState, useEffect, useContext } from 'react';
import { ItemOrderContext } from '../assets/Context/itemContext';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from './Button';

function FoodItem({ menu, isBestMenu }) {
  const [showCart, setShowCart] = useState(false);
  const { allOrder, setAllOrder } = useContext(ItemOrderContext);
  const [orderNumber, setOrderNumber] = useState(0);

  const handleShow = () => {
    setShowCart(!showCart);
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
    <div className="grid md:grid-cols-2 place-items-center p-2 rounded-2xl shadow-md mt-6">
      <img
        src={menu.image}
        alt={menu.name}
        className="aspect-square mx-auto mb-1 rounded-full"
        style={{ width: '10rem' }}
      />
      <ul className="text-center">
        <li className="text-lg font-semibold">{menu.name}</li>
        <li className="text-sm text-gray-600">{menu.category}</li>
        <li className="text-lg text-price-900 font-semibold">${menu.price}</li>
        <button
          className="block mx-auto text-sm p-2 mt-2 bg-vibrant-orange text-crisp-white rounded-lg"
          onClick={handleShow}
        >
          {showCart ? <AiOutlineDelete /> : 'Add To Cart'}
        </button>
      </ul>
      {showCart ? (
        <Button orderNumber={orderNumber} setOrderNumber={setOrderNumber} />
      ) : null}
    </div>
  );
}

export default FoodItem;
