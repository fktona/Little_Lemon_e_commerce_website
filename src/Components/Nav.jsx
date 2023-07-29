import { useEffect, useState , useContext} from "react";
import { ItemOrderContext } from "../assets/Context/itemContext"
import items from "../Item.json"



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
    <div className="text-black font-bold text-md  md:flex space-x-4 flex items-center justify-between   bg-green-500 p-3 ">
    {/* <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search menu..."
      />*/}
     
        {isLoggedIn ? (
        
          <>
            <p className="grow text-center ">CULINARY OASIS</p>
           
          </>
        ) : ""}
 <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow text-silver"
   onClick={toggleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
    
    </div>
  );
}

export default Nav;