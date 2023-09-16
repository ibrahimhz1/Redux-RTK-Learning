import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    carts: [],
    status: null
};

export const CARTS_URL = `http://localhost:3344/carts`;

export const fetchCarts = createAsyncThunk(
    'carts/fetchCarts',
    async () => {
        const response = await axios.get(CARTS_URL);
        return response.data;
    }
)

export const addProductToCart = createAsyncThunk(
    `carts/addProductToCart`,
    async ({ cartId, product }) => {
        // Get cart and add product init
        const cartItem = await axios.get(`${CARTS_URL}/${cartId}`);
        cartItem.data.products = [...cartItem.data.products, product];
        
        // updating total and discounted total of the cart
        let totalcost = 0;
        let discountTotal = 0;
        let totalProductCount = 0;
        let totalQuantityCount = 0;
        cartItem.data.products.forEach(product => {
            totalcost += product.price * product.quantity;
            discountTotal += product.discountedPrice;
            totalQuantityCount += product.quantity;
            totalProductCount+=1;
        });
        cartItem.data.total = totalcost;
        cartItem.data.discountedTotal = discountTotal;
        cartItem.data.totalQuantity = totalQuantityCount;
        cartItem.data.totalProducts = totalProductCount;

        // API update request
        const response = await axios.put(`${CARTS_URL}/${cartId}`, cartItem.data);
        
        return response.data;
    }
)

export const updateItemAsync = createAsyncThunk(
    `carts/updateItem`,
    async ({ id, cartId, itemUpdate }) => {
        const cartItem = await axios.get(`${CARTS_URL}/${cartId}`);
        const index = cartItem.data.products.findIndex(item => item.id === id);
        const obj = cartItem.data.products[index];
        obj.quantity = itemUpdate.quantity;
        obj.total = obj.price * itemUpdate.quantity;
        obj.discountedPrice = Math.floor(obj.total - ((obj.total*obj.discountPercentage)/100));
        cartItem.data.products.splice(index, 1, obj);
        
        // updating total and discounted total of the cart
        let totalcost = 0;
        let discountTotal = 0;
        let totalProductCount = 0;
        let totalQuantityCount = 0;
        cartItem.data.products.forEach(product => {
            totalcost += product.price * product.quantity;
            discountTotal += product.discountedPrice; 
            totalQuantityCount += product.quantity;
            totalProductCount+=1;   
        });
        cartItem.data.total = totalcost;
        cartItem.data.discountedTotal = discountTotal;
        cartItem.data.totalQuantity = totalQuantityCount;
        cartItem.data.totalProducts = totalProductCount;

        // console.log(cartItem.data);
        const response = await axios.put(`${CARTS_URL}/${cartId}`, cartItem.data);
        return response.data;
    }
)

export const deleteItemAsync = createAsyncThunk(
    `carts/deleteItem`,
    async({id, cartId})=> {
        const cartItem = await axios.get(`${CARTS_URL}/${cartId}`);
        const index = cartItem.data.products.findIndex(item => item.id === id);
        cartItem.data.products.splice(index, 1);
        
        // updating total and discounted total of the cart
        let totalcost = 0;
        let discountTotal = 0;
        let totalProductCount = 0;
        let totalQuantityCount = 0;
        cartItem.data.products.forEach(product => {
            totalcost += product.price * product.quantity;
            discountTotal += product.discountedPrice; 
            totalQuantityCount += product.quantity;
            totalProductCount+=1;   
        });
        cartItem.data.total = totalcost;
        cartItem.data.discountedTotal = discountTotal;
        cartItem.data.totalQuantity = totalQuantityCount;
        cartItem.data.totalProducts = totalProductCount;

        const response = await axios.put(`${CARTS_URL}/${cartId}`, cartItem.data);
        return response.data;
    }
)

export const deleteAllItemAsync = createAsyncThunk(
    `carts/deleteAllItem`,
    async(cartId)=> {
        const cartItem = await axios.get(`${CARTS_URL}/${cartId}`);
        cartItem.data.products = [];
        
        const response = await axios.put(`${CARTS_URL}/${cartId}`, cartItem.data);
        return response.data;
    }
)

export const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarts.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.carts = action.payload;
            })
            .addCase(fetchCarts.rejected, (state, action) => {
                state.status = 'idle',
                    state.error = action.payload;
            })
            .addCase(addProductToCart.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = 'idle';
                const itemIndex = state.carts.findIndex(item => item.id === action.payload.id);
                state.carts[itemIndex] = action.payload;
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.carts.findIndex(item => item.id === action.payload.id);
                state.carts.splice(index, 1, action.payload);
            }) 
            .addCase(deleteItemAsync.fulfilled, (state, action)=> {
                state.status = 'idle';
                const index = state.carts.findIndex(item => item.id === action.payload.id);
                state.carts.splice(index, 1, action.payload);
            })
            .addCase(deleteAllItemAsync.fulfilled, (state, action)=> {
                state.status = 'idle';
                const index = state.carts.findIndex(item => item.id === action.payload.id);
                state.carts[index].products = [];
            })
    }
});

export const selectAllCarts = (state) => state.carts.carts;
export const selectCartByUserId = (state, userId) => {
    return state.carts.carts.find((cart) => {
        return cart.userId === userId;
    })
}

export const { } = cartSlice.actions;
export default cartSlice.reducer;