import React from 'react'
import { Link } from 'react-router-dom';
import Circles from '../../components/Circles'
import Rating from '../../components/Rating'

const ProductCard = ({ product }) => {
  return (
    <div className='productCard'>
      <div className='productImg'>
        <Link to={`/product/${product.id}`}>
          <img src={product.thumbnail} alt="" />
        </Link>
      </div>
      <div className='chooseColor'>
        <Circles />
      </div>
      <div className='title'>{product.title}</div>
      <div className='description'>{product.description.slice(0, 50)}...</div>
      <Rating rating={product.rating} />
      <div className='usersBuyCount'>300+ bought in past month</div>
      <div className='dealoftheday'>Deal of the Day</div>
      <div className='price'>{product.price} M.R.P: <span style={{ textDecoration: 'line-through' }}>999</span> (46% off) </div>
      <div className='deliveryMode'>Free Delivery by Amazon</div>
    </div>
  )
}

export default ProductCard;