const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    posts: [
        { id: 1, message: "Hey, it is me", likes: "10 likes" },
        { id: 2, message: "It is my new post", likes: "15 likes" },
        { id: 3, message: "It is my second post", likes: "20 likes" },],

    newPostText: ''
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: state.newPostText,
                likes: '0'
            }
            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = ''
            return stateCopy
        }
        case UPDATE_NEW_POST_TEXT: {

            return { 
                ...state,
                newPostText: action.newText 
            }
            // stateCopy.newPostText = action.newText
            // return stateCopy
        }
        default:
            return state
    }
}


export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })