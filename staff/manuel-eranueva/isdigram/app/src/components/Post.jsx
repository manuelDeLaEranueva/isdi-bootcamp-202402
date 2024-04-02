import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { Component } from 'react'

class Post extends Component {
    constructor() {
        logger.debug('Post')

        super()
    }

    handleDeleteClick = postId => {
        if (confirm('delete post?'))
            try {
                logic.removePost(postId)

                this.props.onDeleted()
            } catch (error) {
                showFeedback(error)
            }
    }

    handleEditClick = post => this.props.onEditClick(post)

    render() {
        const { item: post } = this.props

        return <article key={post.id}>
            <h3>{post.author.username}</h3>

            <img src={post.image} />

            <p>{post.text}</p>

            <time>{post.date}</time>

            {logic.getLoggedInUserId() === post.author.id && <>
                <button onClick={() => this.handleDeleteClick(post.id)}>🗑️</button>
                <button onClick={() => this.handleEditClick(post)}>📝</button>
            </>}
        </article>
    }
}

export default Post