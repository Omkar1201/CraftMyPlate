// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import './App.css'
import CartComponent from './components/CartComponent';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartComponent />} />

        {/* Add other routes here */}
      </Routes>
    </div>
  );
};

export default App;
