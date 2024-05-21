import { useState } from "react";
import items from "../Item.json";
import { MdSearch, MdClose } from "react-icons/md";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = items
    .filter((menu) =>
      menu.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchTerm.replace(/\s+/g, "").toLowerCase()),
    )
    .slice(0, 10);

  const [expandSearch, setExpandSearch] = useState(false);

  return (
    <div className="relative  flex  items-center w-full justify-center">
      {expandSearch && (
        <>
          <div className=" ">
            <div className=" flex overflow-hidden">
              <input
                type="text"
                name=""
                id=""
                placeholder="search"
                className="shadow-md p-1 searhInput outline-none border-2 border-primary text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {searchTerm === "" ? (
            ""
          ) : (
            <div className=" bg-crisp-white w-[80%]  left-10 absolute top-[2rem] ">
              <div className="flex items-center  flex-col gap-2 mt-[2rem]">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between w-full items-center bg-crisp-white p-3  border-primary border-b-[0.5px] "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 ml-2"
                    />
                    <div className="text-center flex justify-between flex-1 ">
                      <p className="text-sm md:text-md ml-3 ">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <button
        className={`${
          expandSearch ? "searhButton" : ""
        } relative shadow-outline hover:shadow-md search p-1  px-2 flex items-center text-bold  text-xl text-white bg-primary justify-between border-2 border-primary`}
        onClick={() => setExpandSearch((prev) => !prev)}
      >
        {" "}
        {expandSearch ? <MdClose /> : <MdSearch />}
      </button>
    </div>
  );
}
