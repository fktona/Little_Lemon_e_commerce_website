import { useState, useContext } from "react";
import { usePaystackPayment } from "react-paystack";
import { auth } from "../assets/firebase";
import { UserContext } from "../assets/Context/userContext";
import useSubmit from "../assets/useFormData";
import { getDatabase, ref, push, set } from "firebase/database";

const config = (email, amount) => ({
  reference: new Date().getTime().toString(),
  email: `${email}`,
  amount: `${amount * 100}`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: "pk_test_aa7db7cc6cc5e206e2e6b79c3b4d4881b9452033",
});

const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

const Payment = ({ children }) => {
  const { authUser, allOrder, dbParentPath } = useContext(UserContext);
  const amount = allOrder.reduce((acc, t) => {
    return acc + t.totalPrice;
  }, 0);

  const save = () => {
    const db = getDatabase();

    const dbRef = ref(db, `${dbParentPath(auth.currentUser.uid)}/payment`);

    const newRef = push(dbRef);
    set(newRef, allOrder);
  };
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    save();

    console.log(reference);
  };

  const initializePayment = usePaystackPayment(
    config(auth.currentUser.email, amount),
  );
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess(), onClose);
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default Payment;
