import { useState} from 'react'
import Nav from "./Components/Nav"
import FoodMenu from "./Components/FoodMenu"
import Button from "./Components/Button"
import items from "./Item.json"
import { ItemOrderContext } from "./assets/Context/itemContext"
import HeadingText from "./Components/HeadingText"

function App() {
  
 
 const [allOrder, setAllOrder] = useState([]);
 
    return (
    <div className="bg-crisp-white">
    <ItemOrderContext.Provider 
    value={{ allOrder, setAllOrder , Button}}>

      <Nav name="faith" />
      <HeadingText />
      
     <FoodMenu
     items={items} 
     keys = {items.map((menu => menu.id))} />
      
      
     </ItemOrderContext.Provider>    
    </div>
  )
}

export default App
