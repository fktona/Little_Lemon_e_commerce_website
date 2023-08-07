import  { useContext, useState } from 'react';
import { UserContext } from '../assets/Context/userContext';
import { FiShoppingCart } from 'react-icons/fi';

function Checkout() {
  const [expand , setExpand] = useState(false)
  const { allOrder, setAllOrder } = useContext(UserContext);
  
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
  const Expand = () => {
    setExpand((prev) => !prev);
  }

  return (
    <div >
      
     {/* <div onClick={Expand} className=" w-[80vw] md:w-full p-2 shadow-outline md:shadow-none   mx-auto flex items-center justify-center  rounded-full bottom"> 
     <FiShoppingCart className=" bg-primary  aspect-square
      rounded-full
       p-3 text-center text-2xl text-crisp-white shadow-2xl"/>
      <span>{total.totalQty}</span></div>
       */}
      { total.totalQty > 0 ? (
        <>
          <div className="flex flex-col gap-2">
            {allOrder.map((cart) => (
              <div key={cart.id} className="flex justify-between items-center bg-crisp-white p-2 rounded-lg  shadow-md">
                <img
                  src={cart.image}
                  alt={cart.menu}
                  className="w-8 h-8 ml-2"
                />
                <div className="text-center flex justify-between flex-1 " >
                  <p className="text-sm md:text-md ml-3 ">{cart.menu}</p>
                  <p className="text-sm md:text-md mr-3 ">${cart.totalPrice.toFixed(2)}</p>
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
            ))}
          </div>
          <div className="flex flex-col justify-center mx-auto mt-4 px-4 py-2  text-xl  font-bold gap-2">
            <div className="flex  justify-around items-center"> <span>Total Price:</span> 
            <span> ${total.totalAmount.toFixed(2)}
            </span></div>
            <div className="flex justify-around m-4 items-center"><span>Total Quantities: </span> <span>{total.totalQty}</span></div>
            <button className="bg-secondary right-0 mx-auto p-2 text-crisp-white">Checkout: {total.totalAmount.toFixed(2)}</button>
          </div>
        </>
      ) : ( ""
       /* <p className="text-center">No items in the cart.</p>*/
      )}
    </div>
  );
} 

export default Checkout;
