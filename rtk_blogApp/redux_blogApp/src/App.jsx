import React from "react"
import { useSelector } from 'react-redux'

import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
const App = () => {
  const count = useSelector(state => state.counter.count);

  return (
    <div id="main">
      {/* <h1>count: {count}</h1> */}
      {/* <Counter /> */}
      
      <AddPostForm />
      <PostsList />
    
    </div>
  )
}

export default App
