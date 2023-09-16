import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './app/store.js'
import { Provider } from 'react-redux'

import { fetchProducts } from './features/products/productsSlice.js'
import { fetchUsers } from './features/users/usersSlice.js'
import { fetchCarts } from './features/cart/cartSlice.js'
import { fetchOrders } from './features/orders/ordersSlice.js'

store.dispatch(fetchProducts());
store.dispatch(fetchUsers());
store.dispatch(fetchCarts());
store.dispatch(fetchOrders());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);


