import headerImg from "../assets/img/header.jpg" 
import Search from "./Search" 
 import {useLocation} from "react-router"; 
 import items from "../Item.json" 
 import {useState} from "react"; 
 import {BsFilterCircle} from 'react-icons/bs'; 
 function HeadingText() { 
 const bgImage={ 
 background:`url(${headerImg})`,
 backgroundSize: 'cover', 
 width:'100%', 

 
 backgroundRepeat: 'no-repeat', 
       }; 

   
  
  
 const location = useLocation(); 
   return ( 
 <div className={` headingText relative flex justify-center items-center mx-auto h-[30vh] 
 md:aspect-ratio[2.5/1] shadow-sm 
 ${location.pathname ==='/cart' || location.pathname ==='/profile' ? 'hidden':'flex'}`} style={bgImage}> 
       
       <main className="  flex flex-col justify-center items-center gap-6">
     { location.pathname ==='/' ?
       <div className="text-white text-center flex flex-col justify-center items-center">
       <p className="font-bold"> Delicious Food Zone </p>
       <p className="text-[8px] w-[70%] mx-auto leading-tight font-semibold"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irur </p>
       </div>:""}
       <Search />
       </main>
       
     </div> 
   ); 
 } 
  
 export default HeadingText;