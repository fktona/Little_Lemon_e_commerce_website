import { useEffect, useState , useContext} from "react";
import { ItemOrderContext } from "../assets/Context/itemContext"
import items from "../Item.json"
import Checkout from "./Checkout"

function Nav({ name }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };
  
  const [searchQuery, setSearchQuery] = useState(""); // State variable to store the search searchQuery
  const filteredItems = items.filter((menu) =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  

  return (
    <>
    <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search menu..."
      />
      <button onClick={toggleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
      <div>
        {isLoggedIn ? (
          <div>
            <p>CULINARY OASIS</p>
            
             <Checkout />
            
            <p> welcome {name}</p>
          </div>
        ) : ""}
      </div>
    </>
  );
}

export default Nav;