import React, { useState, useContext, useCallback } from "react";
import SignIn from "./SignIn";
import SignUp from "./Login"; // Import your SignOut component
import { UserContext } from "../assets/Context/userContext";

const Access = () => {
  const [switchForm, setSwitchForm] = useState(false);
  return (
    <div className="box-item">
      <div className={`flip-box`}>
        <div
          className={`${
            !switchForm ? "flip-box-back-now" : ""
          }  flip-box-back login w-[90%] bg-[#0000006e]   z-[29] md:right-20 max-w-[500px] fixed p-8 mt-[3rem]    top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg 
    flex flex-col mb-8 top-5 translate-x-2 p-4 border  rounded shadow`}
        >
          {" "}
          <SignIn />
          <span className="text-crisp-white  mx-auto text-sm p-1 mt-5">
            {" "}
            Don't have an account
            <span
              onClick={() => setSwitchForm(true)}
              className="text-white mx-4 py-1 px-2 bg-secondary"
            >
              {" "}
              Sign Up{" "}
            </span>
          </span>{" "}
        </div>

        <div
          className={` ${
            switchForm ? "flip-box-back" : ""
          }flip-box-back  w-[90%] bg-[#0000006e]   z-[29] md:right-20 max-w-[500px] fixed p-8 mt-[3rem]    top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg 
    flex flex-col mb-8 top-5 translate-x-2 p-4 border  rounded shadow `}
        >
          {" "}
          <SignUp />
          <span className="text-crisp-white mx-auto text-sm p-1 mt-5">
            {" "}
            Already have an account
            <span
              onClick={() => setSwitchForm(false)}
              className="text-white mx-4 py-1 px-2 bg-secondary "
            >
              {" "}
              Sign In
            </span>
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Access;
