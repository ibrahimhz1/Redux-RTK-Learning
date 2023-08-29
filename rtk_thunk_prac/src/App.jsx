import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import Account from './components/Account';
import Bonus from './components/Bonus';

const App = ({ store }) => {
  const account = useSelector(state => state.account)
  const points = useSelector(state => state.bonus.points)

  return (
    <div id="main">
      {account.pending ? (
        <p>Loading...</p>
      ) : account.error ? (
        <p>{account.error}</p>
      ) : (
        <h1> Total Amount: ${account.amount}</h1>
      )}

      <h1>Total Bonus: ${points}</h1>

      <Account />
      <Bonus />
    </div>
  );
}

export default App;