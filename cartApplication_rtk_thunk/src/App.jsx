import React, { useState } from 'react'
import Products from './features/products/Products'
import Cart from './features/cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsync } from './features/cart/cartSlice';

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const items = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchAsync());
  }, [])

  return (
    <div id='main'>
      <button onClick={() => setShowCart(!showCart)}>Cart [ {items.length} ] </button>
      {
        showCart ? <Cart /> : <Products />
      }
    </div>
  )
}

export default App;