import { useEffect, useState , useContext} from "react";
import { ItemOrderContext } from "../assets/Context/itemContext"

function Nav({ name }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const toggleLogin = () => {
    setIsLoggedIn((prev) => prev);
  };

  const { allOrder } = useContext(ItemOrderContext);

  return (
    <>
      <button onClick={toggleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
      <div>
        {isLoggedIn ? (
          <div>
            <p>LITTLE LEMON</p>
            
              {allOrder.map((ordercart) => (
              <ul key={ordercart.id}> 
                <li> {ordercart.Qty}</li>
                <li> {ordercart.menu}</li>
               </ul>
               ))}
            
            <p> welcome {name}</p>
          </div>
        ) : ""}
      </div>
    </>
  );
}

export default Nav;