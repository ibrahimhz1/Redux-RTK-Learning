import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [
        { id: '0', name: 'ibrahim' },
        { id: '1', name: 'mohammed' },
    ],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
});

export const selectAllUsers = (state) => state.users.users;
export const { } = usersSlice.actions;
export default usersSlice.reducer;