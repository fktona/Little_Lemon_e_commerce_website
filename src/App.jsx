import { useState} from 'react'
import Nav from "./Components/Nav"
import FoodMenu from "./Components/FoodMenu"
import Button from "./Components/Button"
import items from "./Item.json"
import { ItemOrderContext } from "./assets/Context/itemContext"
import "./App.css"

function App() {
  
 
 const [allOrder, setAllOrder] = useState([]);
 
    return (
    <>
    <ItemOrderContext.Provider 
    value={{ allOrder, setAllOrder , Button}}>

      <Nav name="faith"  style= "position: absolute"/>
     <FoodMenu
     items={items} 
     keys = {items.map((menu => menu.id))} />
      
      
     </ItemOrderContext.Provider>    
    </>
  )
}

export default App
