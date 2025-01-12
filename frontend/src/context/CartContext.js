// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [isLoggedIn, setisLoggedin] = useState(false);
	const [menuItems, setMenuItems] = useState([]);
	
	useEffect(() => {
		const authenticate = async () => {
			const token = localStorage.getItem('authToken')
			try {
				const response=await axios.get(
					`${process.env.REACT_APP_BASE_URL}/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);				
				if(response.data.success)
				{
					setisLoggedin(true);
				}
			}
			catch (err) {
				console.log("Error occured while login");
			}
		}
		authenticate()
	}, [])

	// const addToCart = (item, quantity) => {
	// 	const newCart = [...cart, { ...item, quantity }];
	// 	setCart(newCart);
	// 	localStorage.setItem('cart', JSON.stringify(newCart));
	// 	calculateTotalAmount(newCart);
	// };

	// const clearCart = () => {
	// 	setCart([]);
	// 	localStorage.setItem('cart', JSON.stringify([]));
	// 	setTotalAmount(0);
	// };

	// const calculateTotalAmount = (cart) => {
	// 	const amount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
	// 	setTotalAmount(amount);
	// };

	return (
		<CartContext.Provider value={
			{
				isLoggedIn, setisLoggedin,cart,setCart,menuItems, setMenuItems
			}
		}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
