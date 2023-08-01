import React, { useContext } from 'react';
import { ItemOrderContext } from '../assets/Context/itemContext';

function Checkout() {
  const { allOrder, setAllOrder  } = useContext(ItemOrderContext);
  
  const increaseQty = (menu) => {
    setAllOrder((prevAllOrder) =>
      prevAllOrder.map((order) =>
        order.menu === menu
          ? { ...order, Qty: order.Qty + 1,
          totalPrice: parseFloat(((order.Qty + 1) * (order.totalPrice/order.Qty)).toFixed(2)) }
          : order
      )
    );
  };

  const decreaseQty = (menu) => {
    setAllOrder((prevAllOrder) =>
      prevAllOrder.map((order) =>
        order.menu === menu && order.Qty > 0
          ? { ...order, Qty: order.Qty - 1, totalPrice: parseFloat(((order.Qty - 1) * (order.totalPrice/ order.Qty)).toFixed(2)) }
          : order
      )
    );
  };

  // Calculate the total price and total quantity using the reduce function
  const total = allOrder.reduce(
    (accumulator, cart) => ({
      totalAmount: accumulator.totalAmount + cart.totalPrice,
      totalQty: accumulator.totalQty + cart.Qty,
    }),
    { totalAmount: 0, totalQty: 0 }
  );

  return (
    <div className="container absolute mx-auto px-4">
      <small>{total.totalQty}</small>
      {total.totalQty > 0 ? (
        <>
          <div className="flex flex-col">
            {allOrder.map((cart) => (
              <div key={cart.menu} className="flex justify-between items-center bg-crisp-white p-2 rounded-lg shadow-md">
                <img
                  src={cart.image}
                  alt={cart.menu}
                  className="w-8 h-8 ml-2"
                />
                <ul className="text-center flex justify-between flex-1 " >
                  <li className="text-md ml-3 ">{cart.menu}</li>
                  <li className="text-md  mr-3 ">${cart.totalPrice.toFixed(2)}</li>
                </ul>
                <div className="flex justify-between items-center gap-2">
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
            ))}
          </div>
          <button className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Total Price: {total.totalAmount.toFixed(2)} <br />
            <small>Total Quantities: {total.totalQty}</small>
          </button>
        </>
      ) : (
        <p className="text-center">No items in the cart.</p>
      )}
    </div>
  );
}

export default Checkout;
