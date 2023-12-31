import React, { useState, useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { MdClose } from "react-icons/md";
import { auth } from "../assets/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function SignIn() {
  const {
    authUser,
    setShowLoggedIn,
    setProfileInformation,
    dbParentPath,
    setSwitchForm,
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
    <div>
      <h2 className="text-2xl text-primary font-bold mb-4">Login</h2>
      {isLoading && <div className="lds-dual-ring"></div>}
      <button
        onClick={() => {
          setShowLoggedIn(false);
        }}
        className=" absolute top-2 right-10 px-3 bg-red-500  text-white tex-sm py-2 opacity-100 rounded hover:bg-red-800"
      >
        <MdClose />
      </button>

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
        className="relative w-full flex  flex-col opacity-90  justify-center"
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
          className=" relative px-8 bg-primary mx-auto text-white py-2 rounded hover:bg-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
