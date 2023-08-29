import axios from "axios"

// action name constants
export const inc = 'account/increment'
export const dec = 'account/decrement'
export const incByAmt = 'account/incrementByAmount'
export const decByAmt = 'account/decrementByAmount'
export const getAccUserPending = 'account/getUser/pending'
export const getAccUserFulFilled = 'account/getUser/fullFilled'
export const getAccUserRejected = 'account/getUser/rejected'
export const incBonus = 'bonus/increment'

// action creators
export function increment() {
    return { type: inc }
}

export function decrement() {
    return { type: dec }
}

export function incrementByAmount(value) {
    return { type: incByAmt, payload: value }
}

export function decrementByAmount(value, amount) {
    if(value<=amount){
        return { type: decByAmt, payload: value }
    }else{
        return { type: decByAmt, payload: 0}
    }
}

export function getUserAccount(id) {
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

export function getAccPending() {
    return { type: getAccUserPending }
}

export function getAccFulFilled(value) {
    return { type: getAccUserFulFilled, payload: value }
}

export function getAccRejected(error) {
    return { type: getAccUserRejected, error: error }
}

export function increaseBonus() {
    return { type: incBonus }
}


