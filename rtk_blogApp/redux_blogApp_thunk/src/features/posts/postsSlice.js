import { createSlice, nanoid, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count: 0,
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get(POSTS_URL);
        return response.data;
    }
)

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (initialPost) => {
        const { id } = initialPost;
        try {
            const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
            return response.data;
        } catch (error) {
            // return error.message
            return initialPost; // only for testing redux
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (initialPost) => {
        const { id } = initialPost;
        try {
            const response = await axios.delete(`${POSTS_URL}/${id}`);
            if (response?.status === 200) return initialPost;
            return `${response?.status}: ${response?.statusText}`;
        } catch (error) {
            return error.message;
        }
    }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        incrementCount: (state, action) => {
            state.count = state.count + 1;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // add date and time reaction
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.id = state.posts[state.posts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                }
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log(`update could not be completed`);
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not be completed');
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export const selectPostById = (state, postId) => {
    return state.posts.posts.find(post => {
        return post.id === postId
    });
};

export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
);

export const { postAdded, reactionAdded, incrementCount } = postSlice.actions;
export default postSlice.reducer;