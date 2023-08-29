import headerImg from "../assets/img/header.jpg"
import { useLocation } from "react-router";
import items from "../Item.json"
import { useState } from "react";
import { BsFilterCircle } from 'react-icons/bs';
function HeadingText() {
  const bgImage = {
    background: `url(${headerImg}) ,rgb(0, 0, 0 , 0.2)`, 
    backgroundSize: 'cover',
    width: '100%',
  //  backgroundBlendMode: 'screen',
    
    backgroundRepeat: 'no-repeat',
    
  };
  
 


  const location = useLocation();
  return (
    <div className={`  headingText relative flex justify-center items-center mx-auto mt-2  h-[30vh]
     md:aspect-ratio[2.5/1]   shadow-sm
      ${location.pathname === '/cart' || location.pathname === '/profile' ? 'hidden':'flex'}`} style={bgImage}>
     
    </div>
  );
}

export default HeadingText;
