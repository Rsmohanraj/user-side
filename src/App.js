import React, { useEffect, useState } from 'react'
import './App.css'
import  axios from 'axios';

import Header from './compontents/Header';
import Footer from '../src/compontents/Footer';
import Home from './compontents/Home';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './compontents/ProductDetail';
import ProductSearch from './compontents/ProductSearch';
import Login from './compontents/User/Login';
import Register from './compontents/User/Register';
import store from './store'
import { loadUser } from './Actions/userActions';
import Profile from './compontents/User/Profile';
import ProtuctedRoute from './compontents/Route/ProtuctedRoute';
import UpdateProfile from './compontents/User/UpdateProfile';
import UpdatePassword from './compontents/User/UpdatePassword';
import ForgetPassword from './compontents/User/ForgetPassword';
import ResetPassword from './compontents/User/ResetPassword';
import Cart from './compontents/cart/Cart';
import Shipping from './compontents/cart/Shipping';
import ConfirmOrder from './compontents/cart/ConfirmOrder';
import Payment from './compontents/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './compontents/cart/OrderSuccess';
import UserOrders from './compontents/order/UserOrders';
import OrderDetail from './compontents/order/OrderDetail';
import Dashboard from './compontents/Admin/Dashboard';
import ProductList from './compontents/Admin/ProductList';
import NewProduct from './compontents/Admin/NewProduct';
import UpdateProduct from './compontents/Admin/UpdateProduct';
import OrderList from './compontents/Admin/OrderList';
import UpdateOrder from './compontents/Admin/UpdateOrder';
import UserList from './compontents/Admin/UserList';
import UpdateUser from './compontents/Admin/UpdateUser';
import ReviewList from './compontents/Admin/ReviewList';








function App() {
 
 
const [stripeApiKey, setStripeApiKey] = useState("")
store.dispatch(loadUser)

async function getStripeApiKey() {
  try {
    const response = await axios.get('https://server-side-16.onrender.com/api/v1/stripeapi');
    const { data } = response; // Destructure the data from response
    setStripeApiKey(data.stripeApiKey);
  } catch (error) {
    console.error('Error fetching Stripe API key:', error); // Handle errors gracefully
  }
}

useEffect(() => {
  getStripeApiKey();
}, []);

  return (
    <Router>
 <div className='App'>
  <HelmetProvider>

  
     <Header />
    <ToastContainer  />
    <div className='container container-fluid'>
    <Routes>
        <Route path ='/' element={<Home />} />
        <Route path ='/search/:keyword' element={<ProductSearch/>} />
        <Route path ='/product/:id' element={<ProductDetail />} />
        <Route path ='/login' element={<Login />} />
        <Route path ='/register' element={<Register />} />
        <Route path ='/myProfile' element={<ProtuctedRoute><Profile/></ProtuctedRoute>} />
        <Route path ='/myProfile/update' element={<ProtuctedRoute><UpdateProfile/></ProtuctedRoute>} />
        <Route path ='/myProfile/update/Password' element={<ProtuctedRoute><UpdatePassword /></ProtuctedRoute>} />
        <Route path ='/password/forget' element={<ForgetPassword />} />
        <Route path ='/password/reset/:token' element={<ResetPassword />} />
        <Route path ='/cart' element={<Cart />} />
        <Route path ='/Shipping' element={<ProtuctedRoute><Shipping/></ProtuctedRoute>} />
        <Route path ='/order/confirm' element={<ProtuctedRoute><ConfirmOrder/></ProtuctedRoute>} />
        <Route path ='/order/success' element={<ProtuctedRoute><OrderSuccess/></ProtuctedRoute>} />
        <Route path ='/orders' element={<ProtuctedRoute><UserOrders/></ProtuctedRoute>} />
        <Route path ='/order/:id' element={<ProtuctedRoute><OrderDetail/></ProtuctedRoute>} />
        {stripeApiKey && <Route path='/payment' element={<ProtuctedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtuctedRoute> } />
      } 
                
       
      </Routes>

    </div>
      
{/*******************************Admin Routes ***************************************************/}
   
   <Routes>
   <Route path ='/admin/dashboard' element={<ProtuctedRoute isAdmin={true}><Dashboard /></ProtuctedRoute>} />
   <Route path ='/admin/products' element={<ProtuctedRoute isAdmin={true}><ProductList /></ProtuctedRoute>} />
   <Route path ='/admin/products/create' element={<ProtuctedRoute isAdmin={true}><NewProduct /></ProtuctedRoute>} />
   <Route path ='/admin/product/:id' element={<ProtuctedRoute isAdmin={true}><UpdateProduct/></ProtuctedRoute>} />
   <Route path ='/admin/orders' element={<ProtuctedRoute isAdmin={true}><OrderList/></ProtuctedRoute>} />
   <Route path ='/admin/order/:id' element={<ProtuctedRoute isAdmin={true}><UpdateOrder/></ProtuctedRoute>} />
   <Route path ='/admin/users' element={<ProtuctedRoute isAdmin={true}><UserList/></ProtuctedRoute>} />
   <Route path ='/admin/user/:id' element={<ProtuctedRoute isAdmin={true}><UpdateUser/></ProtuctedRoute>} />
   <Route path ='/admin/reviews' element={<ProtuctedRoute isAdmin={true}><ReviewList/></ProtuctedRoute>} />
   </Routes>
   
      
      <Footer />
      </HelmetProvider>

    </div>
    </Router>
   
  )
}

export default App
