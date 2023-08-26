import { useState} from 'react'
import Nav from "./Components/Nav"
import FoodMenu from "./Components/FoodMenu"
import Button from "./Components/Button"
import items from "./Item.json"
import { ItemOrderContext } from "./assets/Context/itemContext"
import HeadingText from "./Components/HeadingText"
import AllMenu from "./Components/AllMenu"
import Reservation from "./Components/Reservation"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import CompanyLogo from './assets/Context/CompanyIdentity'
import { UserContext } from './assets/Context/userContext'
import LoginForm from './Components/Login'
import Checkout from './Components/Checkout'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import Account from './Components/Account'
import Search from './Components/search'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Nav />} >
        <Route path="/" element={<FoodMenu />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Checkout/>} />
       <Route path="/profile" element={<Account/>} />
        <Route path="reservation" element={<Reservation />} />
      </Route>
    )
  );
  

  const [userProfile , setUserProfile ] = useState({
    username: "",
    email: "",
    password: "",
  })


const [showLoggedIn, setShowLoggedIn] = useState(false)
const [allOrder, setAllOrder] = useState([]);
    
const [show, setShow] = useState();
const [showCart, setShowCart] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className=' relative p-2 lg:p-3'>
      <UserContext.Provider value={
        { userProfile,setUserProfile , isLoggedIn , setIsLoggedIn , setShowLoggedIn ,allOrder, setAllOrder ,show, setShow ,showCart, setShowCart }}>
          {showLoggedIn ? <LoginForm /> : ""}
                 <Search />
      <RouterProvider router={router}>
         <Nav CompanyLogo={<CompanyLogo />} />

 <Account />
          <FoodMenu />
          <Checkout />
           <Search />
      </RouterProvider>
     
      
      </UserContext.Provider>
      </div>
  );
}

export default App;
