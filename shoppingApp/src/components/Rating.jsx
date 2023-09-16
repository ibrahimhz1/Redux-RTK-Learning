import React from 'react'
import Stars from './Stars'

const Rating = ({ rating }) => {
    return (
        <div className='rating'>{rating} <Stars /> </div>
    )
}

export default Rating