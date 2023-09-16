import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/productsSlice";
import usersReducer from "../features/users/usersSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/ordersSlice"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        carts: cartReducer,
        orders: orderReducer
    }
});

