import { useState} from 'react'
import Nav from "./Components/Nav"
import FoodMenu from "./Components/FoodMenu"
import Button from "./Components/Button"
import items from "./Item.json"
import { ItemOrderContext } from "./assets/Context/itemContext"
import HeadingText from "./Components/HeadingText"
import AllMenu from "./Components/AllMenu"
function App() {
  
 
 // const [allOrder, setAllOrder] = useState([]);
 
    return (
    <div className="bg-crisp-white">
    

      <Nav name="faith" />
      <HeadingText />
      
     <AllMenu />
      
      
    
    </div>
  )
}

export default App
