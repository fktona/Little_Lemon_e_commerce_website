import { getDatabase, ref, child, get } from "firebase/database";
import { auth } from "./firebase";

export const UserProfileFetcher = async (dbParentPath) => {
  const dbRefProfile = ref(getDatabase());
  const uid = auth.currentUser.uid;

  try {
    const snapshot = await get(
      child(dbRefProfile, `${dbParentPath}/userProfile`),
    );

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
