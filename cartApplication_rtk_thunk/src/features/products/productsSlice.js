import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from './productsAPI'

const initialState = {
    products: [],
    status: 'idle'
}

export const fetchAsync = createAsyncThunk(
    'products/fetchProduct',
    async () => {
        const response = await fetchProducts();
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
            .addCase(fetchAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAsync.fulfilled, (state, action) => {
                state.status = 'idle',
                state.products = action.payload;
            })
            .addCase(fetchAsync.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
});

export const { } = productsSlice.actions;
export default productsSlice.reducer;