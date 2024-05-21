import { useState, useEffect, useMemo } from "react";
import FoodMenu from "./Components/FoodMenu";
import Reservation from "./Components/Reservation";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRoutes,
  BrowserRouter as Router,
} from "react-router-dom";
import { UserContext } from "./assets/Context/userContext";
import Checkout from "./Components/Checkout";
import Contact from "./Components/Contact";
import Account from "./Components/Account";
import RootLayout from "./RootLayout";
import Address from "./Components/AddressForm";
import ReservationList from "./Components/ReservationForm";
import AddressList from "./Components/Address";
import Register from "./Components/Register";
import PaidOrder from "./Components/PaidOrder";
import DeliveryDetails from "./Components/DeliveryDetails";
import { auth } from "./assets/firebase";
import { UserProfileFetcher } from "./assets/UserData";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { DataFetcher } from "./assets/UserAddress";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import ErrorPage from "./Components/Error";
function App() {
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  const [allOrder, setAllOrder] = useState([]);
  const [show, setShow] = useState();
  const [switchForm, setSwitchForm] = useState();
  const [showCart, setShowCart] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [paidOrders, setPaidOrders] = useState();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(0);
  const [profileInformation, setProfileInformation] = useState({});

  const dbParentPath = (uid) => "users/" + uid;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signin" element={< SignIn/>} />
        <Route path="/signup" element={< Signup/>} />
        <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<FoodMenu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/orders" element={authUser?<PaidOrder />:<Register/> }/>
        <Route path="/addresses" element={authUser?<AddressList />:<Register/>}/>
        <Route path="/addresses/add" element={<Address />} />
        <Route path="delivery" element={authUser?<DeliveryDetails />:<Register />} />
        <Route path="/profile" element={<Account />} />
        <Route path="reservation" element={authUser?<Reservation />:<Register/>} />
        <Route path="/reservation/list" element={<ReservationList />} />
      </Route>
      </Route>,
    ),
  );

  if (!router) {
    console.error("No route found.");
    return null; // You can render an error message or a fallback component here.
  }
  const [userProfile, setUserProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      user ? setAuthUser(user) : null;
    });

    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    if (authUser) {
      const uid = auth.currentUser.uid;
      const key = `cart@${uid}`;
      localStorage.setItem(key, JSON.stringify(allOrder));
    } else {
      localStorage.setItem("cart", JSON.stringify(allOrder));
    }
  }, [allOrder]);

  const authSavedCart = useMemo(() => {
    if (authUser) {
      const uid = auth.currentUser.uid;
      const savedCart = localStorage.getItem(`cart@${currentUser.uid}`);
      return savedCart ? JSON.parse(savedCart) : [];
    }
  }, []);

  const savedCart = useMemo(() => {
    const genericSavedCart = localStorage.getItem("cart");
    return genericSavedCart ? JSON.parse(genericSavedCart) : [];
  }, []);

  useEffect(() => {
    if (authUser & Array.isArray(authSavedCart)) {
      const combinedCart = [...new Set([...authSavedCart, ...savedCart])];

      setAllOrder(combinedCart);
    } else {
      setAllOrder(savedCart);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await UserProfileFetcher(
          dbParentPath(auth.currentUser.uid),
        );
        setProfileInformation(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [authUser]);

  useEffect(() => {
    const addressPath = "address";
    const reservationPath = "reservation";
    const paidOrdersPath = "payment";
    if (authUser) {
      setIsLoading(true);
      try {
        DataFetcher((updatedAddresses) => {
          setAddresses(updatedAddresses);
          console.log(updatedAddresses);
        }, addressPath);
      } catch (error) {
        console.log(error, "unable to get Address");
      }

      try {
        DataFetcher((updatedReservation) => {
          setReservation(updatedReservation);
          console.log(updatedReservation);
        }, reservationPath);
      } catch (error) {
        console.log(error, "unable to get Address");
      }
      try {
        DataFetcher((updatedPaidOrders) => {
          setPaidOrders(updatedPaidOrders);
          console.log(updatedPaidOrders);
        }, paidOrdersPath);
      } catch (error) {
        console.log(error, "unable to get updatedPaidOrders");
      } finally {
        setIsLoading(false);
      }
    }
  }, [authUser, Address, Reservation]);

  const memoizedUserData = useMemo(
    () => profileInformation,
    [profileInformation],
  );

  const aboutToSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(false);
        console.log("signOut");
        setAllOrder([]);
      })
      .catch((error) => {});
  };

  return (
    <div className=" pb-[4rem] relative max-w-[1440px] mx-auto">
      <UserContext.Provider
        value={{
          userProfile,
          setUserProfile,
          showLoggedIn,
          setShowLoggedIn,
          allOrder,
          setAllOrder,
          show,
          setShow,
          showCart,
          setShowCart,
          authUser,
          aboutToSignOut,
          dbParentPath,
          profileInformation,
          addresses,
          setProfileInformation,
          defaultAddress,
          isLoading,
          setSwitchForm,
          switchForm,
          setDefaultAddress,
          reservation,
          setReservation,
          paidOrders,
          memoizedUserData,
        }}
      >
        <RouterProvider router={router}>
          <RootLayout />
        </RouterProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
