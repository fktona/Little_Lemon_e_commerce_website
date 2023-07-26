import React from 'react';

function Checkout({ cartItems }) {
  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.map((item) => (
        <div key={item.menu.id}>
          <p>Menu Name: {item.menu.name}</p>
          <p>Order Number: {item.orderNumber}</p>
          <p>Price: ${item.menu.price * item.orderNumber}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Checkout;
