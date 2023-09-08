export const UserAddressFetcher = (onUpdate) => {
  const dbRefProfile = ref(getDatabase());
  const uid = auth.currentUser.uid;
  
  const dbRefAddresses = ref(getDatabase(), `users/${uid}/address`);

export const UserReservationFetcher = (onUpdate) => {
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (user) {
    const dbRefProfile = ref(getDatabase());
  const uid = auth.currentUser.uid;

  const dbRefReserve = ref(getDatabase(), `users/${uid}/reservations`);

  onValue(dbRefReserve, (snapshot) => {
    if (snapshot.exists()) {
      const reservation = [];

      // Iterate through the children of the snapshot to get all addresses with keys
      snapshot.forEach((childSnapshot) => {
        const reservationKey = childSnapshot.key;
        const reservationData = childSnapshot.val();
        reservation.push({ key: reservationKey, data: reservationData });
      });

      onUpdate(reservation);
    } else {
      onUpdate([]);
    }
  });
  } else {
    onUpdate([]); // User is not authenticated, return an empty array or handle it as needed
  }
};