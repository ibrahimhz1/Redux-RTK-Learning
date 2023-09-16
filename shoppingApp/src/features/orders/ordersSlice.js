import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CARTS_URL } from "../cart/cartSlice";

const initialState = {
    orders: [],
    status: null
};

export const ORDERS_URL = `http://localhost:3344/orders`;

export const fetchOrders = createAsyncThunk(
    `orders/fetchOrders`,
    async () => {
        const response = await axios.get(ORDERS_URL);
        return response.data;
    }
)

export const addOrderAsync = createAsyncThunk(
    `orders/addOrder`,
    async ({ userId, cartId }) => {
        const response = await axios.get(`${ORDERS_URL}/${userId}`);
        const cartItem = await axios.get(`${CARTS_URL}/${cartId}`);

        let orderId;
        if(response.data.orders.length === 0){
            orderId = 101;
        }else{
            response.data.orders.forEach(order => {
                orderId = order.orderId;
            });
            orderId+=1;
        }

        // Initialize an empty orderedProducts array
        const orderedProducts = [];

        // Iterate through cart items and push them into orderedProducts
        cartItem.data.products.forEach(product => {
            orderedProducts.push({
                id: product.id,
                quantity: product.quantity,
                discountedTotal: product.discountedPrice,
            });
        });

        // create order object format
        const ordersObj = {
            orderId: orderId, // generate the orderId increment by one of the previous order's orderId
            orderedProducts: orderedProducts,
            totalProducts: cartItem.data.totalProducts,
            discountedTotal: cartItem.data.discountedTotal,
            shipment: {
                name: "ibrahim",
                address: "123, ABC Street, India",
                pincode: "605103",
                phoneNum: "1234567890",
                country: "India"
            },
            paymentMode: "Online",
            delivered: true
        }

        // add order object to order array
        response.data.orders.push(ordersObj);
        const res = await axios.put(`${ORDERS_URL}/${userId}`, response.data);
        return res.data;
    }
)

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders = action.payload;
            })
            .addCase(addOrderAsync.fulfilled, (state, action)=> {
                state.status = 'idle';
                const itemIndex = state.orders.findIndex(item => item.userId === action.payload.userId);
                state.orders[itemIndex] = action.payload;
            })

    }
})

export const selectOrdersByUser = (state, userId) => {
    return state.orders.orders.find((order)=> {
        return order.userId === userId
    })
}

export const { } = ordersSlice.actions;
export default ordersSlice.reducer;