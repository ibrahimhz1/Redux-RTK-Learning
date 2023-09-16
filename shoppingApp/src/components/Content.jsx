import React, { useEffect, useState } from 'react'

import ProductsList from '../features/products/ProductsList';
import ProductSingle from '../features/products/ProductSingle';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import CartPage from '../features/cart/CartPage';
import Login from './Login';
import Register from './Register'
import Orders from '../features/orders/Orders';

const Content = () => {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const userObj = localStorage.getItem('userId');
    const user = JSON.parse(userObj);
    if (user) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }, []);

  const onLoginSuccess = () => {
    setLoggedin(true);
  }

  const handleLogout = () => {
    setLoggedin(false);
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {loggedin ? (
          <Route index element={<ProductsList />} />
        ) : (
          <Route index element={<Login onLoginSuccess={onLoginSuccess} />} />
        )}

        <Route path='product'>
          <Route path=':id' element={<ProductSingle />} />
        </Route>
        <Route path='cart' element={<CartPage />} />
        <Route path='orders' element={<Orders />}/>
        <Route path='register' element={<Register />} />
      </Route>

    </Routes>
  )
}

export default Content;