import  { useState , useEffect , useContext} from 'react';
import { ItemOrderContext } from "../assets/Context/itemContext"


function Add({ orderNumber, setOrderNumber, menu , setshowCart  }) {
  const orderIncrement = () => {
    setOrderNumber((prevNumber) => prevNumber + 1)
    //,
  //  handleAddToAllOrder()
  };

  const orderDecrement = () => {
    setOrderNumber((prevNumber) => (prevNumber > 0? prevNumber - 1 : 0)) 
 // orderNumber === 1 ? setshowCart(false):null
  
  };

  return (
    <div>
      <button onClick={orderIncrement}>+</button>
      <input type="text" value={orderNumber} readOnly />
      <button onClick={orderDecrement}>-</button>
    </div>
  );
}




function FoodItem({ menu, isBestMenu }) {
  const [orderNumber, setOrderNumber] = useState(0);
  const [showCart, setshowCart] = useState(false);
  const {allOrder , setAllOrder} =useContext(ItemOrderContext)
 

  const show = () => {
    showCart
      ? (setshowCart(false) ,setOrderNumber(0))
      : (setshowCart(true),setOrderNumber(orderNumber +1))
  };
  

  
const [totalOrder , setTotalOrder] = useState({
 })


useEffect(() => {
  if (orderNumber !== 0) {
    setTotalOrder((prevTotalOrder) => ({
      ...prevTotalOrder,
      menu: menu.name,
      Qty: orderNumber,
      totalPrice: `$${orderNumber * menu.price}`,
    }));
  }
}, [orderNumber, menu.name, menu.price]);


 
  useEffect(() => {{
  // Check if the totalOrder.menu is already present in the allOrder array with a different Qty
  const orderExistsWithDifferentQty =  allOrder.some(
    (order) => order.menu === totalOrder.menu && order.Qty !== totalOrder.Qty 
  );

  if (orderExistsWithDifferentQty) {
    // If an order with the same menu and different Qty exists, replace it with the new totalOrder
    const updatedAllOrder = allOrder.map((order) =>
      order.menu === totalOrder.menu ? totalOrder : order
    );
    setAllOrder(updatedAllOrder);
    
  } else {
    // If the menu does not exist in allOrder or has the same Qty, add the totalOrder to the array
    setAllOrder((prevAllOrder) => [...prevAllOrder, totalOrder]);
  } 
};} ,[totalOrder.Qty])

  
  const showAll = () => {
    show()
    //handleAddToAllOrder()
  }
  return (
    <ul>
      <div>{`$${orderNumber * menu.price}`}</div>
      <div>{totalOrder.Qty}</div>
      <li>{menu.name}</li>
      <li>{menu.category}</li>
      <li>{menu.description}</li>
      <li>${menu.price}</li>
      {showCart ? (
        <Add orderNumber={orderNumber} setOrderNumber={setOrderNumber} menu={menu}
        setshowCart={setshowCart}
        //handleAddToAllOrder={handleAddToAllOrder}
        />
      ) : null}
      <br />
      <button onClick={show}>{showCart ? "Remove"  : "Add To Cart"}</button>
      {isBestMenu && <li>Best Menu</li>}
    </ul>
  );
}


function FoodMenu({ items }) {
  
  
  return (
    <div className="items">
      {items.map((menu) => (
        <FoodItem menu={menu}  key = {menu.id} 
        isBestMenu = {menu.id === 2} />
        
      ))}
         
    </div>
  );
}



export default FoodMenu