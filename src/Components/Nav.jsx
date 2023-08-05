import { useEffect, useState , useContext} from "react";
import { ItemOrderContext } from "../assets/Context/itemContext"
import items from "../Item.json"
import HeadingText from "./HeadingText"
import Checkout from './Checkout';
import { NavLink ,  Outlet } from 'react-router-dom';
  import CompanyLogo from "../assets/Context/CompanyIdentity";
  import { UserContext } from '../assets/Context/userContext';


function Nav() {
  const { userProfile , isLoggedIn ,setIsLoggedIn  ,setShowLoggedIn} = useContext(UserContext);

  const toggleLogin = () => {
    // setIsLoggedIn((prev) => !prev);
    setShowLoggedIn(true)
    setIsLoggedIn(false)
  };

  // const [searchQuery, setSearchQuery] = useState("");
  // const filteredItems = items.filter((menu) =>
  //   menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div>
        
    <div className="fixed text-primary mx-auto w-full opacity-90  bg-crisp-white  top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg text-black font-bold text-sm md:flex space-x-4 flex items-center justify-between  p-2">
      
     <CompanyLogo />
      
      <nav className="hidden md:flex mx-auto text-crips justify-evenly flex-1">
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact">Contact</NavLink>
        <NavLink to="reservation">RESERVATION</NavLink>
      </nav>
      {isLoggedIn ? (
        <>
        Hello , {userProfile.username.toUpperCase()}
        </>
      ) : ''}

      <button
        className="bg-secondary hover:bg-accent text-crisp-white font-bold py-2 px-4 text-sm rounded shadow-sm"
        onClick={toggleLogin}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
     </div>
     <HeadingText />
     
     <Outlet />
     
    </div>
  );
}

export default Nav;
