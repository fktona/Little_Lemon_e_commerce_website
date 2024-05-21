import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserContext } from "../assets/Context/userContext";

export default function Register () {
  const error = useRouteError();
  const Navigate = useNavigate();
  const {
    setShowLoggedIn,
    
  } = useContext(UserContext);
  function gg(){
    Navigate("/signin")
    setShowLoggedIn(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg space-y-12 shadow-md">
        <h1 className="text-3xl font-bold text-primary">Try to login or register</h1>
        <button
          className="mt-4 px-4 py-2 text-white rounded h
          bg-[#131313]"
          onClick={() => gg()}
        >
          Login
        </button>
        <button
          className="mt-4 px-4 relative ml-[3rem] py-2 text-white rounded bg-[#131313]"
          onClick={() => Navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
