import React, { useState, useContext, useCallback } from "react";
import { UserContext } from "../assets/Context/userContext";
import AuthorizationContainer from "./AcessContainer";
import { auth } from "../assets/firebase";
import { NavLink , useNavigate} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";

function LoginForm() {
  const {
    userProfile,
    setUserProfile,
    setShowLoggedIn,
  } = useContext(UserContext);
  const [emptyField, setEmptyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existUser, setExistUser] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: fieldValue,
    }));
    if (name === "password") {
      setPasswordLength(fieldValue.length < 6);
    }
  };

  const emptyFieldKey = Object.keys(userProfile).filter(
    (key) => !userProfile[key],
  );

  // Assuming you have initialized Firebase and have access to the authentication service
  const { password, confirmPassword, ...userData } = userProfile;

  const createUserRecord = async (uid, email) => {
    try {
      const db = getDatabase();
      await set(ref(db, `users/${uid}/userProfile`), userData);
      console.log("saved profile ");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);

    if (
      emptyFieldKey.length > 0 ||
      userProfile.password != userProfile.confirmPassword
    ) {
      return;
    }

    try {
      setIsLoading(true);
      // Check if user with the given email already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, userProfile.email);

      if (signInMethods.length > 0) {
        setExistUser(true);
      console.log("exists")
        return;
      }

      // Create user with email and password
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userProfile.email,
        userProfile.password,
      );
      const user = userCredentials.user;

      createUserRecord(user.uid, user.email);
      
      // Handle userCredentials or any related logic here
      setExistUser(false);
      useNavigate('/')

      setShowLoggedIn(false);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
      setEmptyField(false);
    }
  };

  return (
    <AuthorizationContainer>
    <div className=" relative flex flex-col gap-5 w-full pb-6 h-full top-0">
    <h2 className="text-3xl text-[#131313] text-center font-bold  ">Sign Up</h2>
      <ul className="overflow-hidden">
        {emptyFieldKey.length > 0 &&
          emptyField &&
          emptyFieldKey.map((o) => (
            <li
              key={o}
              className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full "
            >
              Please Enter Your {o}
            </li>
          ))}
        {existUser && (
          <li className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
            User Already Exist{" "}
          </li>
        )}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="relative w-full flex  flex-col opacity-90  justify-center"
      >
        <div className="mb-4">
          <input
            placeholder="Firstname"
            name="firstname"
            value={userProfile.firstname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Lastname"
            name="lastname"
            value={userProfile.lastname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userProfile.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />{" "}
          {passwordLength ? (
            <span className="text-red-400 text-[11px] ">
              {" "}
              password should be atleast 6 characters
            </span>
          ) : null}
        </div>
        <div className="mb-4 space-y-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userProfile.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />{" "}
          {userProfile.password != userProfile.confirmPassword ? (
            <span className="text-red-400 text-[11px] ">
              {" "}
              please confirm password 
            </span>
          ) : null}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userProfile.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <button
          onClick={() => {
            setEmptyField(true);
          }}
          type="submit"
          className=" relative px-8 bg-[#131313] mx-auto text-white py-2 rounded hover:bg-primary"
        >
          Sign Up
        </button>
      </form>
      <span className="w-fit mx-auto text-white">Already have an account? <NavLink to={'/signin'} className={'lg:text-black text-secondary hover:text-primary underline font-semibold ml-2'}>Sign In</NavLink></span>
      {isLoading && <div className="lds-dual-ring"></div>}
    </div>
    </AuthorizationContainer>
  );
}

export default LoginForm;
