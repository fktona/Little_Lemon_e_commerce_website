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
import FoodItem from './Components/FoodItem'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoggedIn, setShowLoggedIn] = useState(false)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Nav />} >
        <Route path="/" element={<FoodMenu />} />
        <Route path="reservation" element={<Reservation />} />
      </Route>
    )
  );

  const [userProfile , setUserProfile ] = useState({
    username: "",
    email: "",
  })



    const [allOrder, setAllOrder] = useState([]);
  
    
      

  return (
    <div>
      <UserContext.Provider value={
        { userProfile,setUserProfile , isLoggedIn , setIsLoggedIn , setShowLoggedIn ,allOrder, setAllOrder }}>
      <RouterProvider router={router}>
      
      {showLoggedIn ? <LoginForm /> : ""}
         

      
       <Nav CompanyLogo={<CompanyLogo />} />
      
       <FoodItem />
          <FoodMenu />
          <Checkout />
    
      </RouterProvider>
      </UserContext.Provider>
      </div>
  );
}

export default App;
