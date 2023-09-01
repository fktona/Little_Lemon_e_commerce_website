import { useState ,useEffect , useMemo} from 'react'
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
import { UserProfileFetcher } from "./assets/UserData"
import { onAuthStateChanged ,signOut} from "firebase/auth";

function App() {
  
  const [showLoggedIn, setShowLoggedIn] = useState(false)
const [allOrder, setAllOrder] = useState([]);
const [show, setShow] = useState();
const [showCart, setShowCart] = useState(false);
const [authUser, setAuthUser] = useState(null)
const [profileInformation, setProfileInformation] = useState({})

const dbParentPath =  (uid) => 'users/' + uid;
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
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    confirmPassword:"",
  })




useEffect(()=> {
  
  const listen = onAuthStateChanged(auth , (user)=> {
    user ? setAuthUser(user):null
    console.log(user)
  })
  
  return () => {
    listen()
  }
  
}, [])


useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await UserProfileFetcher(dbParentPath(auth.currentUser.uid));
        setProfileInformation(fetchedData);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [authUser]);

const memoizedUserData = useMemo(() => profileInformation, [profileInformation]);

const aboutToSignOut = () => {
  signOut(auth).then( () => {
    setAuthUser(false)
    console.log("signOut")
    }).catch((error)=> {
      console.log("error")
    })
}

console.table(profileInformation)

  return (
    <div className=' relative p-2 lg:p-3'>
      <UserContext.Provider value={
        { userProfile,setUserProfile ,   setShowLoggedIn ,allOrder, setAllOrder ,show, setShow ,showCart, setShowCart , authUser , aboutToSignOut ,dbParentPath , profileInformation, setProfileInformation ,memoizedUserData}}>
          {showLoggedIn ? <Access /> : ""}
                     <Address />     
      <RouterProvider router={router}>
      <RootLayout />

          
        
      </RouterProvider>
     
      
      </UserContext.Provider>
      </div>
  );
}

export default App;
