import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// action creators imports from slices
import { increment, decrement, incrementByAmount, decrementByAmount, fetchUserById } from '../slices/accountSlice'

const Account = () => {
  const [incValue, setIncValue] = useState(0);
  const [decValue, setDecValue] = useState(0);
  const amount = useSelector(state => state.account.amount);
  const points = useSelector(state => state.bonus.points);
  const rewardPoints = useSelector(state => state.reward.points);
  const dispatch = useDispatch();

  return (
    <div id='accountContainer'>
      <h2> <b>Account Component</b> </h2>
      <h3>Amount: ${amount} </h3>
      <h3>Points: ${points} </h3>
      <div>
        <button onClick={() => { dispatch(increment()) }} >increment + </button>
        <button onClick={() => { dispatch(decrement()) }}>decrement - </button>
        <input type="number" onChange={(e) => setIncValue(Number(e.target.value))} />
        <button onClick={() => { dispatch(incrementByAmount({value: incValue,reward: rewardPoints})) }} >Increment by ${incValue}</button>
        <input type="number" onChange={(e) => setDecValue(Number(e.target.value))} />
        <button onClick={() => { dispatch(decrementByAmount(decValue)) }} >Decrement by ${decValue}</button>
        <button onClick={()=> {dispatch(fetchUserById(1))}}>Init Account</button>
      </div>
    </div>
  )
}

export default Account;