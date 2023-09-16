import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loggedinUser: undefined,
    users: [],
    status: null,
};

const USERS_URL = `http://localhost:3344/users`;

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get(USERS_URL);
        return response.data;
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = state.users.find(user => user.username === action.payload.username && user.password === action.payload.password);
            if (user) {
                localStorage.setItem('userId', JSON.stringify(user));
                state.loggedinUser = user;
            }else{
                state.loggedinUser = null;
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
    }
});

export const selectAllUsers = (state) => state.users.users;

export const { loginUser } = usersSlice.actions;
export default usersSlice.reducer;