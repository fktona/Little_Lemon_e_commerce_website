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
    <div className="  fixed mx-auto 
 w-full md:bg-primary  top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm   text-black font-bold text-sm  md:flex space-x-4 flex items-center justify-between    p-3 ">
    {/* <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search menu..."
      />*/}
                 <p className=" text-center "><span className="text-secondary space-xl">CULINARY</span> OASIS</p>
        {isLoggedIn ? (
        
          <>

           
          </>
        ) :"" }
        <ul className=" hidden md:flex mx-auto text-crips justify-evenly flex-1">
        <li>Home</li>
        <li>ABOUT</li>
         <li>CONTACT</li>
          <li>RESERVATION</li>
        </ul>
 <button className="bg-secondary hover:bg-accent text-crisp-white font-bold py-2 px-4 text-sm rounded shadow-sm"
   onClick={toggleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
    
    </div>
  );
}

export default Nav;