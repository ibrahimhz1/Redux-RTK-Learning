import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectOrdersByUser } from './ordersSlice';
import { selectProductById } from '../products/productsSlice';



const Orders = () => {
  const dispatch = useDispatch();
  const userObj = localStorage.getItem('userId');
  const user = JSON.parse(userObj);
  const orderDets = useSelector(state => selectOrdersByUser(state, Number(user.id)));
  console.log(orderDets);


  const ProductDetails = ({id}) => {
    const product = useSelector(state => selectProductById(state, id));
    console.log(product);
    return(
      <>
        {!product ? <h1>Loading...</h1> : (
          <li>{product.title}</li>
        ) }
      </>
    )    
  }
  
  

  if (!orderDets) {
    return (
      <div className='orders'>
        <div className='container'>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='orders'>
      <div className='container'>
        {
          orderDets.orders.map((order) => (
            <div className='ordersContainer' key={order.orderId}>
              <h4>Order Id : #{order.orderId}</h4>
              <h4>Products</h4>
              <ol>
                {order.orderedProducts.map((o) => (
                  <ProductDetails key={o.id} id={o.id} />
                ))}
              </ol>
              <h4>price : {order.discountedTotal}</h4>
              <h4>Delivered</h4>
              <h4>Address : {order.shipment.address}</h4>
            </div>
          ))}

      </div>
    </div>
  )
}

export default Orders;