// src/components/CartComponent.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const CartComponent = () => {
  const { cart, addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (item) => {
    addToCart(item, quantity);
  };

  return (
    <div className="cart-component">
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <p>{item.name}</p>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
          />
          <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default CartComponent;
