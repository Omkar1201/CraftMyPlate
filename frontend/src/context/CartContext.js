// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoggedIn, setisLoggedin] = useState(false);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotalAmount(storedCart);
  }, []);

  const addToCart = (item, quantity) => {
    const newCart = [...cart, { ...item, quantity }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    calculateTotalAmount(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    setTotalAmount(0);
  };

  const calculateTotalAmount = (cart) => {
    const amount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(amount);
  };

  return (
    <CartContext.Provider value={
      {
        cart, addToCart, totalAmount, clearCart,
        isLoggedIn,setisLoggedin
      }
    }>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
