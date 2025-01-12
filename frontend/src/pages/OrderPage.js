import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const OrderHistory = () => {
	const { orders } = useContext(CartContext);
	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order History</h2>
				{orders.length === 0 ? (
					<p className="text-center text-gray-600">No orders found!</p>
				) : (
					<div className="space-y-6">
						{orders.map(order => (
							<div
								key={order._id}
								className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
							>
								<div className="flex justify-between items-center mb-4">
									<h4 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h4>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Pending"
												? "bg-yellow-100 text-yellow-700"
												: "bg-green-100 text-green-700"
											}`}
									>
										{order.status}
									</span>
								</div>
								<p className="text-sm text-gray-600 mb-2">
									Ordered On: {new Date(order.createdAt).toLocaleString()}
								</p>
								<p className="text-sm text-gray-600 mb-4">Total Amount: ₹{order.totalAmount}</p>
								<h5 className="font-semibold text-gray-800 mb-2">Items:</h5>
								<ul className="space-y-2">
									{order.items.map(item => (
										<li
											key={item.menuItemId._id}
											className="bg-white p-3 border border-gray-200 rounded-lg"
										>
											<div className="flex justify-between">
												<span className="font-medium text-gray-800">{item.menuItemId.name}</span>
												<span className="text-sm text-gray-600">₹{item.menuItemId.price}</span>
											</div>
											<p className="text-sm text-gray-500">
												Category: {item.menuItemId.category}
											</p>
											<p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderHistory;
