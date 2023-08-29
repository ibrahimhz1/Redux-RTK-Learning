import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './slices/accountSlice.js'
import bonusReducer from './slices/bonusSlice.js';
import rewardReducer from './reducers/reward.js'
import { adminAPI } from './api/AdminSlice.js'


const store = configureStore({
  reducer: {
    account: accountReducer,
    bonus: bonusReducer,
    reward: rewardReducer,
    [adminAPI.reducerPath]: adminAPI.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(adminAPI.middleware)
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
