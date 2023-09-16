import React from 'react'
import { useSelector } from 'react-redux';
import { selectProductById } from './productsSlice';
import { useParams } from 'react-router-dom';

import Cart from '../cart/Cart'
import Rating from '../../components/Rating'


const ProductSingle = () => {
    const { id } = useParams();
    const product = useSelector(state => selectProductById(state, id));

    const discountedPrice = Math.floor(product.price - ((product.price*product.discountPercentage)/100));
    
    return (
        <>
            {!product ? (<h1>Loading</h1>) : (
                <div className='ProductSingle'>
                    <div className='previewOptions'>
                        <img src={product.images[0]} alt="image" />
                        <img src={product.images[1]} alt="image" />
                        <img src={product.images[2]} alt="image" />
                        <img src={product.images[3]} alt="image" />
                        <img src={product.images[4]} alt="image" />
                    </div>
                    <div className='preview'>
                        <img src={product.thumbnail} alt="productThumbnail" />
                    </div>
                    <div className='details'>
                        <div className='upper'>
                            <span>Visit the {product.brand} store</span>
                            <h2>{product.title} - {product.description}</h2>
                            <Rating rating={product.rating} />
                        </div>
                        <div className='middle'>
                            <div className='priceDiv'>
                                <span className='offerPer'>{`-${Math.floor(product.discountPercentage)}%`}</span>
                                <span className='price'> <span className='rupee'>₹</span>{discountedPrice}</span>
                            </div>
                            <div className='mrpDiv'>
                                <span>M.R.P : </span>
                                <span>{product.price}</span>
                            </div>
                            <span>Inclusive of all Taxes</span>
                        </div>
                        <div className='lower'>
                            <span>Offers</span>
                            <div className='offersDiv'>
                                <div>No Cost EMI
                                    Avail No Cost EMI on select cards for orders above ₹3000Avail No Cost EMI on select cards for orders above ₹3000
                                    1 offer</div>
                                <div>Bank Offer
                                    Upto ₹1,000.00 discount on select Credit Cards, Kotak Debit CardsUpto ₹1,000.00 discount on select Credit Cards, Kota…
                                    11 offers</div>
                            </div>
                        </div>
                        <div className='deliveryDetails'>
                            <div><i className="ri-truck-line"></i><span>Free Delivery</span></div>
                            <div><i className="ri-money-dollar-box-line"></i><span>Pay on Delivery</span></div>
                            <div><i className="ri-text-wrap"></i><span>10 days Return & Exchange</span></div>
                        </div>
                    </div>
                    <Cart product={product} />
                </div>
            )}
        </>
    )
}

export default ProductSingle;