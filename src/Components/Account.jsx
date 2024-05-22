import { useContext, useState } from "react";
import { UserContext } from "../assets/Context/userContext";
import { NavLink} from "react-router-dom";
import CompanyLogo from "../assets/Context/CompanyIdentity";
import { GrNext, GrDown } from "react-icons/gr";
import {  MdWest } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const Navigate = useNavigate();

  const {
    authUser,
    aboutToSignOut,
    memoizedUserData,
    addresses,
    defaultAddress,
  } = useContext(UserContext);

  const [showSections, setShowSections] = useState({
    messages: false,
    order: false,
    savedItems: false,
    addressBook: false,
    reservationList: false,
    changeTheme: false,
  });

  const toggleSection = (section) => {
    setShowSections((prevShowSections) => ({
      ...Object.keys(prevShowSections).reduce((acc, key) => {
        acc[key] = key === section ? !prevShowSections[key] : false;
        return acc;
      }, {}),
    }));
  };

  return (
    <div className="relative">
      <header className=" relative   w-full  py-6  bg-[#1f221ff8]  text-crisp-white">
        <div className="absolute px-4 py-2 top-1 w-full flex justify-between">
          <CompanyLogo />
          <button
            onClick={() => Navigate(-1)}
            className="p-[3px] px-3 text-center relative text-sm bg-accent shadow-md"
          >
            <MdWest />
          </button>
        </div>
        <div className="relative   flex items-end justify-between ">
          <div className=" text-sm mt-6 px-4">
            {authUser ? (
              <div>
                <h6>YOUR PROFILE:</h6>
                <h3>Welcome,{memoizedUserData.firstname} </h3>
                <h5>{authUser.email}</h5>
                <button
                  onClick={aboutToSignOut}
                  className=" mt-2 p-2 py-1 bg-accent"
                >
                  {" "}
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to={'/signin'}
                className=" px-2 py-1 mt-2 bg-accent"
              >
                Please Log In
              </NavLink>
            )}
          </div>
        </div>
      </header>
      <p className="text-sm font-bold bg-green-100 text-primary px-4 py-1 ">
        Your Balance: 000
      </p>
      <main className="flex w-full lg:px-[60px] mt-6 px-4 gap-6 flex-col ">
        <div
          onClick={() => toggleSection("messages")}
          className="relative flex flex-col gap-2 justify-between item-center border-b-[1px] p-2 shadow-sm "
        >
          <div className="flex justify-between">
            Messages {showSections.messages ? <GrDown /> : <GrNext />}
          </div>
          {showSections.messages && (
            <div className="show relative p-1 flex justify-end bg-green-50 w-full">
              <span className="absolute top-[30%]  left-2 text-[12px]">
                {" "}
                No Messages
              </span>
              <button className="relative right-0 border text-primary p-1 px-3 hover:bg-primary hover:text-crisp-white flex border-1 border-primary">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggleSection("order")}
          className="relative flex flex-col gap-2 justify-between item-center border-b-[1px] p-2 shadow-sm "
        >
          <div className="flex justify-between">
            orders {showSections.order ? <GrDown /> : <GrNext />}
          </div>
          {showSections.order && (
            <div className="show relative p-1 flex justify-end bg-green-50 w-full">
              <button
                onClick={() => Navigate("/orders")}
                className="relative right-0 border text-primary p-1 px-3 hover:bg-primary hover:text-crisp-white flex border-1 border-primary"
              >
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggleSection("savedItems")}
          className="relative flex flex-col gap-2 justify-between item-center border-b-[1px] p-2 shadow-sm "
        >
          <div className="flex justify-between">
            Saved Items {showSections.savedItems ? <GrDown /> : <GrNext />}
          </div>
          {showSections.savedItems && (
            <div className="show relative p-1 flex justify-end bg-green-50 w-full">
              <button className="relative right-0 border text-primary p-1 px-3 hover:bg-primary hover:text-crisp-white flex border-1 border-primary">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggleSection("addressBook")}
          className="relative flex flex-col gap-2 justify-between item-center border-b-[1px] p-2 shadow-sm "
        >
          <div className="flex justify-between">
            Address {showSections.addressBook ? <GrDown /> : <GrNext />}
          </div>
          {showSections.addressBook && (
            <div className="show relative p-1 flex justify-between bg-green-50 w-full">
              {authUser && addresses.length > 0 ? (
                <div className="text-[12px] relative flex flex-col">
                  <span>
                    Name: {addresses[defaultAddress].data.firstName}{" "}
                    {addresses[defaultAddress].data.lastName}{" "}
                  </span>
                  <span>
                    Address: {addresses[defaultAddress].data.address} .....{" "}
                  </span>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={() => Navigate("/addresses")}
                className="relative right-0 border text-primary self-end p-1 px-3 hover:bg-primary hover:text-crisp-white flex items-center gap-2  border-1 border-primary"
              >
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggleSection("reservationList")}
          className="relative flex flex-col gap-2 justify-between item-center border-b-[1px] p-2 shadow-sm "
        >
          <div className="flex justify-between">
            Reservation {showSections.reservationList ? <GrDown /> : <GrNext />}
          </div>
          {showSections.reservationList && (
            <div className="show relative p-1 flex justify-between bg-green-50 w-full">
              <button
                onClick={() => Navigate("/reservation/list")}
                className="relative right-0 border text-primary self-end p-1 px-3 hover:bg-primary hover:text-crisp-white flex items-center gap-2  border-1 border-primary"
              >
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggleSection("changeTheme")}
          className="relative flex flex-col gap-2 justify-between item-center border-b-[1px] p-2 shadow-sm "
        >
          <div className="flex justify-between">
            ChangeTheme {showSections.changeTheme ? <GrDown /> : <GrNext />}
          </div>
          {showSections.changeTheme && (
            <div className="show relative p-1 flex justify-end bg-green-50 w-full">
              <button className="relative right-0 border text-primary p-1 px-3 hover:bg-primary hover:text-crisp-white flex border-1 border-primary">
                Switch
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Account;
