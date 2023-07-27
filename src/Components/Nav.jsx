import { useEffect, useState , useContext} from "react";
import { ItemOrderContext } from "../assets/Context/itemContext"
import Checkout from "./Checkout"

function Nav({ name }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const toggleLogin = () => {
    setIsLoggedIn((prev) => prev);
  };

  

  return (
    <>
      <button onClick={toggleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
      <div>
        {isLoggedIn ? (
          <div>
            <p>LITTLE LEMON</p>
            
             <Checkout />
            
            <p> welcome {name}</p>
          </div>
        ) : ""}
      </div>
    </>
  );
}

export default Nav;