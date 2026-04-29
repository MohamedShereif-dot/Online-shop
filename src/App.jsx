import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthContextProvider from './components/AuthContextProvider/AuthContextProvider'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import CartContextProvider from './components/CartContextProvider/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import WishList from './components/WishList/WishList'
import WishListContext from './components/WishListContext/WishListContext'
import AllOrders from './components/AllOrders/AllOrders'

let client = new QueryClient();

export default function App() {

  const router = createBrowserRouter([
    {path:"",element:<Layout />,children:[
      {path:"",element:<ProtectedRoutes><Home /></ProtectedRoutes> },
      {path:"products",element:<ProtectedRoutes><Products /></ProtectedRoutes> },
      {path:"wishList",element:<ProtectedRoutes><WishList /></ProtectedRoutes> },
      {path:"allorders",element:<ProtectedRoutes><AllOrders /></ProtectedRoutes> },
      {path:"ProductDetails/:id",element:<ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
      {path:"cart",element:<ProtectedRoutes><Cart /></ProtectedRoutes> },
      {path:"payment",element:<ProtectedRoutes><Payment /></ProtectedRoutes> },
      {path:"login",element:<Login /> },
      {path:"register",element:<Register /> },
      {path:"categories",element:<ProtectedRoutes><Categories /></ProtectedRoutes> },
      {path:"brands",element:<ProtectedRoutes><Brands /></ProtectedRoutes> },
      {path:"*",element:<NotFoundPage /> }
    ]}
  ])

  return <>
      <QueryClientProvider client={client}>
        
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContext>
              <RouterProvider router={router} />
              <Toaster />
            </WishListContext>
          </CartContextProvider>
        </AuthContextProvider>
        
      </QueryClientProvider>
  </>
}

