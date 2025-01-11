// src/pages/OrderPage.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const OrderPage = () => {
	const { cart, totalAmount, clearCart } = useContext(CartContext);
	const [orderSuccess, setOrderSuccess] = useState(null);

	const handlePlaceOrder = async () => {
		const token = localStorage.getItem('authToken');
		try {
			await axios.post(`${process.env.REACT_APP_BASE_URL}/order`, { items: cart }, {
				headers: { Authorization: `Bearer ${token}` }
			});
			setOrderSuccess(true);
			clearCart();
		} catch (err) {
			setOrderSuccess(false);
		}
	};

	return (
		<div className="order-page">
			<h2>Your Cart</h2>
			{cart.map(item => (
				<div key={item._id} className="order-item">
					<p>{item.name}</p>
					<p>Quantity: {item.quantity}</p>
					<p>Price: ${item.price}</p>
				</div>
			))}
			<h3>Total: ${totalAmount}</h3>
			<button onClick={handlePlaceOrder}>Place Order</button>
			{orderSuccess && <div className="success">Order placed successfully!</div>}
			{!orderSuccess && <div className="error">Error placing order.</div>}
		</div>
	);
};

export default OrderPage;
