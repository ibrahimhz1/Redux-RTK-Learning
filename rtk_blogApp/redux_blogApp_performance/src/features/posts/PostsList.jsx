import React from 'react'

import { useSelector } from 'react-redux';

// import { selectAllPosts, getPostsStatus, getPostsError } from './postsSlice';
import { selectPostIds, getPostsStatus, getPostsError } from './postsSlice';

import PostExcerpt from './PostExcerpt';

const PostsList = () => {
    
    const OrderedpostsIds = useSelector(selectPostIds);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    

    let content;
    if (postsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded') {
        content = OrderedpostsIds.map(postId => <PostExcerpt key={postId} postId={postId} />)
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <>
            <h1>Posts</h1>
            {content}
        </>
    )
}

export default PostsList;