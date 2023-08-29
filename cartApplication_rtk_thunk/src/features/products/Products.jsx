import React, { useEffect } from 'react'
import { fetchAsync } from './productsSlice'

import './products.css';
import { useDispatch, useSelector } from 'react-redux';

import { addItemAsync } from '../cart/cartSlice'

const Products = () => {
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchAsync())
  },[]);

  return (
    <div id='main'>
      {
        products.map(product => (
          <div className="card">
            <img src={product.thumbnail} alt={product.title} style={{ width: "200px", height: '300px' }} />
            <h1>{product.title}</h1>
            <p className="price">{`Rs.${product.price}`}</p>
            <p>{product.description}</p>
            <p><button onClick={() => { dispatch(addItemAsync(product)) }}>Add to Cart</button></p>
          </div>
        ))
      }
    </div>
  )
}

export default Products