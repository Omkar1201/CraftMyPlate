import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";

const CartComponent = () => {
	const { cart, menuItems, setCart } = useContext(CartContext);

	const handleRemove = (menuItemId) => {
		const updatedCart = cart.filter(item => item.menuItemId !== menuItemId);
		setCart(updatedCart);
	};

	const handleDecreaseQuantity = (menuItemId) => {
		const updatedCart = cart.map(item => {
			if (item.menuItemId === menuItemId && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		setCart(updatedCart);
	};

	const handleIncreaseQuantity = (menuItemId) => {
		const updatedCart = cart.map(item => {
			if (item.menuItemId === menuItemId) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCart(updatedCart);
	};

	return (
		<div className="cart-component m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{cart.length > 0 ? (
				cart.map((item, index) => {
					const menuItem = menuItems.find(menu => menu._id === item.menuItemId);

					return (
						<div key={index} className="cart-item bg-white p-4 rounded-lg border shadow-md">
							{menuItem ? (
								<>
									<div className='flex justify-between'>
										<div>
											<h4 className="text-xl font-semibold">{menuItem.name}</h4>
											<p className="text-gray-700 mt-2">Price: &#8377;{menuItem.price}</p>
											<p className="text-gray-500">Category: {menuItem.category}</p>
										</div>
										<button
											onClick={() => handleRemove(item.menuItemId)}
											className="text-[1.4rem] h-fit text-black rounded-full hover:bg-red-500 active:bg-red-600"
										>
											<div className='m-2'>
												<MdOutlineDelete />
											</div>
										</button>
									</div>
									<div className="mt-4 text-gray-700">
										<span>Quantity:</span>
										<div className="flex items-center border gap-5 rounded-xl w-fit mt-2">
											{/* Decrease Quantity Button */}
											<button
												onClick={() => handleDecreaseQuantity(item.menuItemId)}
												className="hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-l-xl">
												<FaMinus />
											</button>
											<span className="">{item.quantity}</span>
											<button
												onClick={() => handleIncreaseQuantity(item.menuItemId)}
												className="hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-r-xl">
												<FaPlus />
											</button>
										</div>
										<div className='text-end'>
											Amount: &#8377; {menuItem.price * item.quantity}
										</div>
									</div>
								</>
							) : (
								<p>Menu item not found</p>
							)}
						</div>
					);
				}
				)
			) : (
				<div className='text-[2rem] font-semibold'>Your Cart is empty</div>
			)
			}

		</div>
	);
};

export default CartComponent;
