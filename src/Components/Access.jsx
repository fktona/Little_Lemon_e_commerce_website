import React, { useState, useContext, useCallback } from "react";
import SignIn from "./SignIn";
import SignUp from "./Signup"; // Import your SignOut component
import { UserContext } from "../assets/Context/userContext";
import AuthorizationContainer from "./AcessContainer";

const Access = () => {
  const [switchForm, setSwitchForm] = useState(false);
  return (


    

      <AuthorizationContainer>
        <SignUp />
      </AuthorizationContainer>

  
  
  );
};

export default Access;
