import { useState } from "react"
import items from "../Item.json"

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = items.filter((menu) => 
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    
   );
  return (
    <div>
         <div className=" relative search mt-6 p-2 gap-2 flex items-center justify-between">
        <div className=" flex  mt-[5rem]">
         <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="shadow-md p-1 outline-none border-2 border-primary text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        /><button className='bg-primary p-2 shadow-lg text-crisp-white '>search</button>
        </div>
        
      </div>
      {searchTerm === ""? "" :
    <div className=" bg-crisp-white  absolute top-[20rem] ">
     <div className="flex  flex-col gap-2 mt-[2rem]">
              {filteredItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-crisp-white p-3  border-primary border-b-[0.5px] ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 ml-2"
                />
                <div className="text-center flex justify-between flex-1 " >
                  <p className="text-sm md:text-md ml-3 ">{item.name}</p>
                 
                </div>
               
   
              </div>
            ))}
          </div>
 
</div>}
    </div>
  )
}
