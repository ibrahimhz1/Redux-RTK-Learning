import React from 'react'

import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmojis = {
    thumbsUp: '👍',
    wow: '😯',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type='button'
                className='reactionButton'
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    });

    return (
        <div id='reactionButtons'>
            {reactionButtons}
        </div>
    )
}

export default ReactionButtons;