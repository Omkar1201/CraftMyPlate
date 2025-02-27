import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const MenuPage = () => {
	const { cart, setCart, menuItems, setMenuItems, fetchMenuItems, tempmenuItems, setTempMenuItems, isLoading, setIsLoading } = useContext(CartContext);
	const [formData, setFormData] = useState({ name: '', category: '', price: '' });
	const [editingItemId, setEditingItemId] = useState(null);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const handleChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true)
		const token = localStorage.getItem('authToken');
		if (editingItemId) {
			try {
				await axios.put(
					`${process.env.REACT_APP_BASE_URL}/menu/${editingItemId}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}
			catch (err) {
				toast.error(err.response.data.message)
			}
		}
		else {
			try {
				await axios.post(`${process.env.REACT_APP_BASE_URL}/menu`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			}
			catch (err) {
				toast.error(err.response.data.message)
			}
		}
		setEditingItemId(null);
		setFormData({ name: '', category: '', price: '' });
		fetchMenuItems();
		setIsFormVisible(false);
		setIsLoading(false);
	};

	const handleEdit = (item) => {
		setEditingItemId(item._id);
		setFormData({ name: item.name, category: item.category, price: item.price });
		setIsFormVisible(true);
	};

	const handleDelete = async (id) => {
		setIsLoading(true)
		const token = localStorage.getItem('authToken');
		try {
			await axios.delete(`${process.env.REACT_APP_BASE_URL}/menu/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setMenuItems(menuItems.filter((item) => item._id !== id));
			setTempMenuItems(menuItems.filter((item) => item._id !== id));
		}
		catch (err) {
			toast.error(err.response.data.message)
		}
		setIsLoading(false)
	};

	const addToCart = (item, quantity) => {
		const newCartItem = { menuItemId: item._id, quantity: parseInt(quantity) };

		const existingItemIndex = cart.findIndex(cartItem => cartItem.menuItemId === item._id);

		if (existingItemIndex !== -1) {
			const updatedCart = [...cart];
			updatedCart[existingItemIndex].quantity += newCartItem.quantity;
			setCart(updatedCart);
		} else {
			setCart([...cart, newCartItem]);
		}
		toast.success(`${item.name} added to cart`)
	};
	useEffect(() => {
		if (selectedOption === 'Low to High') {
			setTempMenuItems(prevItems => [...prevItems].sort((a, b) => a.price - b.price));
		} else if (selectedOption === 'High to Low') {
			setTempMenuItems(prevItems => [...prevItems].sort((a, b) => b.price - a.price));
		} else {
			setTempMenuItems(menuItems)
		}
		// eslint-disable-next-line 
	}, [selectedOption]);
	return (
		<div className="container mx-auto p-6">
			<h2 className="text-3xl font-semibold text-center">Menu Management</h2>
			{
				isLoading ? (<Loading />) : (
					<>
						<div className='flex justify-end mt-4'>
							<select id="dropdown" value={selectedOption} onChange={handleChange} className='outline-none border px-1 py-[0.4rem] border-gray-200 bg-gray-100 rounded-md'>
								<option value="">Sort by</option>
								<option value="Low to High">Price: Low to High</option>
								<option value="High to Low">Price: High to Low</option>
							</select>
						</div>
						<div
							className={`transition-all duration-500 my-4 ease-in-out ${isFormVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} bg-gray-100 rounded-lg shadow-lg mb-6`}>
							{isFormVisible && (
								<form onSubmit={handleSubmit}>
									<h3 className="text-xl font-semibold mb-4">{editingItemId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											placeholder="Name"
											className="p-2 border rounded w-full"
											required
										/>
										<select
											name="category"
											value={formData.category}
											onChange={handleInputChange}
											className="p-2 border rounded w-full"
											required
										>
											<option value="">Select Category</option>
											<option value="Appetizers">Appetizers</option>
											<option value="Main Course">Main Course</option>
											<option value="Desserts">Desserts</option>
										</select>
										<input
											type="number"
											name="price"
											value={formData.price}
											onChange={handleInputChange}
											placeholder="Price"
											className="p-2 border rounded w-full"
											required
										/>
									</div>
									<button
										type="submit"
										className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
										{editingItemId ? 'Update Item' : 'Add Item'}
									</button>
								</form>
							)}
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
							{tempmenuItems.map((item) => (
								<div key={item._id} className="bg-white p-4 rounded-lg border shadow-md">
									<div className='flex justify-between'>
										<div>
											<h3 className="text-xl font-semibold">{item.name}</h3>
											<p className="text-gray-500">Category: {item.category}</p>
											<p className="text-gray-700 mt-2">Price: &#8377;{item.price}</p>
										</div>
										<div>
											{item.availability ? <span className=' text-green-700 font-semibold bg-green-100 rounded-2xl py-[0.2rem] px-2'>Available</span> : <span className=' text-red-700 font-semibold bg-red-100 rounded-2xl py-[0.2rem] px-2'>Unavailable</span>}
										</div>
									</div>
									<div className='mt-4 text-gray-700 '>Quantity: </div>
									<div className=" flex justify-between">
										<div>
											<input
												type="number"
												className="border rounded-sm outline-none pl-1 w-[3rem]"
												defaultValue={1}
												min="1"
												id={`quantity-${item._id}`}
												onChange={(e) => {
													if (e.target.value < 1) {
														e.target.value = 1
													}
												}}
											/>
										</div>
										<button
											onClick={() => {
												const quantity = document.getElementById(`quantity-${item._id}`).value;
												addToCart(item, quantity);
											}}
											className="bg-blue-500 active:bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" disabled={!item.availability}>
											Add to Cart
										</button>
									</div>

									<div className="mt-4 flex justify-between">
										<button
											onClick={() => handleEdit(item)}
											className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
											Edit
										</button>
										<button
											onClick={() => handleDelete(item._id)}
											className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
											Delete
										</button>
									</div>
								</div>
							))}
						</div>

						<button
							onClick={() => setIsFormVisible(!isFormVisible)}
							className="fixed bottom-4 right-4 bg-blue-500 text-white text-3xl rounded-full w-12 h-12 pb-1 flex items-center justify-center hover:bg-blue-600 shadow-lg transition-transform transform duration-500 ease-in-out hover:scale-110" title='Add New Item'>
							{isFormVisible ? '-' : '+'}
						</button>
					</>
				)
			}
		</div>
	);
};

export default MenuPage;
