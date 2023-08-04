import { useState} from 'react'
import Nav from "./Components/Nav"
import FoodMenu from "./Components/FoodMenu"
import Button from "./Components/Button"
import items from "./Item.json"
import { ItemOrderContext } from "./assets/Context/itemContext"
import HeadingText from "./Components/HeadingText"
import AllMenu from "./Components/AllMenu"
import OrderingForm from "./Components/OrderingForm"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Nav />} >
        <Route path="/" element={<AllMenu />} />
        <Route path="reservation" element={<OrderingForm />} />
      </Route>
    )
  );

  return (
    <div>
            <HeadingText />
      <RouterProvider router={router}>
       <Nav name="faith" />

        <AllMenu />
      </RouterProvider>
    </div>
  );
}

export default App;
