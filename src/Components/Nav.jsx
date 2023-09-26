import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdMenu, MdShoppingCart, MdClose } from "react-icons/md";
import { RiUserLine, RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";
import { UserContext } from "../assets/Context/userContext";
import CompanyLogo from "../assets/Context/CompanyIdentity";

function Nav() {
  const {
    profileInformation,
    memoizedUserData,
    setShowLoggedIn,
    allOrder,
    aboutToSignOut,
    authUser,
  } = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signoutConfirm, setSignoutConfirm] = useState(false);
  const location = useLocation(); // Get the current useLocation

  const toggleLogin = () => {
    authUser
      ? (setShowLoggedIn(false), setSignoutConfirm(true))
      : setShowLoggedIn(true);
  };

  // Function to determine if a link should have secondary background color
  const shouldHighlightLink = (linkPath) => {
    return location.pathname === linkPath;
  };
  const total = allOrder.reduce(
    (accumulator, cart) => ({
      totalAmount: accumulator.totalAmount + cart.totalPrice,
      totalQty: accumulator.totalQty + cart.Qty,
    }),
    { totalAmount: 0, totalQty: 0 },
  );

  return (
    <div className="z-2  ">
      {/* Top navigation bar */}
      <div
        className={`fixed z-[10] container inset-0 h-fit mx-auto shadow-md  opacity-90
       b-crisp-white top-0  bg-clip-padding  backdrop-blur-lg
        font-bold text-sm md:flex space-x-4 flex items-center justify-between 
        p-2 pr-8 ${shouldHighlightLink("/about") ? "bg-secondary" : ""} ${
          location.pathname === "/profile" ? "hidden md:fixed" : ""
        }`}
      >
        <div className="">
          <CompanyLogo />
        </div>
        <nav
          className={`md:flex hidden mx-auto md:flex-row text-crisp justify-center gap-[3rem] flex-1 ${
            isMenuOpen ? "flex-col" : "hidden"
          }`}
        >
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`${
              shouldHighlightLink("/") ? "text-secondary" : "text-primary"
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`${
              shouldHighlightLink("/about") ? "text-secondary" : "text-primary"
            }`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`${
              shouldHighlightLink("/contact")
                ? "text-secondary"
                : "text-primary"
            }`}
          >
            Contact
          </NavLink>
          <NavLink
            to="/reservation"
            onClick={() => setIsMenuOpen(false)}
            className={`${
              shouldHighlightLink("/reservation")
                ? "text-secondary"
                : "text-primary"
            }`}
          >
            RESERVATION
          </NavLink>
        </nav>
        {authUser ? (
          <div
            className={`text-accent block ${
              shouldHighlightLink("/about") ? "text-secondary" : "text-accent"
            }`}
          >
            HI, {profileInformation ? profileInformation.firstname : ""}
          </div>
        ) : null}
        <NavLink
          to="/cart"
          className={`  hidden lg:inline text-2xl px-2 ${
            shouldHighlightLink("/cart") ? "text-secondary" : ""
          }`}
        >
          <span className="flex ">
            <MdShoppingCart className="text-primary" />{" "}
            <span className="text-[10px] bg-secondary w-[15px] text-center text-crisp-white h-[15px] rounded-full">
              {total.totalQty}
            </span>
          </span>
        </NavLink>
        <button
          className="bg-primary hover:bg-accent text-crisp-white font-bold py-2 px-4
           text-sm rounded shadow-sm"
          onClick={toggleLogin}
        >
          {authUser ? <RiLogoutBoxLine /> : <RiLoginBoxLine />}
        </button>
      </div>
      {signoutConfirm ? (
        <div className="fixed shadow-outline flex flex-col items-center gap-3 justify-center z-[12] right-3 top-10 w-[40%] p-4 bg-crisp-white">
          {" "}
          <MdClose
            onClick={() => setSignoutConfirm(false)}
            className="bg-red-500 absolute top-2 right-2 text-white"
          />{" "}
          Signout?{" "}
          <button
            onClick={() => {
              aboutToSignOut();
              setSignoutConfirm(false);
            }}
            className="py-1 px-2 text-white bg-accent mx-auto"
          >
            Yes{" "}
          </button>
        </div>
      ) : (
        ""
      )}
      {/* Bottom navigation bar (for small screens) */}
      <div
        className={`fixed z-[10] bottom-[50px] w-[85%] text-primary left-0 right-0 bg-crisp-white p-2 flex justify-around  flex-col gap-[2rem] md:hidden mx-auto rounded-3xl shadow-outline transition-all duration-1000 ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <nav
          className={`flex mx-auto p-2 flex-row text-crisp w-full flex-wrap justify-between gap-1 text-sm  top-0 flex-1 ${
            isMenuOpen ? "flex-row" : "hidden"
          }`}
        >
          <NavLink
            className={`bg-primary p-2 rounded-2xl text-crisp-white shadow-outline ${
              shouldHighlightLink("/") ? "bg-secondary" : ""
            }`}
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            className={`bg-primary p-2 rounded-2xl text-crisp-white shadow-outline ${
              shouldHighlightLink("/contact") ? "bg-secondary" : ""
            }`}
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            className={`bg-primary p-2 rounded-2xl text-crisp-white shadow-outline ${
              shouldHighlightLink("/reservation") ? "bg-secondary" : ""
            }`}
            to="/reservation"
            onClick={() => setIsMenuOpen(false)}
          >
            RESERVATION
          </NavLink>
        </nav>
        <div className="flex w-full justify-between ">
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-xl"
            >
              <MdMenu />
            </button>
          </div>
          <NavLink
            to="/cart"
            className={`text-2xl px-2 ${
              shouldHighlightLink("/cart") ? "text-secondary" : ""
            }`}
          >
            <span className="flex">
              <MdShoppingCart />{" "}
              <span className="text-[10px] bg-secondary w-[15px] text-center text-crisp-white h-[15px] rounded-full">
                {total.totalQty}
              </span>
            </span>
          </NavLink>
          <NavLink
            to="/profile"
            className={`text-2xl px-2 ${
              shouldHighlightLink("/profile") ? "text-secondary" : ""
            }`}
          >
            <RiUserLine />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
