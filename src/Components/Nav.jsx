import { useEffect, useState , useContext} from "react";
import { ItemOrderContext } from "../assets/Context/itemContext"
import items from "../Item.json"

import { NavLink ,  Outlet } from 'react-router-dom';
  

function Nav({ name }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  // const [searchQuery, setSearchQuery] = useState("");
  // const filteredItems = items.filter((menu) =>
  //   menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div>
    <div className="fixed text-primary mx-auto w-full bg-crisp-white dark:text-red top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm text-black font-bold text-sm md:flex space-x-4 flex items-center justify-between p-2">
      <p className="text-center">
        <span className="text-secondary space-xl">CULINARY</span> OASIS
      </p>
      {isLoggedIn ? (
        <></>
      ) : (
        ""
      )}
      <nav className="hidden md:flex mx-auto text-crips justify-evenly flex-1">
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact">Contact</NavLink>
        <NavLink to="reservation">RESERVATION</NavLink>
      </nav>
      <button
        className="bg-secondary hover:bg-accent text-crisp-white font-bold py-2 px-4 text-sm rounded shadow-sm"
        onClick={toggleLogin}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
     </div>
     
     <Outlet />
     
    </div>
  );
}

export default Nav;
