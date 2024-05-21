import React, { useContext, useMemo, useState, useEffect } from "react";
import { UserContext } from "../assets/Context/userContext";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { MdWest } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";
const DeliveryDetails = () => {
  const { addresses, defaultAddress, setDefaultAddress, allOrder } =
    useContext(UserContext);
  const Navigate = useNavigate();

  const deliveryAddress = addresses[defaultAddress];
  const [selectedOption, setSelectedOption] = useState("paystack");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mt-6 p-8 lg:px-[160px] relative w-full">
      <button
        onClick={() => Navigate(-1)}
        className="p-2  mt-4 right-0 top-2  px-3 text-white text-center text-sm bg-accent shadow-md"
      >
        <MdWest />
      </button>
      {addresses.length > 0 ? (
        <div className="text-md relative text-slate-500 shadow-outline m-4 p-4 ">
          <h2 className="text-md mb-8">Default Address</h2>
          <NavLink to="/addresses/">
            <button className="p-2 text-sm relative float-right text-white bg-secondary shadow-md">
              {" "}
              change Address{" "}
            </button>
          </NavLink>
          <ul>
            {/*<li>Firstname: {deliveryAddress.data.firstName}</li>
        <li>Lastname: {deliveryAddress.lastName}</li>
        <li>Email: {deliveryAddress.email}</li>
        <li>Phone Number: {deliveryAddress.phoneNumber}</li>
        <li>Country: {deliveryAddress.country}</li>
        <li>State: {deliveryAddress.state}</li>
        <li>City: {deliveryAddress.city}</li>
        <li>Address: {deliveryAddress.address}</li>*/}
            {Object.entries(deliveryAddress.data).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NavLink
          className="w-full relative flex justify-center"
          to="/addresses/add"
        >
          <button className="bg-secondary text-white  p-2 px-3 font-bold shadow-md  hover:bg-accent w-fit mx-auto relative transform hover:translate-y-6px transition transition transform duration-700 linear ">
            {" "}
            Add Address
          </button>
        </NavLink>
      )}
      <h2 className="text-md relative text-slate-500 shadow-sm  text-xl  font-semibold mt-4 p-4">
        {" "}
        Orders
      </h2>
      {allOrder.map((cart, index) => (
        <div
          key={index}
          className="flex justify-around items-center p-4 gap-6 mt-4 rounded-lg  shadow-md"
        >
          <span>{cart.Qty}x</span>
          <img src={cart.image} alt={cart.menu} className="w-8 h-8 ml-2" />
          <div className="text-center flex justify-between flex-1">
            <p className="text-sm md:text-md ml-3">{cart.menu}</p>
            <p className="text-sm md:text-md mr-3">
              ${cart.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <h2 className="text-md relative text-slate-500 shadow-sm  text-xl  font-semibold mt-4 p-4">
        Select Payment Methood
      </h2>
      <div className="relative flex justify-evenly p-2 mt-4">
        <label htmlFor="paystack" className="flex text-slate-500 items-center">
          <input
            id="paystack"
            className={`rounded-full  mr-3 accent-primary`}
            type="radio"
            name="paymentOption"
            value="paystack"
            checked={selectedOption === "paystack"}
            onChange={handleOptionChange}
          />
          Paystack
        </label>
        <label htmlFor="balance" className="flex text-slate-500 items-center">
          <input
            id="balance"
            className={`rounded-full mr-3 accent-primary`}
            type="radio"
            name="paymentOption"
            value="balance"
            checked={selectedOption === "balance"}
            onChange={handleOptionChange}
          />
          Balance: 000
        </label>
      </div>
      <div className="bg-secondary text-white text-lag py-2 px-3 font-bold shadow-lg inset-x-0 hover:bg-accent hover:shadow-lg mt-3 flex self-center w-fit mx-auto relative transform hover:translate-y-6px transition transition transform duration-700 linear ">
        {" "}
        <Payment> Proceed To Payment </Payment>
      </div>
    </div>
  );
};

export default DeliveryDetails;
