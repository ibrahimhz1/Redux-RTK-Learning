import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    amount: 10,
};

export const fetchUserById = createAsyncThunk(
    'account/getUser',
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`http://localhost:3344/accounts/${userId}`);
        return data.amount;
    }
);

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.amount += 1;
        },
        decrement: (state, action) => {
            state.amount -= 1;
        },
        incrementByAmount: (state, action) => {
            state.amount += action.payload.value;
        },
        decrementByAmount: (state, action) => {
            if (action.payload <= state.amount) {
                state.amount -= action.payload;
            } else {
                state.amount;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.amount = action.payload;
            state.pending = false;
        })
            .addCase(fetchUserById.pending, (state, action) => {
                state.pending = true;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.error;
                state.pending = false;
            })
    }
});

export const { increment, decrement, incrementByAmount, decrementByAmount } = accountSlice.actions;

export default accountSlice.reducer;
