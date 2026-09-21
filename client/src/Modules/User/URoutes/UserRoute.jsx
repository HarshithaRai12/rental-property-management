import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BrowseProperty from '../UComponents/BrowseProperty'
import UserRegister from '../UComponents/UserRegister'
import UserLogin from '../UComponents/UserLogin'
import Home from "../UComponents/Home";
import MyRequests from "../UComponents/MyRequests";
import About from "../UComponents/About";
import FAQ from "../UComponents/FAQ";
import PropertyDetails from "../UComponents/PropertyDetails";
import MyProfile from "../UComponents/MyProfile";
import MyHouse from "../UComponents/MyHouse";
import Payment from "../UComponents/Payment";
import Receipt from "../UComponents/Receipt";
import PaymentHistory from "../UComponents/PaymentHistory";


export default function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<BrowseProperty />} />
      <Route path="/userregister" element={<UserRegister />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/myrequests" element={<MyRequests />} />
      
      <Route path="/about" element={<About />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/myhouse" element={<MyHouse />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/paymenthistory" element={<PaymentHistory />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  )
}