import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartByUserId, updateItemAsync, deleteItemAsync, deleteAllItemAsync } from './cartSlice';
import { selectProductById } from '../products/productsSlice';
import { addOrderAsync } from '../orders/ordersSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.users.loggedinUser);
    const userObj = localStorage.getItem('userId');
    const user = JSON.parse(userObj);
    const cart = useSelector(state => selectCartByUserId(state, Number(user.id)));

    const ImgComp = ({ imgId }) => {
        const picObj = useSelector(state => selectProductById(state, imgId));
        return (
            <>
                {!picObj ? <h1>Loading..</h1> : (
                    <img src={picObj.thumbnail} alt='img_address' />
                )}
            </>
        )
    }

    const handleChange = (e, id) => {
        dispatch(updateItemAsync({ id, cartId: cart.id, itemUpdate: { quantity: +e.target.value } }));
    }

    const handleDelete = (id) => {
        dispatch(deleteItemAsync({ id, cartId: cart.id }));
    }

    const handleAddOrder = (cartId) => {
        dispatch(addOrderAsync({ userId: user.id, cartId: cartId }));
        dispatch(deleteAllItemAsync(cartId));
    }

    return (
        <>
            {!cart ? <h1>Loading...</h1> : (
                <div className='CartPage'>
                    <div className='left'>
                        <div className='shoppingCart'>
                            <div className="upper">
                                <h1>Shopping Cart</h1>
                                <span 
                                    style={{
                                    textDecoration: 'underline',
                                    color: 'tomato', 
                                    cursor: 'pointer'
                                    }}
                                    onClick={()=> dispatch(deleteAllItemAsync(cart.id))}
                                >Delete all items</span>
                            </div>

                            {cart.products.map((c) => (
                                <div className="middle" key={c.id}>
                                    <div className='prodImg'>
                                        <ImgComp imgId={c.id} />
                                    </div>
                                    <div className='productsDets'>
                                        <h3>{c.title}</h3>
                                        <span>₹{c.price}.00 X {c.quantity} = {c.discountedPrice}</span>
                                        <span>in stock</span>
                                        <span>Eligible for FREE Shipping</span>
                                        <span>Size: 8 UK</span>
                                        <span>Colour: WHITE GREY</span>
                                        <div className='controlsDiv'>
                                            <select value={c.quantity} onChange={(e) => handleChange(e, c.id)}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                            </select>
                                            <button onClick={() => handleDelete(c.id)}>Delete</button>
                                            <button>Save for later</button>
                                            <span>See more like this</span>
                                            <span>Share</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {cart.products.length != 0 ? (
                                <div className="lower">
                                    <button onClick={() => handleAddOrder(cart.id)}>Order Now</button>
                                    <h2>
                                        Subtotal {cart.totalProducts} item: {cart.discountedTotal}.00
                                    </h2>
                                </div>
                            ) : <h1>No Items in the cart</h1>}

                        </div>
                        <div className='yourItems'>
                        </div>
                    </div>

                    <div className='right'>

                    </div>
                </div>

            )}
        </>
    )
}

export default CartPage;