import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { UserContext } from "../assets/Context/userContext";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "./Button";
import { TbCurrencyNaira } from "react-icons/tb";

const FoodItem = ({ menu }) => {
  const { allOrder, setAllOrder } = useContext(UserContext);
  const [orderNumber, setOrderNumber] = useState(0);
  const memoizedOrdeNumber = useMemo(() => orderNumber, [orderNumber]);

  const [totalOrder, setTotalOrder] = useState({
    menu: "",
    image: "",
    Qty: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    setTotalOrder((prevTotalOrder) => ({
      ...prevTotalOrder,

      menu: menu.name,
      image: menu.image,
      Qty: orderNumber,
      totalPrice: parseFloat((orderNumber * menu.price).toFixed(2)),
    }));
  }, [orderNumber]);

  useEffect(() => {
    const orderExistsWithDifferentQty = allOrder.some(
      (order) => order.menu === totalOrder.menu && order.Qty !== totalOrder.Qty,
    );

    if (totalOrder.Qty === 0) {
      setAllOrder(allOrder.filter((order) => order.menu !== totalOrder.menu));
    } else {
      const existingOrder = allOrder.some(
        (order) => order.menu === totalOrder.menu,
      );

      if (existingOrder) {
        if (orderExistsWithDifferentQty) {
          const updatedOrders = allOrder.map((order) =>
            order.menu === totalOrder.menu && totalOrder.Qty
              ? totalOrder
              : order,
          );
          setAllOrder(updatedOrders);
        } else {
          // Existing order with the same menu and same quantity, no need to add
        }
      } else {
        setAllOrder((prevAllOrder) => [...prevAllOrder, totalOrder]);
      }
    }
  }, [totalOrder]);

  const ordn = allOrder
    .filter((Food) => Food.menu === menu.name)
    .map((food) => food.Qty);

  useEffect(() => {
    // Update orderNumber based on ordn
    const sumOfQty = ordn.reduce((acc, qty) => acc + qty, 0);
    setOrderNumber(sumOfQty);

    if (allOrder.length > 0) {
    }
  }, [allOrder]);

  const existingOrder = allOrder.some(
    (order) => order.menu === totalOrder.menu && order.Qty !== 0,
  );

  const handleShow = () => {
    setOrderNumber(1);
    existingOrder && setOrderNumber(0);
  };

  return (
    <div className="grid grid-cols-2 place-items-center wra p-2  border-1 border-primary rounded-2xl  shadow-sm gap-[1rem] mt-5 w-full h-full">
      <img
        src={menu.image}
        alt={menu.name}
        className="aspect-square  mx-auto mb-1 rounded-ful"
      />
      <ul className="text-center flex flex-col justify-center">
        <li className="text-md font-robo text-md font-semibold">{menu.name}</li>
        <li className="text-sm text-accent">{menu.category}</li>
        <li className="text-[10px] font-robo ">{menu.description}</li>
        <li className="text-md font-mono text-primary flex items-center justify-center font-semibold">
          <TbCurrencyNaira />
          {menu.price}
        </li>

        <div className="  mr-2 ml-2">
          {existingOrder ? (
            <Button
              allOrder={allOrder}
              orderNumber={ordn}
              setOrderNumber={setOrderNumber}
            />
          ) : null}
        </div>

        <button
          className="block mx-auto text-sm p-1 mt-2 bg- hover:bg-accent text-crisp-white bg-secondary rounded-lg"
          onClick={handleShow}
        >
          {existingOrder ? (
            <AiOutlineDelete className=" rounded-sm text-lg " />
          ) : (
            "Add To Cart"
          )}
        </button>
      </ul>
    </div>
  );
};

export default FoodItem;
