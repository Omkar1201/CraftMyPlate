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

	// Function to fetch orders from the server
	const fetchOrders = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			toast.error('No token found. Please log in.');
			return;
		}

		try {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (response.data.success) {
				setOrders(response.data.userOrders.reverse());
			} else {
				toast.warn(response.data.message);
			}
		} catch (error) {
			toast.error('Error fetching orders:', error);
		}
	};

	// Function to authenticate the user
	const authenticate = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			toast.error('No token found. Please log in.');
			return;
		}

		try {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (response.data.success) {
				setisLoggedIn(true);
				fetchOrders();
			} else {
				toast.warn('Please Login');
			}
		} catch (err) {
			toast.error('Error occurred while logging in');
		}
	};

	useEffect(() => {
		authenticate();
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
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
