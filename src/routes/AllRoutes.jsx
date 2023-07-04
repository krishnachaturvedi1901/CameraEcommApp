import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import ProductDetail from "../pages/ProductDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import Account from "../pages/Account";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";

const AllRoutes = () => {
  // let routes=useRoutes([
  //   {path:"/", element:<Home/>}
  // ])
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<Account />}>
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AllRoutes;
