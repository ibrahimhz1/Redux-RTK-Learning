import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    status: null
};

const PRODUCTS_URL = `http://localhost:3344/products`;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(PRODUCTS_URL);
        return response.data;
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'idle',
                    state.error = action.payload;
            })
    }
});

export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, prodId) => {
    return state.products.products.find(product => {
        return product.id == prodId;
    })
}

export const { } = productsSlice.actions;
export default productsSlice.reducer;