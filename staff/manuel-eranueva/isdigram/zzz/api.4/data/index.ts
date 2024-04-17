import Collection from './Collection.ts'

const db = {
    users: new Collection('users'),
    posts: new Collection('posts'),
    chats: new Collection('chats')
}

export default db