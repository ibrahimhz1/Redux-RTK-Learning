import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += 1;
        },
        decrement: (state, action) => {
            if(state.count <= 0){
                state.count = 0;
            }else{
                state.count -= 1;
            }
        },
        incrementByNum: (state, action) => {
            state.count += action.payload;
        },
        decrementByNum: (state, action)=> {
            if(state.count >= action.payload){
                state.count -= action.payload;
            }else{
                state.count = state.count;
            }
        },
        resetCount: (state, action) => {
            state.count = 0;
        }
    }
});

export const { increment, decrement, incrementByNum, decrementByNum, resetCount } = counterSlice.actions;

export default counterSlice.reducer;