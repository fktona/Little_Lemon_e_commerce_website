import React, { useContext , useMemo, useState, useEffect } from 'react';
import { UserContext } from '../assets/Context/userContext';
import { FiShoppingCart } from 'react-icons/fi';

function Checkout() {
  const [clearCart, setClearCart] = useState(false);
  const { allOrder, setAllOrder } = useContext(UserContext);
const [orderToBeRemoved, setOrderToBeRemoved] = useState([]);
const [stopRemoval, setStopRemoval] = useState({})

const [removal, setRemoval] = useState()
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
   
   
   
  };



const revertQty = (menu) => {
  // Remove the order associated with the clicked button from orderToBeRemoved
  setOrderToBeRemoved((prevOrders) =>
    prevOrders.filter((existingOrder) => existingOrder.menu !== menu.menu)
  );

  setAllOrder((prevAllOrder) =>
    prevAllOrder.map((order) =>
      order.menu === menu.menu
        ? {
            ...order,
            Qty: 1,
          }
        : order
    )
  );
};

useEffect(() => {
  const orderWithZeroQty = allOrder.filter((order) => order.Qty < 1);

  if (orderWithZeroQty.length > 0) {
    const newOrdersWithTime = orderWithZeroQty
      .filter((zeroOrder) => !orderToBeRemoved.some(existingOrder => existingOrder.menu === zeroOrder.menu)) 
      .map((zeroOrder) => ({
        ...zeroOrder,
        timeLeft: 6000,
      }));

    setOrderToBeRemoved((prevOrders) => [...prevOrders, ...newOrdersWithTime]);
  }
}, [allOrder]);
useEffect(() => {
  return () => {
    setOrderToBeRemoved([]);
  };
}, []);

useEffect(() => {
  if (orderToBeRemoved.length > 0) {
    const removeInterval = setInterval(() => {
      setOrderToBeRemoved((prevOrders) => {
        const newOrders = [...prevOrders];

        if (newOrders.length > 0) {
          newOrders.forEach((order) => {
            if (order.timeLeft > 0) {
              order.timeLeft -= 1000; // Decrease timeLeft by 1 second
              
            } else {
              const updatedAllOrder = allOrder.filter(
                (o) => o.menu !== order.menu
              );
              setAllOrder(updatedAllOrder);
              newOrders.shift()
            }
          });
        }
         
        if (newOrders.length === 0) {
          clearInterval(removeInterval);
        }

        return newOrders;
      });
    }, 1000); // Update every 1 second

    setRemoval(removeInterval);

    return () => {
      clearInterval(removeInterval);
    };
  }
}, [allOrder, orderToBeRemoved]);

// const orderElements = allOrder.map((order, index) => {
//     const orderToRemove = orderToBeRemoved.find((o) => o.menu === order.menu);

//     const shouldDisplayMenu = orderToRemove && lastAddedIndex === index;

//     return (
//       <div className="" key={order.menu}>
//         {orderToRemove && shouldDisplayMenu && (
//           <div className={`shadow-outline transition-all duration-1000 ${order.timeLeft <= 5000 ? 'hidden' : 'block'}`}>
//             <button onClick={() => revertQty(order)}>Revert Qty</button>
//             <span>{shouldDisplayMenu ? orderToRemove.menu : ''}</span>
//             <div className="progress-bar">
//               <div className="progress-bar-fill" style={{ width: `${(orderToRemove.timeLeft / 6000) * 100}%` }}></div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   });









  
  
  
  
  
 

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
  
  
  const progressBarWidths = allOrder.map((cart) => {
  const orderToRemove = orderToBeRemoved.find((o) => o.menu === cart.menu);
  return (orderToRemove?.timeLeft / 6000) * 100 
});


const sortByQuantityAndOrder = (a, b) => {
  if (a.Qty !== b.Qty) {
    return b.Qty - a.Qty; // Sort by quantity in descending order
  } else {
    // If quantities are the same, maintain the order they were added
    return allOrder.indexOf(a) - allOrder.indexOf(b);
  }
};

// Sort the allOrder array based on quantity and order
const sortedOrders = [...allOrder].sort(sortByQuantityAndOrder);


  return (
    <div>
      {allOrder.length >0 ? (
        <>

          <div className="flex relative flex-col gap-4">
              
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
                  className="flex justify-between items-center p-2 rounded-lg  shadow-md"
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


      <div className="" key={cart.menu}>
          <div className={`shadow-outline flex items-center justify-between py-1 px-2 transition-all duration-1000 `}>
          <div className="flex gap-2 text-sm justify-between items-center ">
              <img src={cart.image} alt={cart.menu} className="w-8 h-8 ml-2" />
                 
            <span>{cart.menu}</span>    
            </div>
             <button onClick={() => revertQty(cart)}
            className="h-full text-crisp-white relative bg-primary p-2"text>Revert Qty</button>
                  </div>
            <div className="progress-bar">
<div className="progress-bar-fill  bg-primary" style={{ width: `${progressBarWidths[index]}%` }}></div>
            </div>
          </div>

     
     

// <div key={cart.menu}>
//       {orderElements}
//     </div>
              )







          )  
          }
          </div> 
           <p className="bg-black w-8 text-crisp-white"> {orderToBeRemoved.length} </p>
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
