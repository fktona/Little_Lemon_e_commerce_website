import React, { useState, useContext } from 'react';
import { UserContext } from '../assets/Context/userContext';
import { MdClose} from 'react-icons/md';
import CompanyLogo from "../assets/Context/CompanyIdentity";
import { auth } from "../assets/firebase";
import { createUserWithEmailAndPassword , fetchSignInMethodsForEmail} from "firebase/auth";


function LoginForm({switchForm, setSwitchForm}) {
  
  
  const { userProfile, setUserProfile, setIsLoggedIn, setShowLoggedIn } = useContext(UserContext);
   const [emptyField, setEmptyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existUser, setExistUser] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  
  

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: fieldValue,
       
    }));
   if (name === "password") {
    setPasswordLength(fieldValue.length < 6);
}

  };
  
  
const emptyFieldKey = Object.keys(userProfile).filter(key => !userProfile[key]);

// Assuming you have initialized Firebase and have access to the authentication service



const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (emptyFieldKey.length > 0) {
        return;
    }

    
    
    try {
        // Check if user with the given email already exists
        const signInMethods = await fetchSignInMethodsForEmail(auth, userProfile.email);
        
        if (signInMethods.length > 0) {
          setExistUser(true)
            // User with the provided email already exist
            return;
        }

        // Create user with email and password
        const userCredentials = await createUserWithEmailAndPassword(auth, userProfile.email, userProfile.password);
        
        console.log(userCredentials);
        // Handle userCredentials or any related logic here
        setExistUser(false)
        setIsLoggedIn(true);
        setShowLoggedIn(false);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}




  return (
    <div className={`signUpForm bg-[#0000006e]  ${switchForm ? "signUpFormR":null} z-[29] md:right-20 h-[62vh] max-w-[400px] fixed p-8 mt-[3rem]   bg-clip-padding backdrop-filter backdrop-blur-lg 
    z-1  flex flex-col mb-8  border  rounded shadow`}> <div className=""> <CompanyLogo/></div>
      <h2 className="text-xl text-primary font-semi-bold mb-4">Sign Up</h2>
       <button onClick={ ()=> { setShowLoggedIn(false)}}
          className=" absolute top-2 right-10 px-3 bg-red-500  text-white tex-sm py-2 opacity-100 rounded hover:bg-red-800"
        >
          <MdClose />
        </button>
        <ul className="overflow-hidden">
        { emptyFieldKey.length > 0 && emptyField && emptyFieldKey.map((o) => <li key={o}
        className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full " >Please Enter Your {o}</li>)}
        { existUser && 
        <li
        className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full " >User Already Exist </li>}</ul>
      <form onSubmit={handleSubmit} className="relative w-full flex  flex-col opacity-90  justify-center">
        <div className="mb-4">
          <input  
            placeholder="Username"
            name="username"
            value={userProfile.username}
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
          /> { passwordLength ?
          <span className="text-red-400 text-[11px] "> password should be atleast 6 characters</span>:null}
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
        <button onClick={()=>{  setEmptyField(true)}}
          type="submit"
          className=" relative px-8 bg-primary mx-auto text-white py-2 rounded hover:bg-primary"
        >
          Sign Up
        </button>
        <span onClick={ ()=> setSwitchForm(false)}
         className="text-crisp-white cursor-[pointer] mx-auto text-sm p-1 mt-5"> Already have an account<span
         className="text-white bg-secondary p-1 shadow-sm mx-4"> Sign In</span></span>
      </form>
    </div>
  );
}

export default LoginForm;
