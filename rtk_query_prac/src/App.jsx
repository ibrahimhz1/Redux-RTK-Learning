import React from 'react'


import { useSelector } from 'react-redux';

import Account from './components/Account'
import Bonus from './components/Bonus'
import Reward from './components/Reward'
import Admin from './components/Admin';

function App() {
  
  const amount = useSelector(state => state.account.amount);
  const points = useSelector(state => state.bonus.points);
  
  return (
    <div id="main">
      <h1> Total Amount: ${amount}</h1>
      <h1>Total Bonus: ${points}</h1>
      <Account />
      <Bonus />
      <Reward />
      <Admin />
    </div>
  )
}

export default App;
