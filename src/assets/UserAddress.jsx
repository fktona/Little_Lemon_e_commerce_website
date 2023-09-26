import { getDatabase, ref, child, onValue } from "firebase/database";
import { auth } from "./firebase";

// export const UserAddressFetcher = async (dbParentPath) => {
//   const dbRefProfile = ref(getDatabase());
//   const uid = auth.currentUser.uid;

//   try {
//     const snapshot = await get(child(dbRefProfile, `${dbParentPath}/address`));

//     if (snapshot.exists()) {
//       return snapshot.val();
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const UserAddressFetcher = (onUpdate) => {
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (user) {
    const dbRefProfile = ref(getDatabase());
    const uid = auth.currentUser.uid;

    const dbRefAddresses = ref(getDatabase(), `users/${uid}/address`);

    onValue(dbRefAddresses, (snapshot) => {
      if (snapshot.exists()) {
        const addresses = [];

        // Iterate through the children of the snapshot to get all addresses with keys
        snapshot.forEach((childSnapshot) => {
          const addressKey = childSnapshot.key;
          const addressData = childSnapshot.val();
          addresses.push({ key: addressKey, data: addressData });
        });

        onUpdate(addresses);
      } else {
        onUpdate([]);
      }
    });
  } else {
    onUpdate([]); // User is not authenticated, return an empty array or handle it as needed
  }
};

export const DataFetcher = (onUpdate, specificPath) => {
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (user) {
    const uid = auth.currentUser.uid;

    const dbRef = ref(getDatabase(), `users/${uid}/${specificPath}`);

    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = [];

        snapshot.forEach((childSnapshot) => {
          const keyValue = childSnapshot.key;
          const dataValue = childSnapshot.val();
          data.push({ key: keyValue, data: dataValue });
        });

        onUpdate(data);
      } else {
        onUpdate([]);
      }
    });
  } else {
    onUpdate([]); // User is not authenticated, return an empty array or handle it as needed
  }
};
