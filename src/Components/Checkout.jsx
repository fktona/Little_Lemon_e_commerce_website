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
    <div className="ulit">
    <small>{allOrder.length}</small>
      {allOrder.length > 0 ? (
        <>
          {allOrder.map((cart) => {
            const cartQtyValue = parseInt(cart.Qty);

            return (
            <div className="cul">
            <img src={cart.image} />
              <ul key={cart.id}>
                <li>{cart.menu}</li>
                 <li>{cart.totalPrice}</li>
              </ul>
              <Button orderNumber={cart.Qty} setOrderNumber={setOrderNumber} />
              </div>
        
            );
          })}
          
          <button>Total Price: {total.totalAmount.toFixed(2)} 
          <br />
          <small> Total Quantities: {total.totalQty}</small></button>
        </>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
}

export default Checkout;
