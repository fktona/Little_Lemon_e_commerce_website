import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, set } from "firebase/database";
import { auth } from "../assets/firebase";
import { UserContext } from "../assets/Context/userContext";

const useSubmit = (specificPath, formData, setFormData) => {
  const { dbParentPath } = useContext(UserContext);
  const [emptyField, setEmptyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  

  const emptyFieldKey = Object.keys(formData).filter((key) => !formData[key]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyField(true);

    if (emptyFieldKey.length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      const db = getDatabase();

      if (!auth.currentUser) {
        console.log("User not authenticated");
        return;
      }

      const dbRef = ref(
        db,
        `${dbParentPath(auth.currentUser.uid)}/${specificPath}`,
      );

  
      const newRef = push(dbRef);
      await set(newRef, formData);

      setFormData((prev) => {
        const resetData = {};
        Object.keys(prev).forEach((key) => {
          resetData[key] = "";
        });
        return resetData;
      });

      console.log("Reservation data saved to Firebase");
    } catch (error) {
      console.log("Error saving reservation data:", error);
    } finally {
      
      setIsLoading(false);
      setEmptyField(false);
      Navigate(-1);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    emptyField,
    isLoading,
    emptyFieldKey,
    Navigate,
    handleSubmit,
    handleInputChange,
  };
};
export default useSubmit;
