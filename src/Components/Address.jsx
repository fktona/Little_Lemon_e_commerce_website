import React, { useState, useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { MdEditSquare, MdDelete, MdWest, MdHomeFilled } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AddressList = () => {
  const Navigate = useNavigate();
  const { addresses, defaultAddress, setDefaultAddress } =
    useContext(UserContext);

  const handleSetDefaultAddress = (index) => {
    setDefaultAddress(index);
    console.log(defaultAddress);
  };

  return (
    <div className="flex mt-4 flex-col items-center">
      <button
        onClick={() => Navigate(-1)}
        className="p-[3px] px-3 text-center text-white relative text-sm bg-accent shadow-md"
      >
        <MdWest />
      </button>
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <ul
            key={address.key}
            className={` shadow-outline relative m-6 p-8 w-fit min-w-[90%] flex flex-col gap-3 mx-auto item-center text ${
              defaultAddress === index ? " defaultAddress " : ""
            } block`}
          >
            {defaultAddress === index ? (
              <span className="text-[25px] absolute top-1 right-0 flex gap-6 mr-4 pt-1 text-primary">
                <MdHomeFilled />
              </span>
            ) : (
              ""
            )}
            {Object.entries(address.data).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </li>
            ))}
            <button
              disable={defaultAddress === index ? "disable" : null}
              onClick={() => handleSetDefaultAddress(index)}
              className="w-fit py-2 px-3  bg-primary  text-white mx-auto"
            >
              {defaultAddress === index
                ? "Default Address"
                : "set as default address"}
            </button>

            <div className="text-[25px] absolute bottom-1 right-0 flex gap-6 mr-4 pt-1 text-secondary">
              <button>
                <MdEditSquare />
              </button>
              <button>
                <MdDelete />
              </button>
            </div>
          </ul>
        ))
      ) : (
        <p className="text-xl font-semibold">No addresses available</p>
      )}
      <NavLink to="/addresses/add">
        <button className="border border-1 border-primary p-2 text-primary relative shadow-outline mt-5 mx-auto font-bold">
          {" "}
          Add New Address{" "}
        </button>
      </NavLink>
    </div>
  );
};

export default AddressList;
