import { createSlice, createAction } from "@reduxjs/toolkit";

const incrementByAmount = createAction('account/incrementByAmount');

const initialState = {
    points: 0,
}

const bonusSlice = createSlice({
    name: 'bonus',
    initialState,
    reducers: {
        increment: (state,action) => {
            state.points+=1;
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(incrementByAmount, (state, action)=> {
            if((action.payload.value >= 100) && (action.payload.reward >= 50)){
                state.points+=1;
            }else{
                state.points;
            }
        })
    }
});

export const {increment} = bonusSlice.actions;
export default bonusSlice.reducer;
