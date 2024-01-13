import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import DarwinLayout from "./layouts/DarwinLayout";
import Home from "./view/Home";
import Nendo from "./view/Nendo";
import Shop from "./view/Shop";
import ProductDetails from "./view/productDetails/ProductDetails";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DarwinLayout />}>
      <Route index element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/nendo" element={<Nendo />} />
    </Route>
  )
)

export default route;