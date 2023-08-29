import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

// action names constants
const inc = "amount/increment";
const dec = "amount/decrement";
const incByAmt = "amount/incrementByAmount";
const getAccUserPending = "amount/getUser/pending";
const getAccUserFulFilled = "amount/getUser/fullfilled";
const getAccUserRejected = "amount/getUser/rejected";

const incBonus = "bonus/incBonus";

const store = createStore(
    // reducer,
    combineReducers({
        account: accountReducer,
        bonus: bonusReducer,
    }),
    applyMiddleware(logger.default, thunk.default)
);

const history = [];

function accountReducer(state = { amount: 1 }, action) {
    // if (action.type === inc) {
    //     return { amount: state.amount + 1 };
    // }
    // if (action.type === dec) {
    //     return { amount: state.amount - 1 };
    // }
    // if (action.type === incByAmt) {
    //     return { amount: state.amount + action.payload };
    // }
    // return state;

    switch (action.type) {
        case getAccUserFulFilled:
            return { amount: action.payload, pending: false }
        case getAccUserRejected:
            return { ...state, error: action.error, pending: false }
        case getAccUserPending:
            return { ...state, pending: true }
        case inc:
            return { amount: state.amount + 1 };
        case dec:
            return { amount: state.amount - 1 };
        case incByAmt:
            return { amount: state.amount + action.payload }
        default:
            return state;
    }
};

function bonusReducer(state = { points: 0 }, action) {
    switch (action.type) {
        case incBonus:
            return { points: state.points + 1 }
        case incByAmt:
            if (action.payload >= 100) {
                return { points: state.points + 1 };
            }
        default:
            return state;
    }
}

// global state

// store.subscribe(() => {
//     history.push(store.getState());
//     console.log(history);
// });

// Action Creators
function increment() {
    return { type: inc }
}

function decrement() {
    return { type: inc }
}

function incrementByAmount(value) {
    return { type: incByAmt, payload: value }
}

function getUserAccount(id) {
    return async (dispatch, getState) => {
        try {
            dispatch(getAccPending())
            const { data } = await axios.get(`http://localhost:3344/accounts/${id}`);
            dispatch(getAccFulFilled(data.amount))
        } catch (error) {
            dispatch(getAccRejected(error.message))
        }
    }
}

function getAccFulFilled(value) {
    return { type: getAccUserFulFilled, payload: value }
}

function getAccRejected(error) {
    return { type: getAccUserRejected, error: error }
}

function getAccPending() {
    return { type: getAccUserPending }
}

function increaseBonus() {
    return { type: incBonus }
}

// setInterval(() => {
//     store.dispatch(increment());
// }, 2000);

// setInterval(()=>{
//     store.dispatch(decrement());
// }, 2000);

// setInterval(()=> {
//     store.dispatch(incrementByAmount(3));
// }, 2000);

setTimeout(() => {
    store.dispatch(getUserAccount(2));
    // store.dispatch(incrementByAmount(200))
    // store.dispatch(increaseBonus())
}, 2000);


