import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductPage from '../pages/ProductPage'
import ProductDetail from '../pages/ProductDetail'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Cart from '../pages/Cart'

const AllRoutes = () => {
  // let routes=useRoutes([
  //   {path:"/", element:<Home/>}
  // ])
  return (
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/products' element={<ProductPage/>} />
        <Route path='/productDetail/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
  )
}

export default AllRoutes