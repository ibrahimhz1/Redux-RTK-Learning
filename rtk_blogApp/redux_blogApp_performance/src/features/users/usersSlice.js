import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users: []
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async()=> {
        const response = await axios.get(USERS_URL);
        return response.data;
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(fetchUsers.fulfilled, (state, action)=> {
                state.users = action.payload;
            })
    }
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId)=> {
    return state.users.users.find(user => user.id === userId);
}

export const { } = usersSlice.actions;
export default usersSlice.reducer;