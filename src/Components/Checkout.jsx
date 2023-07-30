import React, { useEffect, useState, useContext } from 'react';
import { ItemOrderContext } from '../assets/Context/itemContext';
function Checkout() {
  const [orderNumber, setOrderNumber] = useState(0);
  const { allOrder, setAllOrder, Button } = useContext(ItemOrderContext);

  // Calculate the total price and total quantity using the reduce function
  const total = allOrder.reduce(
    (accumulator, cart) => ({
      totalAmount: accumulator.totalAmount + cart.totalPrice,
      totalQty: accumulator.totalQty + parseInt(cart.Qty),
    }),
    { totalAmount: 0, totalQty: 0 }
  );

  return (
    <div className="container absolute mx-auto px-4">
      <small>{allOrder.length}</small>
      {allOrder.length > 0 ? (
        <>
          <div className="flex flex-col ">
            {allOrder.map((cart) => {
              const cartQtyValue = parseInt(cart.Qty);

              return (
                <div key={cart.id} className="flex justify-between bg-crisp-white p-4 rounded-lg shadow-md">
                  <img
                    src={cart.image}
                    alt={cart.menu}
                    className="w-12 h-12 ml-6"
                  />
                  <ul className="text-center">
                    <li className="text-lg font-semibold">{cart.menu}</li>
                    <li className="text-lg font-semibold">${cart.totalPrice.toFixed(2)}</li>
                  </ul>
                  <Button orderNumber={cart.Qty} setOrderNumber={setOrderNumber} />
                </div>
              );
            })}
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
