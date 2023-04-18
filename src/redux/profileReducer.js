
import { profileAPI } from "../API/profileAPI"

const ADD_POST = 'social-network/profile/ADD-POST'
const UPDATE_NEW_POST_TEXT = 'social-network/profile/UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE'
const SET_USER_STATUS = 'social-network/profile/SET-USER-STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        { id: 1, message: "Hey, it is me", likes: "10 likes" },
        { id: 2, message: "It is my new post", likes: "15 likes" },
        { id: 3, message: "It is my second post", likes: "20 likes" },],
    profile: null,
    status: ''
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: action.postText,
                likes: '0'
            }
            let stateCopy = { ...state }
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)

            return stateCopy
        }
        case UPDATE_NEW_POST_TEXT: {

            return {
                ...state,
                newPostText: action.newText
            }

        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        }

        default:
            return state
    }
}

export const getUsersProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}


export const getUsersStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))
}


export const updateUsersStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setUserStatus(status))
}


export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    dispatch(savePhotoSuccess(response.data.data.photos))
}


export const addPostActionCreator = (postText) => ({ type: ADD_POST, postText })
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })