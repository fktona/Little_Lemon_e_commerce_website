import React, { useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { NavLink, useLocation } from "react-router-dom";
import CompanyLogo from "../assets/Context/CompanyIdentity";

const Account = () => {
  const { userProfile, isLoggedIn, setIsLoggedIn, setShowLoggedIn, allOrder } = useContext(UserContext);

  return (
    <div className="relative">
      <header className=" relative   w-full  py-6  bg-[#1f221ff8]  text-crisp-white">
       <div className="absolute px-4 py-2 top-1 w-full flex justify-between"><CompanyLogo />
       <button className="p-[2px] relative text-sm bg-accent shadow-md">Home</button></div> 
        <div className="relative   flex items-end justify-between ">
        <div className=" text-sm mt-6 px-4">
         
        {isLoggedIn ? <div> 
           <h6>YOUR PROFILE:</h6>
        <h3>Welcome,  {userProfile.username.toUpperCase()}</h3>
          <h5>{userProfile.email}</h5><button onClick={() => {
            setIsLoggedIn(false)
          }}
            className=" mt-2 p-2 py-1 bg-accent"> Logout</button>
        </div> : <button onClick={() => {
          setShowLoggedIn(true)
        }}
          className=" px-2 py-1 mt-2 bg-accent">Please Log In</button>}</div>
        </div>
      </header>
      <p className="text-sm text-primary px-4 py-1 ">Your Balance: 000</p>
      <main className="flex w-full mt-6 px-4 gap-2 flex-col ">
          <div className=" border-b-[1px] p-2 shadow-sm ">Messages</div>
          <div className=" border-b-[1px] p-2 shadow-sm ">Orders</div>
          <div className=" border-b-[1px] p-2 shadow-sm ">Vouchers</div>
          <div className=" border-b-[1px] p-2 shadow-sm ">Saved Items</div>
        
          <div className=" border-b-[1px] p-2 shadow-sm ">Address Book</div>
          <div className=" border-b-[1px] p-2 shadow-sm ">Change Theme</div>
      </main>
    </div>
  );
};

export default Account;
