import React, { useState, useContext } from "react";
// import { getDatabase , ref , push , set } from "firebase/database"
import { useNavigate } from "react-router-dom";
// import { auth } from "../assets/firebase";
// import { UserContext } from "../assets/Context/userContext"
import { MdWest } from "react-icons/md";
import useSubmit from "../assets/useFormData";
const AddressForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  const {
    emptyField,
    isLoading,
    emptyFieldKey,
    handleSubmit,
    Navigate,
    handleInputChange,
  } = useSubmit("address", formData, setFormData);

  // const { dbParentPath} = useContext(UserContext);
  // const emptyFieldKey = Object.keys(formData).filter(key => !formData[key]);
  // const [emptyField, setEmptyField] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const handleInputChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   const fieldValue = type === 'checkbox' ? checked : value;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: fieldValue,
  //   }));
  // };

  // const handleSubmit = async (event) => {
  // event.preventDefault();
  // setEmptyField(true)

  // if (emptyFieldKey.length > 0) {

  //     return;
  //   }
  // try {
  //   setIsLoading(true)
  //   const db = getDatabase();

  //   if (!auth.currentUser) {
  //     console.log("User not authenticated");
  //     return;
  //   }

  //   const dbRef = ref(db, `${dbParentPath( auth.currentUser.uid)}/address`);

  //   // Push the form data as a new child node with a unique key
  //   const newAddressRef = push(dbRef);
  //   await set(newAddressRef, formData);

  //   setFormData((prev) => {
  //     const resetData = {};
  //     Object.keys(prev).forEach((key) => {
  //       resetData[key] = '';
  //     });
  //     return resetData;
  //   });

  //     console.log('Address data saved to Firebase');
  //   } catch (error) {
  //     console.log('Error saving address data:', error);
  //   } finally {
  //     // Set loader state back to false after response is received
  //     setIsLoading(false);
  //     setEmptyField(false)
  //     Navigate(-1)
  //   }
  // };

  return (
    <div className="px-4 lg:px-[160px]">
      <button
        onClick={() => Navigate(-1)}
        className="p-2  mt-4 right-0 top-2  px-3 text-white text-center text-sm bg-accent shadow-md"
      >
        <MdWest />
      </button>
      <form
        onSubmit={handleSubmit}
        className=" addressForm relative mt-4 flex flex-col gap-6"
      >
        <h3> FILL YOU ADDRESS</h3>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div></div>
        <button type="submit">Submit</button>
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
      </form>
    </div>
  );
};

export default AddressForm;
