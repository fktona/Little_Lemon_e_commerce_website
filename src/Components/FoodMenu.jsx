import  { useState , useEffect , useContext} from 'react';
import { ItemOrderContext } from "../assets/Context/itemContext"




function FoodItem({ menu, isBestMenu }) {
  const [orderNumber, setOrderNumber] = useState(0);
  const [showCart, setshowCart] = useState(false);
  const {allOrder , setAllOrder , Button} =useContext(ItemOrderContext)
 

  const show = () => {
    showCart
      ? (setshowCart(false) ,setOrderNumber(0))
      : (setshowCart(true),setOrderNumber(orderNumber +1))
  };
  

  
const [totalOrder , setTotalOrder] = useState({
  menu: "",
      Qty: 0,
      totalPrice: 0
 })


useEffect(() => {
  
    setTotalOrder((prevTotalOrder) => ({
      ...prevTotalOrder,
      menu: menu.name,
      Qty: orderNumber,
      totalPrice: parseFloat((orderNumber * menu.price).toFixed(2))
    }));
  
}, [orderNumber]);


useEffect(() => {
  const orderExistsWithDifferentQty = allOrder.some(
    (order) => order.menu === totalOrder.menu && order.Qty !== totalOrder.Qty
  );

 
  totalOrder.Qty === 0
    ? setAllOrder(allOrder.filter((order) => order.menu !== totalOrder.menu))
    : orderExistsWithDifferentQty
    ? setAllOrder(allOrder.map((order) => (order.menu === totalOrder.menu ? totalOrder : order)))
    : setAllOrder((prevAllOrder) => [...prevAllOrder, totalOrder]);
}, [totalOrder.Qty]);


  return (
    <ul key = {menu.id}>
      <li>{menu.name}</li>
      <li>{menu.category}</li>
      <li>{menu.description}</li>
      <li>${menu.price}</li>
      <img src={menu.image} />
      {showCart ? (
        <Button orderNumber={orderNumber} setOrderNumber={setOrderNumber} menu={menu}
        setshowCart={setshowCart}
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