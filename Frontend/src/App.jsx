import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Footer from './Components/Footer';
import './index.css';
import Login from './Components/Login';
import SellProducts from './Components/SellProducts';
import CustomerPage from './pages/Customerpage';
import ManagementPage from './pages/ManagementPage';
import Home from './pages/homepage';
import MerchantDashboardPage from './pages/MerchantDashboardPage';
import ProfilePage from './Components/Profile';
import ProductDescription from './Components/ProductDescription';
import CartPage from './Components/Cart';
import Wishlist from './Components/Wishlist';
import Orders from './Components/Order'

import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
 } from 'react-router-dom';

 const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/Merchant',
    element:<MerchantDashboardPage/>
  },
  {
    path:'/Merchant/addproduct',
    element:<SellProducts/>
  },
  {
    path:'/Home',
    element:<CustomerPage/>
  },
  {
    path:"/productdescription/:id",
     element:<ProductDescription/>
  },
  {
    path:"/cart",
    element:<CartPage/>
  },
  {
    path:"/wishlist",
    element:<Wishlist/>
  },
  {
    path:"/order",
    element:<Orders/>
  },
  {
    path:'/Management',
    element:<ManagementPage/>
  },
  {
    path:'/Profile',
    element:<ProfilePage/>
  }
 ])

export default function App() {
  return (
    <div className="App">
            <RouterProvider router={router} />
    </div>
  );
}

