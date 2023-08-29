import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { useParams, Link } from 'react-router-dom';

const singlePostPage = () => {
    const { postId } = useParams();
    const post = useSelector(state => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Page not found</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            <ReactionButtons post={post} />
        </article>
    )
}

export default singlePostPage;