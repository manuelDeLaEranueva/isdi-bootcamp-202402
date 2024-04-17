import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'

import createPost from './createPost.ts'
import retrievePosts from './retrievePosts.ts'
import removePost from './removePost.ts'
import modifyPost from './modifyPost.ts'


const logic = {
    users: null,
    posts: null,

    registerUser,
    authenticateUser,
    retrieveUser,

    createPost,
    retrievePosts,
    removePost,
    modifyPost
}

export default logic