import React from 'react'

import { increment } from '../slices/bonusSlice'
import { useSelector, useDispatch } from 'react-redux'

const Bonus = () => {
  const points = useSelector(state => state.bonus.points);
  const amount = useSelector(state => state.account.amount);
  const dispatch = useDispatch();

  return (
    <div id='bonusContainer'>
      <h2>Bonus component</h2>
      <h3>Amount: ${amount}</h3>
      <h3>Points : ${points}</h3>
      <button onClick={() => dispatch(increment())}>Increment Bonus</button>
    </div>
  )
}

export default Bonus;