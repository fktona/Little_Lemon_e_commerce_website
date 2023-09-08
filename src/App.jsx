import { useState ,useEffect} from 'react'
import FoodMenu from "./Components/FoodMenu"
import Reservation from "./Components/Reservation"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { UserContext } from './assets/Context/userContext'
import Access from './Components/Access'
import Checkout from './Components/Checkout'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import Account from './Components/Account'
import RootLayout from './RootLayout'
import Address from './Components/AddressForm'
import { auth } from "./assets/firebase";
import { onAuthStateChanged ,signOut} from "firebase/auth";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} >
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
const [openCart, setOpenCart] = useState(false)

const [authUser, setAuthUser] = useState(null)

useEffect(()=> {
  
  const listen = onAuthStateChanged(auth , (user)=> {
    user ? setAuthUser(user):null
  })
  
  return () => {
    listen()
  }
  
}, [])

const aboutToSignOut = () => {
  signOut(auth).then( () => {
    setIsLoggedIn(false)
    console.log("signOut")
    }).catch((error)=> {
      console.log("error")
    })
}



  return (
    <div className=' relative p-2 lg:p-3'>
      <UserContext.Provider value={
        { userProfile,setUserProfile , isLoggedIn , setIsLoggedIn , setShowLoggedIn ,allOrder, setAllOrder , setOpenCart , openCart ,show, setShow ,showCart, setShowCart , authUser , aboutToSignOut}}>
          {showLoggedIn ? <Access /> : ""}
           {openCart ? <aside className='hidden bg-gray-100 shadow-md p-2 top-[3rem] md:block z-[777777] fixed overflow-y-scroll w-[35%] h-[88vh] right-2'><Checkout /></aside>:null}      
      <RouterProvider router={router}>
      <RootLayout />
      </RouterProvider>
     
      
      </UserContext.Provider>
      </div>
  );
}

export default App;
