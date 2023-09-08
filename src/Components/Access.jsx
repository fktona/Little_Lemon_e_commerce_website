import SignIn from "./SignIn"
import SignUp from './SignUp'
import { useState } from "react";

const Access = () =>  {
  const [switchForm, setSwitchForm] = useState(false); 
    
  return (
    <div className={`fixed w-[88%] ${ switchForm ? "accessFrm":null} bg-red-700  z-[1000] flex justify-center`}>
      <div className={`accessForm ${switchForm ? "accessFormR":null }`}>
        <SignUp switchForm={switchForm}
                setSwitchForm={setSwitchForm} />

        <SignIn switchForm={switchForm}
                setSwitchForm={setSwitchForm}/>
         </div>

    </div>
  )
}
export default  Access