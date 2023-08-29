import React from 'react'
import { useGetAccountQuery, useAddAccountMutation, useDeleteAccountMutation, useUpdateAccountMutation } from '../api/AdminSlice'

const Admin = () => {
  const {data, error, isLoading, isSuccess} = useGetAccountQuery();
  const [addAccount, response] = useAddAccountMutation();
  const [delAccount] = useDeleteAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  return (
    <div id='bonusContainer'>
      <h2>Admin component</h2>
      {isLoading ? <p>Loading....</p> : null}
      {
        isSuccess && data && 
        data.map(account => <p>{account.id}: {account.amount}
          <button onClick={()=>delAccount(account.id)}>Del Account</button>
          <button onClick={()=>updateAccount({id: account.id, amount: 777})}>Update Account</button>
          </p>
        ) 
      }
      <button onClick={() => addAccount({id: data.length + 1, amount: 120})}>Add Account</button>
    </div>
  )
}

export default Admin;