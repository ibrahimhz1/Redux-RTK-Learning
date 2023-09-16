import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, selectCartByUserId } from './cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = ({ product }) => { 
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(state => state.users.loggedinUser);
  const userObj = localStorage.getItem('userId');
  const user = JSON.parse(userObj);
  
  const cart = useSelector(state => selectCartByUserId(state, user.id));
  // console.log(cartId);

  const totalPrice = product.price * quantity;
  const discountedPrice = Math.floor(totalPrice - ((totalPrice*product.discountPercentage)/100));

  const addToCartHandler = () => {
    dispatch(addProductToCart({cartId: cart.id, product: {id: product.id,
    title: product.title,
    price: product.price,
    quantity: quantity,
    total: (product.price*quantity),
    discountPercentage: product.discountPercentage,
    discountedPrice: discountedPrice }}));
    navigate('/cart');
  };

  return (
    <div className='Cart'>
      <span className='price'> <span className='rupee'>₹</span>{discountedPrice}</span>
      <div className='deliveryDets'>
        FREE delivery Tomorrow, 1 September. Order within 9 hrs 13 mins. Details
      </div>
      <div className='signInStatus'>
        <i className="ri-map-pin-line"></i>
        <span>Sign in to update your location</span>
      </div>
      <div className='stockDets'>
        <span>In stock</span>
        <p>Sold by Cocoblu Retail and Fulfilled by Amazon.</p>
      </div>
      <div className='quantityAndBuy'>
        <div className='quantity'>
          <span>Quantity: </span>
          <select onChange={(e)=> setQuantity(e.target.value)} value={quantity}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <button className='addtocart' onClick={addToCartHandler}>Add to Cart</button>
        <button className='buynow'>Buy Now</button>
        <span> <i className="ri-git-repository-private-fill"></i> Secure Transaction</span>
        <button className='wishlight-btn'>Add to Wish List</button>
      </div>
    </div>
  )
}

export default Cart;