import Nav from "./Components/Nav"
import Search from './Components/Search'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import HeadingText from "./Components/HeadingText";
import CompanyLogo from './assets/Context/CompanyIdentity'

export default function RootLayout() {
    const location = useLocation();
    
  return (
    <div className="">
         <Nav CompanyLogo={<CompanyLogo />} />
        <div className={`${ location.pathname === '/profile' ? 'hidden':''}`}>
        <Search />
        <HeadingText /></div>
        <Outlet />

    </div>
  )
}