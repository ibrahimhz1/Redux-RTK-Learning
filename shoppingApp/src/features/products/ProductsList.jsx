import React from 'react'

import { useSelector } from 'react-redux'
import { selectAllProducts } from './productsSlice';

import ProductCard from './ProductCard';

const ProductsList = () => {
    const products = useSelector(selectAllProducts);
    return (
        <div className='productsList'>
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }

        </div>
    )
}

export default ProductsList