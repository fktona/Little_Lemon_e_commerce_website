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
    <div>
      {allOrder.length > 0 ? (
        <>
          {allOrder.map((cart) => {
            const cartQtyValue = parseInt(cart.Qty);

            return (
              <ul key={cart.id}>
                <li>{cartQtyValue}</li>
                <Button orderNumber={cart.Qty} setOrderNumber={setOrderNumber} />
                <li>{cart.totalPrice}</li>
                <li>{cart.menu}</li>
              </ul>
            );
          })}
          
          <button>Total Price: {total.totalAmount.toFixed(2)} 
          <br />
          <small> Total Quantities: {total.totalQty}</small></button>
        </>
      ) : (
        <p>No items in the cart.</p>
      )}
      <li>{allOrder.length}</li>
    </div>
  );
}

export default Checkout;
