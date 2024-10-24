// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import CustomerHome from './pages/CustomerHome';
import ServiceProvierHome from './pages/ServiceProvierHome';
import './App.css';
import List from './pages/List';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homepage';
import Contact from './pages/ContactUs';
import FrontPage from './pages/FrontPage';

const App = () => {
  const isLoggedIn = false; // Replace with actual login check

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {!isLoggedIn && <Route path='/' element={<FrontPage />} />} {/* Show FrontPage if not logged in */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/customerhome' element={<CustomerHome />} />
        <Route path='/sphome' element={<ServiceProvierHome />} />
        <Route path='/customer/list/:service' element={<List />} />
        <Route path='/customer/profile/:userId' element={<Profile />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Contact" element={<Contact />} />
        
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
