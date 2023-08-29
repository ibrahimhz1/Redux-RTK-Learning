import React from 'react'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { Link } from 'react-router-dom';

const PostExcerpt = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 75)}</p>
            <Link to={`post/${post.id}`}>View Post</Link> 
            <div>
                <PostAuthor userId={post.userId} /> 
                <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />
        </article>
    )
}


export default PostExcerpt;