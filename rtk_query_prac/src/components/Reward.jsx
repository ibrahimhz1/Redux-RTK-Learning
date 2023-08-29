import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../reducers/reward';

const Reward = () => {
    const points = useSelector(state => state.reward.points);
    const dispatch = useDispatch();

    return (
        <div id='bonusContainer'>
            <h2>Reward component</h2>
            <h3>Points : ${points}</h3>
            <button onClick={() => dispatch(increment())}>Increment Reward</button>
        </div>
    )
}

export default Reward