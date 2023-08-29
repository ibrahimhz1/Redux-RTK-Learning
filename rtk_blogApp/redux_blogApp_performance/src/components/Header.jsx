import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { incrementCount, getCount } from '../features/posts/postsSlice'

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <header className='Header'>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li> <Link className='link' to="/">Home</Link> </li>
          <li> <Link className='link' to="post">Post</Link> </li>
          <li> <Link className='link' to="user">Users</Link> </li>
        </ul>
        <button
          onClick={() => dispatch(incrementCount())}
        > {count} </button>
      </nav>
    </header>
  )
}

export default Header;