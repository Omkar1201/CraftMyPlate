// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [menuItems, setMenuItems] = useState([]);
	const [orders, setOrders] = useState([]);

	const fetchMenuItems = async () => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/menu`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setMenuItems(response.data.allMenuItems);
		}
		catch (err) {
			toast.error(err.response.data.message)
		}
	};

	const fetchOrders = async () => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setOrders(response.data.userOrders.reverse());
		}
		catch (err) {
			toast.error(err.response.data.message);
		}
	};

	const authenticate = async () => {
		const token = localStorage.getItem('authToken');
		try {
			await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setisLoggedIn(true);
			fetchOrders();
		}
		catch (err) {
			toast.warn(err.response.data.message);
		}
	};

	useEffect(() => {
		authenticate();
		fetchMenuItems()
		// eslint-disable-next-line
	}, []);

	return (
		<CartContext.Provider
			value={{
				isLoggedIn,
				setisLoggedIn,
				cart,
				setCart,
				menuItems,
				setMenuItems,
				orders,
				setOrders,
				fetchOrders,
				fetchMenuItems
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
