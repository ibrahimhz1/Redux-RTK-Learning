import React from 'react'

const Register = () => {
  return (
    <div className='registerUser'>
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={()=> {}}/>
            <label htmlFor="firstname">First Name</label>
            <input type="text" onChange={()=> {}}/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" onChange={()=> {}}/>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={()=> {}}/>
            <label htmlFor="phone">Phone</label>
            <input type="phone" onChange={()=>{}} />
        </form>
    </div>
  )
}

export default Register;