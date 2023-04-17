import { addPostActionCreator, deletePost, profileReducer } from "./profileReducer"


let state = {
    posts: [
        { id: 1, message: "Hey, it is me", likes: "10 likes" },
        { id: 2, message: "It is my new post", likes: "15 likes" },
        { id: 3, message: "It is my second post", likes: "20 likes" },],
}

it ('length of posts should be incremented', () => {
    let action = addPostActionCreator('lol')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})

it('post text should be `lol`', () => {
    let action = addPostActionCreator("lol")
    let newState = profileReducer(state, action)
    expect(newState.posts[3].message).toBe("lol")
})

it('after deleting the message the posts length should be decremented', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2)
})