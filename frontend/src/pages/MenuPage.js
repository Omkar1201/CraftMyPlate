// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuPage = () => {
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		const fetchMenuItems = async () => {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/menu`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			setMenuItems(response.data.allMenuItems);
		};
		fetchMenuItems();
	}, []);

	return (
		<div className="container mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-6 text-center">Menu</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{menuItems.map((item) => (
					<div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold">{item.name}</h3>
						<p className="text-gray-500">{item.category}</p>
						<p className="text-gray-700 mt-2">${item.price}</p>
						<button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default MenuPage;
