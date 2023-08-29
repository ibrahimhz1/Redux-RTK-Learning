import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByNum, decrementByNum, resetCount } from '../counter/counterSlice'

const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const resetFunction = () => {
    setValue(0);
    dispatch(resetCount());
  }

  return (
    <div id='counterComponent'>
      <div id='upper'>
        <button id='decBtn' onClick={() => dispatch(decrement())}>-</button>
        <input type="text" id="amount" value={count} />
        <button id='incBtn' onClick={() => dispatch(increment())}>+</button>
      </div>
      <div id='lower'>
        <button onClick={() => dispatch(decrementByNum(value))}>- by {value}</button>
        <input type="text" onChange={(e) => setValue(Number(e.target.value))} value={value} />
        <button onClick={() => dispatch(incrementByNum(value))}>+ by {value} </button>
        <button onClick={resetFunction}>reset</button>
      </div>
    </div>
  )
}

export default Counter