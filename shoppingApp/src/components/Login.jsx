import React, { useEffect, useState } from 'react'

import { loginUser } from '../features/users/usersSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const user = useSelector(state => state.users.loggedinUser);

  useEffect(() => {
    if (user) {
      onLoginSuccess();
    }
  }, [user, onLoginSuccess]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  }

  return (
    <div className='loginpage'>
      <div className='loginUser'>
        <div className='heading'>
          <h1>Login</h1>
        </div>
        <div className='formdiv'>
          <form>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={onSubmitHandler} >LOGIN</button>
            <Link to="register"> Register </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;