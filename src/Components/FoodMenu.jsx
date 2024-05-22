import { useState, useContext, useEffect, useCallback, useMemo } from "react";
import FoodItem from "./FoodItem";
import Button from "./Button";
import Checkout from "./Checkout";
import { BsFilterCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { UserContext } from "../assets/Context/userContext";
import items from "../Item.json";
import HeadingText from "./HeadingText";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const FoodMenu = () => {
  const [section, setSection] = useState(1);
  const [showEachCategory, setShowEachCategory] = useState(null);
  const sectionItems = {
    1: items.filter((menu) => menu.id >= 1 && menu.id <= 12),
    2: items.filter((menu) => menu.id >= 13 && menu.id <= 24),
    3: items.filter((menu) => menu.id >= 25 && menu.id <= 29), // Adjusted the condition here
  };

  const toggleSection = (sectionNumber) => {
    setSection(sectionNumber);
  };

  const [showCart, setShowCart] = useState(false);
  const memoizedShowCart = useMemo(() => showCart, [sectionItems, section]);
  const EachCategory = (showEachCategory) => {
    return items.filter((menu) => menu.category === showEachCategory);
  };

  const uniqueCategories = [...new Set(items.map((menu) => menu.category))];

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomNumbers = useMemo(() => {
    return Array.from({ length: 10 }).map(() => getRandomNumber(1, 29));
  }, []);

  return (
    <div className=" relative  mx-auto p-2 px-[20px] lg:px-[45px]  gap-8 ">
      <div>
        <h4 className="text-center text-secondary font-bold mt-[2rem] text-xl ">
          {" "}
          CATEGORIES{" "}
        </h4>
        <ul className="flex justify-around gap-4 mt-4 mb-4 items-center h-20">
          {uniqueCategories.map((category) => (
            <li
              onClick={() => {
                setShowEachCategory(category);
              }}
              className="transition duration-1000 linear transform 
hover:scale-105 shadow-outline hover:shadow-inner w-full font-bold 
border-l-2 border-primary h-full flex justify-center items-center  text-center text-secondary"
              key={category}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      {showEachCategory ? (
        <div className="  h-fit p-4 lg:h-auto    m-auto   inset-0 w-[90%] fixed z-[75] 
          bg-clip-padding backdrop-filter backdrop-blur-lg border shadow rounded-[35px]">
          <button
            onClick={() => setShowEachCategory(null)}
            className="absolute top-2 right-10 px-3 z-20 bg-red-500  text-white tex-sm py-2 opacity-100 rounded hover:bg-red-800 "
          >
            {" "}
            <MdClose />{" "}
          </button>
          <h4 className="text-center w-full  text-primary font-semi-bold lg:mb-[5rem]  m-[1rem] text-2xl ">
            {" "}
            {showEachCategory}
          </h4>
          <Swiper
            modules={[Navigation, EffectCoverflow, Pagination, Scrollbar, A11y]}
            centeredSlides={true}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            onSwiper={(swiper) => console.log(swiper)}
            className=""
          >
            {showEachCategory
              ? EachCategory(showEachCategory).map((menu) => (
                  <SwiperSlide key={menu.id}
                  className="space-x-5">
                    <FoodItem
                      key={menu.id}
                      menu={menu}
                      isBestMenu={menu.id === 2}

                    />{" "}
                
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      ) : null}
      <div className="">
        <h4 className="font-bold mt-8 p-4 flex justify-center mb-2 text-xl  text-secondary">
          JUST FOR YOU
        </h4>
        <Swiper
          modules={[Navigation, EffectCoverflow, Pagination, Scrollbar, A11y]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          centerInsufficientSlides={true}
          slidesPerView= {4}

          coverflowEffect={{
            stretch: 20,
            rotate: 50,
            depth: 50,
            slideShadows: true,
            modifier: 1,
          }}
          spaceBetween={10}
          // slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          //scrollbar={{ draggable: true }}
          loop={true}
          className="  relative p-1"
        >
          {items.map((menu) =>
            randomNumbers.includes(menu.id) ? (
              <SwiperSlide
                key={menu.id}
                className="min-w-[7rem] max-w-[7rem] md:min-w-[10rem]  relative"
              >
                <p
                  className="w-full flex items-end 
          h-full text-white text-sm text-center font-md absolute top-0 left-0 bg-black bg-opacity-50 justify-center p-2"
                >
                  {menu.name}
                </p>
                <p className="w-full flex items-start h-full text-white text-sm text-center font-md absolute top-0 left-0  justify-end p-2">
                  {menu.price}
                </p>
                <img
                  className="w-full aspect-square"
                  src={menu.image}
                  alt={menu.name}
                />
              </SwiperSlide>
            ) : (
              ""
            ),
          )}
        </Swiper>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-3 gap-6 ">
        {sectionItems[section].map((menu) => (
          <FoodItem key={menu.id} menu={menu} isBestMenu={menu.id === 2} />
        ))}
      </div>

      <div className="flex justify-center space-x-4 mb-4 mt-4 p-4 gap-6">
        <button
          className={`px-4 py-2 shadow-md rounded-md ${
            section === 1 ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => toggleSection(1)}
        >
          1
        </button>
        <button
          className={`px-4 py-2 shadow-md rounded-md ${
            section === 2 ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => toggleSection(2)}
        >
          2
        </button>
        <button
          className={`px-4 py-2 shadow-md rounded-md ${
            section === 3 ? " border-b-2 border-primary" : ""
          }`}
          onClick={() => toggleSection(3)}
        >
          3
        </button>
      </div>
      {/* <div className="sm:hidden mb:block">
      <Checkout />
       
      </div> */}
    </div>
  );
};

export default FoodMenu;
