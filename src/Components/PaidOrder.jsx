import { useContext } from "react";
import { UserContext } from "../assets/Context/userContext";
import { NavLink } from "react-router-dom";
import { MdWest } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const PaidOrder = () => {
  const Navigate = useNavigate();
  const { paidOrders } = useContext(UserContext);

  return (
    <div className="relative top-[5rem] ">
      <button
        onClick={() => Navigate(-1)}
        className="p-[3px]  px-3 left-6 top-5 text-center relative text-sm bg-accent shadow-md text-white"
      >
        <MdWest />
      </button>
      <h1 className="flex items-center justify-center text-xl font-bold font-robo p-4 m-3">
        Your Orders
      </h1>
      {paidOrders?.length > 0 ? (
        <div>
          {paidOrders.map((all) => (
            <div
              key={all.key}
              className="flex  relative flex-col justify-around items-between pt-8 p-4 gap-4 mt-8 rounded-lg  m-6 shadow-outline"
            >
              <h2 className=" absolute text-[11px] text-slate-500 top-2 right-4">
                {" "}
                Reference: {all.key}{" "}
              </h2>

              {all.data.map((each) => (
                <div className="flex justify-around items-center  rounded-lg  ">
                  <span>{each.Qty}x</span>
                  <img
                    src={each.image}
                    alt={each.menu}
                    className="w-8 h-8 ml-2"
                  />
                  <div className="text-center flex justify-between flex-1">
                    <p className="text-sm md:text-md ml-3">{each.menu}</p>
                    <p className="text-sm md:text-md mr-3">
                      ${each.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
              <p className=" text-white py-1 px-2 shadow-md bottom-0 mx-auto bg-primary w-fit flex items-center">
                {" "}
                Total: <TbCurrencyNaira />
                {all.data.reduce((acc, tot) => {
                  return acc + tot.totalPrice;
                }, 0)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center text-lg">
          {" "}
          Order Empty{" "}
        </p>
      )}
      <NavLink
        className=" text-white py-1 px-2 pb-5 bottom-0 mx-auto b w-fit flex items-center"
        to="/"
      >
        <button className="border border-1 border-primary p-2 text-primary shadow-outline mt-5 font-bold">
          {" "}
          Make New Orders{" "}
        </button>
      </NavLink>
    </div>
  );
};

export default PaidOrder;
