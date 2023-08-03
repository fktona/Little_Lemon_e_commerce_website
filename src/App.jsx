import { useState} from 'react'
import Nav from "./Components/Nav"
import FoodMenu from "./Components/FoodMenu"
import Button from "./Components/Button"
import items from "./Item.json"
import { ItemOrderContext } from "./assets/Context/itemContext"
import HeadingText from "./Components/HeadingText"
import AllMenu from "./Components/AllMenu"
import OrderingForm from "./Components/OrderingForm"
//import {BrowserRouter , Routes ,Route} from "react-router-dom"
function App() {
  
 
 // const [allOrder, setAllOrder] = useState([]);
 
    return (
    <div>
    

      <Nav name="faith" />
      <HeadingText />
      
     <AllMenu />
      
      
    <OrderingForm />
    </div>
  )
}

export default App
