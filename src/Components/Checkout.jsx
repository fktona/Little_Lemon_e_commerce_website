import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../assets/Context/userContext';
import { FiShoppingCart } from 'react-icons/fi';

function Checkout() {
  const [clearCart, setClearCart] = useState(false);
  const { allOrder, setAllOrder } = useContext(UserContext);
  const [timeoutId, setTimeoutId] = useState(null);
    
  const [removeTime, setRemoveTime] = useState(3000);
  const [cd, setcd] = useState(3);

  const increaseQty = (menu) => {
    setAllOrder((prevAllOrder) =>
      prevAllOrder.map((order) =>
        order.menu === menu 
          ? {
              ...order,
              Qty: order.Qty + 1,
              totalPrice: parseFloat(
                ((order.Qty + 1) * (order.totalPrice / order.Qty)).toFixed(2)
              ),
            }
          : order
      )
    );
  };

    
  const decreaseQty = (menu) => {
    
    
    setAllOrder((prevAllOrders) =>
      prevAllOrders.map((order) =>
        order.menu === menu
          ? {
              ...order,
              Qty: order.Qty - 1,
              totalPrice:
                order.Qty > 1
                  ? parseFloat(
                      ((order.Qty - 1) * (order.totalPrice / order.Qty)).toFixed(2)
                   )
                  : (order.totalPrice)
            }
          : order
      )
      
    );
   
   
   const newtimeoutId = setTimeout(() => {
      setAllOrder((prevAllOrders) =>
        prevAllOrders.filter((order) => order.Qty > 0)
      );
    },3000)
    setTimeoutId(newtimeoutId)
    clearTimeout(timeoutId);
  };

  const revertQty = (menu) => {
    clearTimeout(timeoutId);
    setRemoveTime(3000)
    
    
    setAllOrder((prevAllOrder) =>
      prevAllOrder.map((order) =>
        order.menu === menu.menu 
          ? {
              ...order,
              Qty:  1,
              
            }
          : order
      )
    );
  };
  // useEffect(() => {
  //   // ... (total calculation)
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [allOrder]);
  const total = allOrder.reduce(
    (accumulator, cart) => ({
      totalAmount: accumulator.totalAmount + cart.totalPrice,
      totalQty: accumulator.totalQty + cart.Qty,
    }),
    { totalAmount: 0, totalQty: 0 }
  );

  const clear = () => {
    setClearCart((prev) => !prev);
  };
const rclear = () => {
    setClearCart((prev) => !prev);
    setAllOrder([])
  };
  useEffect(() => {
    total;
  }, [allOrder]);

  return (
    <div>
      {allOrder.length >0 ? (
        <>
          <div className="flex relative flex-col gap-2">
            <div>
              <button onClick={clear} className="p-4 bg-black text-crisp-white">
                Delete All items
              </button>
              {clearCart ? (
                <div className="absolute inset-x-0 mx-auto shadow-lg w-[80%] z-[2] h-[29vh] flex flex-col items-center justify-evenly font- bold text-lg bg-crisp-white">
                  <button
                    onClick={clear}
                    className="p-1 text-md bg-accent absolute top-2 right-3 text-crisp-white"
                  >
                    Cancel
                  </button>
                  <p className="text-center">All items will be deleted</p>
                  <button
                    onClick={rclear
                    }
                    className="p-2 bg-red-700 text-crisp-white"
                  >
                    Continue
                  </button>
                </div>
              ) : null}
            </div>
            {allOrder.map((cart, index) =>
              cart.Qty >0 ? (
                <div
                  key={index}
                  className="flex justify-between items-center bg-crisp-white p-2 rounded-lg  shadow-md"
                >
                  <img src={cart.image} alt={cart.menu} className="w-8 h-8 ml-2" />
                  <div className="text-center flex justify-between flex-1">
                    <p className="text-sm md:text-md ml-3">{cart.menu}</p>
                    <p className="text-sm md:text-md mr-3">${cart.totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between md:justify-evenly items-center gap-2">
                    <button
                      className=" p-1 bg-secondary text-crisp-white w-7 h-7 flex items-center text-center aspect-square justify-center ext-lg font-semibold rounded-sm"
                      onClick={() => decreaseQty(cart.menu)}
                    >
                      -
                    </button>
                    <span>{cart.Qty}</span>
                    <button
                      className=" p-1 bg-secondary text-crisp-white w-7 h-7 flex items-center text-center aspect-square justify-center ext-lg font-semibold rounded-sm"
                      onClick={() => increaseQty(cart.menu)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
              <>
                <button onClick={() => revertQty(cart)}
                className="bg-red-600 flex w-fit ">revert items {cd}</button>
                <input className="bg-blue-500 h-[15px] w-[15px]  " type="progress"  min ="0" max={cd} />
             </> )
            )}
          </div>
          <div className="flex flex-col justify-center mx-auto mt-4 px-4 py-2  text-xl  font-bold gap-2">
            <div className="flex  justify-around items-center">
              <span>Total Price:</span>
              <span>${total.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-around m-4 items-center">
              <span>Total Quantities: </span>
              <span>{total.totalQty}</span>
            </div>
            <button className="bg-secondary right-0 mx-auto p-2 text-crisp-white">
              Checkout: {total.totalAmount.toFixed(2)}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center h-[50vh] justify-center flex items-center">
          No items in the cart.
        </div>
      )}
    </div>
  );
}

export default Checkout;
