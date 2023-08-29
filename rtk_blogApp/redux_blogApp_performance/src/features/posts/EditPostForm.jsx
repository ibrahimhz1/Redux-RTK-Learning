import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from '../users/usersSlice'

const EditPostForm = () => {

    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    if (!post) {
        return (
            <h3>Post Not found</h3>
        )
    }

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending');
                dispatch(updatePost({ id: post.id, title, body: content, userId: Number(userId), reactions: post.reactions })).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${postId}`);
            } catch (error) {
                console.log(`Failed to save the post ${error}`);
            } finally {
                setRequestStatus('idle');
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ));

    const onDeletePostClicked = ()=> {
        try {
            setRequestStatus('pending');
            dispatch(deletePost({id: post.id})).unwrap();

            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        } catch (error) {
            console.error(`Failed to delete the post `, error);
        } finally{
            setRequestStatus('idle');
        }
    }

    return (
        <section id='addPost'>
            <h2>Update Post</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="postAuthor">Author: </label>
                <select id="postAuthor" value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
                <button type='button' onClick={onDeletePostClicked}>Delete Post</button>
            </form>
        </section>
    )
}

export default EditPostForm;