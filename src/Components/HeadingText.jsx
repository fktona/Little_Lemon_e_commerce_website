import headerImg from "../assets/img/header.jpg";
import Search from "./Search";
import { useLocation } from "react-router";
function HeadingText() {

  const location = useLocation();
  return (
    <div
      className={`hero min-h-[80vh] px-6 relative 
      flex justify-center items-center mx-auto  
 md:aspect-ratio[2.5/1] shadow-sm 
 ${
   location.pathname === "/cart" ||
   location.pathname === "/profile" ||
   location.pathname === "/addresses" ||
   location.pathname === "/orders"
     ? "hidden"
     : "flex"
 }`}
    >
      <div className=" absolute h-full w-full bg-black/[0.45] "></div>
                 {" "}
      <main className="  flex z-[2] flex-col justify-center items-center gap-6">
        <div className="text-white text-center flex lg:gap-4 gap-10 flex-col justify-center items-center">
               {" "}
          <p className=" text-[18px] md:text-[24px] text-primary">More Flavour For Less</p>
          <p className="font-bold tracking-[2px]  text-3xl lg:text-[45px] leading-[110%]">
            {" "}
            Delicious Food Zone<br />
            At Your Ease
          </p>
                     {" "}
          {location.pathname === "/" ? (
            <p className="text-[16px] text-white/95 lg:w-[60%] mx-auto  transition  tracking-[1px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
