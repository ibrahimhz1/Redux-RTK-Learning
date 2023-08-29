import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";
import axios from "axios";

// Constants names
const getAllUsersFulFilled = "account/getAllUsers/fulFilled";
const getAllUsersPending = "account/getAllUsers/pending";
const getAllUsersRejected = "account/getAllUsers/rejected";

const getAllPostsFulFilled = "post/getAllPosts/fulFilled";
const getAllPostsPending = "post/getAllPosts/pending";
const getAllPostsRejected = "post/getAllPosts/rejected";

const store = createStore(combineReducers({ accounts: accountReducer, posts: postReducer }), applyMiddleware( logger.default, thunk.default));

function accountReducer(state = { account: [] }, action) {
    switch (action.type) {
        case getAllUsersFulFilled:
            return { account: action.payload, pending: false }
        case getAllUsersRejected:
            return {...state, error: action.error, pending: false}
        case getAllUsersPending: 
            return {...state, pending: true}
        default:
            return state;
    }
}

function postReducer(state = { post: [] }, action) {
    switch(action.type){
        case getAllPostsFulFilled: 
            return {post: action.payload, pending: false}
        case getAllPostsRejected:
            return {...state, error: action.error, pending: false}
        case getAllPostsPending: 
            return {...state, pending: true}
        default:
            return state;
    }
}


// Action Creators
async function getUsers(dispatch, getState) {
    try {
        dispatch({type: getAllUsersPending })
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        dispatch({ type: getAllUsersFulFilled, payload: data });
    } catch (error) {
        dispatch({ type: getAllUsersRejected, error: error });
    }
}

async function getPosts(dispatch, getState){
    try{
        dispatch({type: getAllPostsPending })
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/poss`);
        dispatch({type: getAllPostsFulFilled, payload: data});
    }catch(error){
        dispatch({type: getAllPostsRejected, error: error});
    }
}


// Dispatchings
// setTimeout(() => {
//     store.dispatch(getUsers)
// }, 1500);


// setTimeout(() => {
//     console.log("PRINTING STUFF=============================");
//     const obj = store.getState();
//     if(obj.accounts.account.length > 0){
//         for (let i = 0; i < obj.accounts.account.length; i++) {
//             console.log(obj.accounts.account[i]);
//         }
//     }
//     else{
//         console.log(obj.accounts.error.message);
//     }
// }, 5000);


setTimeout(()=> {
    store.dispatch(getPosts);
}, 1500)

setTimeout(() => {
    console.log("PRINTING STUFF=============================");
    const obj = store.getState();
    if(obj.posts.post.length > 0){
        for (let i = 0; i < obj.posts.post.length; i++) {
            console.log(obj.posts.post[i]);
        }
    }
    else{
        console.log(obj.posts.error.message);
    }
}, 5000);

