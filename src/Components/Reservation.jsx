import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdWest } from "react-icons/md";
import { getDatabase, ref, push, set } from "firebase/database";
import { auth } from "../assets/firebase";
import { UserContext } from "../assets/Context/userContext";
import useSubmit from "../assets/useFormData";
const Reservation = () => {
  const { dbParentPath } = useContext(UserContext);
  // const [emptyField, setEmptyField] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getUTCDay()];
  const appliedTime = today.toUTCString();

  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    phone: "",
    partySize: "",
    date: "",
    time: "",
    request: "",
    appliedTime: appliedTime,
  });

  console.log(reservationData);

  // const  {request ,...requiredReservationData } = reservationData
  //     const emptyFieldKey = Object.keys(requiredReservationData).filter(key => !reservationData[key]);

  const {
    emptyField,
    isLoading,
    emptyFieldKey,
    handleSubmit,
    Navigate,
    handleInputChange,
  } = useSubmit("reservation", reservationData, setReservationData);

  // Form submission handler
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  // setEmptyField(true)

  //   if (emptyFieldKey.length > 0) {

  //       return;
  //     }

  // try {
  //     setIsLoading(true)
  //     const db = getDatabase();

  //     if (!auth.currentUser) {
  //       console.log("User not authenticated");
  //       return;
  //     }

  //     const dbRef = ref(db, `${dbParentPath( auth.currentUser.uid)}/reservations`);

  //     // Push the form data as a new child node with a unique key
  //     const newReservationRef = push(dbRef);
  //     await set(newReservationRef , reservationData);

  //     setReservationData((prev) => {
  //       const resetData = {};
  //       Object.keys(prev).forEach((key) => {
  //         resetData[key] = '';
  //       });
  //       return resetData;
  //     });

  //     console.log('Address data saved to Firebase');
  //   } catch (error) {
  //     console.log('Error saving address data:', error);
  //   } finally {
  //     // Set loader state back to false after response is received
  //     setIsLoading(false);
  //     setEmptyField(false)
  //     Navigate(-1)
  //   }

  //   };

  //   // Function to handle changes in form fields
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setReservationData({
  //       ...reservationData,
  //       [name]: value,
  //     });
  //   };

  return (
    <div className="mx-auto p-8 lg:px-[160px] mb-6 bg-gradient-to-r from-creamy-yellow to-crisp-white shadow-md rounded-lg">
      <button
        onClick={() => Navigate(-1)}
        className="p-[3px] px-3 text-center relative text-sm bg-accent shadow-md text-white"
      >
        <MdWest />
      </button>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-primary text-center">
          Make a Reservation
        </h2>
        <input
          placeholder="Enter Your Name"
          type="text"
          name="name"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={reservationData.name}
          onChange={handleInputChange}
        />
        <input
          placeholder="Email"
          type="email"
          name="email"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={reservationData.email}
          onChange={handleInputChange}
        />
        <input
          placeholder="Phone Number"
          type="text"
          name="phone"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={reservationData.phone}
          onChange={handleInputChange}
        />
        <label
          htmlFor="partySize"
          className="block font-medium mb-1 text-primary"
        >
          Party Size
        </label>
        <input
          id="partySize"
          type="number"
          name="partySize"
          className="w-full p-2  border border-primary rounded focus:outline-none focus:border-accent"
          value={reservationData.partySize}
          onChange={handleInputChange}
          min="1"
          step="1"
        />
        <div className="flex relative  justify-between gap-4">
          <div className="absolute w-full flex justify-between top-[-20px]">
            <label
              htmlFor="date"
              className="block font-medium mb-1 text-primary"
            >
              Date
            </label>
            <label
              htmlFor="time"
              className="block font-medium mb-1 text-primary "
            >
              Time
            </label>
          </div>
          <input
            id="date"
            placeholder="Select Date"
            type="date"
            name="date"
            className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
            value={reservationData.date}
            onChange={handleInputChange}
          />

          <input
            id="time"
            placeholder="Time"
            type="time"
            name="time"
            className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
            value={reservationData.time}
            onChange={handleInputChange}
          />
        </div>
        <textarea
          name="request"
          cols="30"
          rows="5"
          placeholder="Make Special Request"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={reservationData.request}
          onChange={handleInputChange}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-secondary hover:bg-accent text-white font-semibold py-2 rounded"
        >
          Reserve Now
        </button>
      </form>
      <ul>
        {emptyFieldKey.length > 0 &&
          emptyField &&
          emptyFieldKey.map((o) => (
            <li key={o} className="  text-sm p-1 text-red-500 mb-2  ">
              {" "}
              Fill {o}
            </li>
          ))}
      </ul>
      {isLoading && <div className="lds-dual-ring"></div>}
    </div>
  );
};

export default Reservation;
