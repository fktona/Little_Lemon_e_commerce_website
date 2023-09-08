import { useState ,useEffect , useMemo} from 'react'
import FoodMenu from "./Components/FoodMenu"
import Reservation from "./Components/Reservation"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider , useRoutes ,BrowserRouter as Router  } from 'react-router-dom';
import { UserContext } from './assets/Context/userContext'
import Access from './Components/Access'
import Checkout from './Components/Checkout'
import Contact from './Components/Contact'
import Account from './Components/Account'
import RootLayout from './RootLayout'
import Address from './Components/AddressForm'
import AddressList from './Components/Address'
import DeliveryDetails from './Components/DeliveryDetails'
import { auth } from "./assets/firebase";
import { UserProfileFetcher } from "./assets/UserData"
import { onAuthStateChanged ,signOut} from "firebase/auth";
import { UserAddressFetcher } from "./assets/UserAddress"
function App() {
  
  const [showLoggedIn, setShowLoggedIn] = useState(false)
const [allOrder, setAllOrder] = useState([]);
const [show, setShow] = useState();
const [showCart, setShowCart] = useState(false);
const [authUser, setAuthUser] = useState(null)
const [addresses, setAddresses] = useState([])
const [defaultAddress, setDefaultAddress] = useState(0);
const [profileInformation, setProfileInformation] = useState({})

const dbParentPath =  (uid) => 'users/' + uid;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} >
        <Route path="/" element={<FoodMenu />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Checkout/>} />
        <Route path="/addresses" element={<AddressList/>} />
        <Route path="/addresses/add" element={<Address/>} />
        <Route path="delivery" element={<DeliveryDetails />}/>
      <Route path="/profile" element={<Account/>} />
        <Route path="reservation" element={<Reservation />} />
      </Route>
    )
  );
  
 
  




  if (!router) {
  console.error("No route found.");
  return null; // You can render an error message or a fallback component here.
  }
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
    
  })
  
  return () => {
    listen()
  }
  
}, [])

useEffect(() => {
  if(authUser) {
const uid = auth.currentUser.uid
const key = `cart@${uid}` 
localStorage.setItem(key, JSON.stringify(allOrder))}

else{
localStorage.setItem('cart', JSON.stringify(allOrder))
}
}, [allOrder]);


const authSavedCart = useMemo(() => {
  if(authUser) {
    const uid = auth.currentUser.uid;
 const savedCart = localStorage.getItem(`cart@${currentUser.uid}`);
      return savedCart ? JSON.parse(savedCart) : [];
    
   
  }
  }, []);

  const savedCart = useMemo(() => {
    const genericSavedCart = localStorage.getItem('cart');
    return genericSavedCart ? JSON.parse(genericSavedCart) : [];
  }, []);
  
  
  useEffect(() => {
    console.log(typeof(authSavedCart))
 if(authUser & Array.isArray(authSavedCart) ) {
  const combinedCart = [...new Set([...authSavedCart , ...savedCart ])];
  
    setAllOrder(combinedCart);
 }
 else{
   
    setAllOrder(savedCart);
  }
 },
  []);
  
  
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
  
  
  useEffect(() => {
    if (authUser) {
     const fetchData = async () => {
      try {
        await UserAddressFetcher( (updatedAddresses) => {
        setAddresses(updatedAddresses);
        console.log(updatedAddresses)
      });
      } catch (error) {
        console.log(error)
      }
     
  };
  fetchData()
  
  
  }
  }, [authUser , Address]);
  
  

const memoizedUserData = useMemo(() => profileInformation, [profileInformation]);

const aboutToSignOut = () => {
  signOut(auth).then( () => {
    setAuthUser(false)
    console.log("signOut")
    setAllOrder([])
    }).catch((error)=> {
      
    })
}


  return (
    <div className=' relative lg:p-3 pb-[4rem]'>
    
      <UserContext.Provider value={
        { userProfile,setUserProfile ,   setShowLoggedIn ,allOrder, setAllOrder ,show, setShow ,showCart, setShowCart , authUser , aboutToSignOut ,dbParentPath , profileInformation, addresses , setProfileInformation , defaultAddress ,setDefaultAddress , memoizedUserData}}>
          {showLoggedIn ? <Access /> : ""}
         
          <RouterProvider router={router}>
            <RootLayout />
          </RouterProvider>
        
                
      </UserContext.Provider>
      </div>
  );
}

export default App;
