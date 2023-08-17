import React, { useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { NavLink, useLocation } from "react-router-dom";

const Account = () => {
  const { userProfile, isLoggedIn, setIsLoggedIn,setShowLoggedIn , allOrder} = useContext(UserContext);

  return (
    <div>
      <header className="block w-full p-[2rem] bg-black   text-crisp-white">
        <button className="p-[4px] bg-accent shadow-md">Home</button>
        <h2>YOUR PROFILE</h2>
        {isLoggedIn ? <div> <h3>Welcome {userProfile.username}</h3> 
        <h5>{userProfile.email}</h5> 
        </div>: <button onClick={set} className="absolute bottom-20 bg-accent">Please Log In</button>}
      </header>
      <main className= "flex w-full h-[40vh] p-6 flex-col ">
        <section className= "flex w-full  p-6 flex-col justify-between">
          <div>Messages</div>
          <div>Orders</div>
          <div>Vouchers</div>
          <div>Saved Items</div>
        </section>
        <section className= "flex w-full  p-6 flex-col justify-between">
          <div>Address Book</div>
          <div>Change Theme</div>
        </section>
      </main>
    </div>
  );
};

export default Account;
