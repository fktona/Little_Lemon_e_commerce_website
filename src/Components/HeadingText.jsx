import headerImg from "../assets/img/header.jpg";
import Search from "./Search";
import { useLocation } from "react-router";
import items from "../Item.json";
import { useState } from "react";
import { BsFilterCircle } from "react-icons/bs";
function HeadingText() {
  const bgImage = {
    background: `url(${headerImg})`,
    backgroundSize: "cover",
    width: "100%",

    backgroundRepeat: "no-repeat",
  };

  const location = useLocation();
  return (
    <div
      className={` headingText  relative flex justify-center items-center mx-auto h-[48vh] 
 md:aspect-ratio[2.5/1] shadow-sm 
 ${
   location.pathname === "/cart" ||
   location.pathname === "/profile" ||
   location.pathname === "/addresses" ||
   location.pathname === "/orders"
     ? "hidden"
     : "flex"
 }`}
      style={bgImage}
    >
      <div className="darkh absolute h-full w-full bg-black/[0.45] "></div>
                 {" "}
      <main className="  flex z-[2] flex-col justify-center items-center gap-6">
        <div className="text-white text-center flex flex-col justify-center items-center">
               {" "}
          <p className="font-bold tracking-[2px] font-popi text-3xl">
            {" "}
            Delicious Food Zone{" "}
          </p>
                     {" "}
          {location.pathname === "/" ? (
            <p className="text-[8px] w-[70%] mx-auto leading-tight font-semibold font-mono transition duration-[1000ms] hover:text-red-600 linear tracking-[1px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irur{" "}
            </p>
          ) : (
            <p className="text-[8px] w-[70%] mx-auto leading-tight font-semibold font-mono transition duration-[1000ms] hover:text-red-600 linear tracking-[1px]">
              {" "}
              Make Your Reservation We Are Here To Serve You Better
            </p>
          )}
               {" "}
        </div>
              <Search />
             {" "}
      </main>
               {" "}
    </div>
  );
}

export default HeadingText;
