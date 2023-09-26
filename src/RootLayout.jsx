import Nav from "./Components/Nav";
import Search from "./Components/Search";
import { NavLink, Outlet, useLocation, useRoutes } from "react-router-dom";
import { useState, useContext } from "react";
import Access from "./Components/Access";
import HeadingText from "./Components/HeadingText";
import CompanyLogo from "./assets/Context/CompanyIdentity";
import { UserContext } from "./assets/Context/userContext";
export default function RootLayout() {
  const { showLoggedIn } = useContext(UserContext);

  const location = useLocation();

  return (
    <div className="relative">
      {showLoggedIn ? <Access /> : ""}
      <Nav CompanyLogo={<CompanyLogo />} />
      <div
        className={`${
          location.pathname === "/profile" ||
          location.pathname === "/delivery" ||
          location.pathname === "/cart"
            ? "hidden"
            : ""
        } relative`}
      >
        <HeadingText />
      </div>
      <Outlet />
    </div>
  );
}
