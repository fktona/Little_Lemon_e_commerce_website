import Nav from "./Components/Nav"
import Search from './Components/Search'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import HeadingText from "./Components/HeadingText";

export default function RootLayout() {
    const location = useLocation();
    
  return (
    <div>
        <Nav />
        <div className={`${ location.pathname === '/profile' ? 'hidden':''}`}>
        <Search />
        <HeadingText /></div>
        <Outlet />

    </div>
  )
}
