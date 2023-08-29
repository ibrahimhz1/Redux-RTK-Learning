import { createReducer, createAction } from "@reduxjs/toolkit";

export const increment = createAction('reward/increment');

const initialState = {
    points : 40,
};

const rewardReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(increment, (state, action) => {
            state.points++;
        })
});

export default rewardReducer;