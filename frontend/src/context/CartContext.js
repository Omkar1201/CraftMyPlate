// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [isLoggedIn, setisLoggedin] = useState(false);
	const [menuItems, setMenuItems] = useState([]);
	const [orders, setOrders] =useState([])
	useEffect(() => {
		const authenticate = async () => {
			const token = localStorage.getItem('authToken')
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BASE_URL}/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.data.success) {
					setisLoggedin(true);
				}
			}
			catch (err) {
				console.log("Error occured while login");
			}
		}

		const fetchOrders = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order`,
					{ headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
				);
				if (response.data.success) {
					setOrders(response.data.userOrders);
				} else {
					toast.warn(response.data.message)
				}
			} catch (error) {
				toast.error("Error fetching orders:", error.message);
			}
		};
		authenticate();
		fetchOrders();
	}, [])

	return (
		<CartContext.Provider value={
			{
				isLoggedIn, setisLoggedin, cart, setCart, menuItems, setMenuItems,orders, setOrders
			}
		}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
