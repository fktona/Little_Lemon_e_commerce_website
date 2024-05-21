import { useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { NavLink } from "react-router-dom";
import { MdWest } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ReservationList = () => {
  const Navigate = useNavigate();
  const { isLoading, reservation, setReservation } = useContext(UserContext);

  return (
    <div className="relative px-4 lg:px-[160px]">
      <button
        onClick={() => Navigate(-1)}
        className="p-[3px] px-3 left-6 top-5 text-center relative text-sm bg-accent shadow-md text-white"
      >
        <MdWest />
      </button>
      {isLoading && <div className="lds-dual-ring"></div>}
      {reservation.length > 0 ? (
        <div className="relative p-6 mt-8  ">
          <h2 className=" text-lg font-bold drop-shadow-md mx-auto w-fit mb-4 text-slate-700">
            {" "}
            YOUR RESERVATIONS{" "}
          </h2>
          {reservation.map((reserve) => (
            <ul
              key={reserve.key}
              className={`flex relative pt-10 flex-col shadow-lg p-4 text-sm gap-1 mb-6 ${
                new Date(reserve.data.date) < new Date()
                  ? "bg-slate-100 drop-shadow-md"
                  : null
              }`}
            >
              <li> name: {reserve.data?.name}</li>
              <li> Email: {reserve.data?.email}</li>
              <li> Phone Number: {reserve.data?.phone}</li>
              <li> Party-Size: {reserve.data?.partySize}</li>
              <li> Date: {reserve.data?.date}</li>
              <li> Time: {reserve.data?.time}</li>
              <li> Your Resquest: {reserve.data?.request}</li>

              <li className="absolute mb-5 top-4 text-slate-500 text-[10px] right-3 ">
                {" "}
                Application Date: {reserve.data?.appliedTime}
              </li>

              {new Date(reserve.data?.date) > new Date() ? (
                <button className="bg-secondary relative transition-all linear duration-500  hover:translate-y-[-5px] shadow-outline py-1 mx-auto mt-3 px-2 text-white w-fit ">
                  {" "}
                  Cancel{" "}
                </button>
              ) : (
                <p className="bg-primary py-1 relative px-2 hover:top-[-2px] text-white mt-3 shadow-outline mx-auto w-fit">
                  {" "}
                  Thanks for Coming{" "}
                </p>
              )}
            </ul>
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center text-lg">
          {" "}
          No Reservation{" "}
        </p>
      )}
      <NavLink
        className=" text-white py-1 px-2 pb-5 bottom-0 mx-auto b w-fit flex items-center"
        to="/reservation"
      >
        <button className="border border-1 border-primary p-2 text-primary shadow-outline mt-5 font-bold">
          {" "}
          Make New Reservation{" "}
        </button>
      </NavLink>
    </div>
  );
};

export default ReservationList;
