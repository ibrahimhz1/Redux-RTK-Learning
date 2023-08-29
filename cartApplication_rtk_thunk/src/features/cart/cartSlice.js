import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchItems, addItem, updateItem, deleteItem } from './cartAPI'

const initialState = {
    items: [],
    status: 'idle'
}

export const fetchAsync = createAsyncThunk(
    'cart/fetchItems',
    async () => {
        const response = await fetchItems();
        return response.data;
    }
);

export const addItemAsync = createAsyncThunk(
    'cart/addItems',
    async (item) => {
        const {id, title, description, thumbnail, price} = item;
        const response = await addItem({id, title, description, thumbnail, price, quantity: 1});
        return response.data;
    }
);

export const deleteItemAsync = createAsyncThunk(
    'cart/deleteItem',
    async (id) => {
        await deleteItem(id);
        return id;
    }
);

export const updateItemAsync = createAsyncThunk(
    'cart/updateItem',
    async ({id, change}) => {
        const response = await updateItem(id, change);
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchAsync.rejected, (state, action) => {
                state.status = 'idle'
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload)
            })
            .addCase(deleteItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload);
                state.items.splice(index, 1);
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items.splice(index, 1, action.payload);
            })
    }
});

export const { } = cartSlice.actions;
export default cartSlice.reducer;