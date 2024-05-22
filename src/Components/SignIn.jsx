import React, { useState, useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { auth } from "../assets/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import AuthorizationContainer from "./AcessContainer";
function SignIn() {

  const navigate = useNavigate();
  const {
    setShowLoggedIn,
  } = useContext(UserContext);
  const [emptyField, setEmptyField] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setUserSignIn((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };
  const emptyFieldKey = Object.keys(userSignIn).filter(
    (key) => !userSignIn[key],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emptyFieldKey.length > 0) {
      setEmptyField(true);
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        userSignIn.email,
        userSignIn.password,
      );

      setEmptyField(false);
      setShowLoggedIn(false);
      console.log(userCredential.user);
      navigate('/')
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        console.log("Incorrect password");
        setIncorrectPassword(true);
      } else if (error.code === "auth/user-not-found") {
        console.log("User not found");
        setIncorrectEmail(true);
        // Handle user not found condition here, e.g., show error message to the user
      } else {
        console.error("Error signing in:", error);
        setSignInError(true);
      }
    } finally {
      setIsLoading(false);
      setEmptyField(false);
    }
  };

  return (
    <AuthorizationContainer>
    <div className=" relative flex flex-col gap-5 w-full h-full top-0">
      <h2 className="text-4xl text-[#131313]  text-center font-bold mb-4">Sign In</h2>
      {isLoading && <div className="lds-dual-ring"></div>}
    
      <ul className="overflow-hidden">
        {emptyFieldKey.length > 0 &&
          emptyField &&
          emptyFieldKey.map((o) => (
            <li
              key={o}
              className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2"
            >
              Please Enter Your {o}
            </li>
          ))}{" "}
        {incorrectPassword ? (
          <li className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
            {" "}
            INCORRECT PASSWORD
          </li>
        ) : null}
        {incorrectEmail ? (
          <li className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
            {" "}
            USER NOT FOUND
          </li>
        ) : null}
        {signInError ? (
          <span className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
            {" "}
            Error Occurred
          </span>
        ) : null}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="relative w-full flex  flex-col gap-4 opacity-90  justify-center"
      >
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userSignIn.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userSignIn.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <button
          onClick={() => {
            setEmptyField(true);
          }}
          type="submit"
          className=" relative px-8 bg-[#131313] opacity-100 mx-auto z-10 text-white py-2 rounded
           hover:bg-primary"
        >
          Login
        </button>
      </form>
      <span className="w-fit mx-auto text-white">Do not have an account? 
      <NavLink to={'/signup'} className={'lg:text-black text-secondary hover:text-primary underline font-semibold ml-2'}>Sign Up</NavLink></span>
     
    </div>
    </AuthorizationContainer>
  );
}

export default SignIn;
