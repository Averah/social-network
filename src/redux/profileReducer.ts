import { ProfileType, PhotosType, PostType } from './../Types/types';
import { profileAPI } from "../API/profileAPI"
import { ErrorType } from '../Types/types';

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE'
const SET_USER_STATUS = 'social-network/profile/SET-USER-STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS'
const SAVE_PROFILE_SUCCESS = 'social-network/profile/SAVE_PROFILE_SUCCESS'
const SHOW_ERROR_MESSAGE = 'social-network/profile/SHOW_ERROR_MESSAGE'

let initialState = {
    posts: [
        { id: 1, message: "Hey, it is me", likes: "10 likes" },
        { id: 2, message: "It is my new post", likes: "15 likes" },
        { id: 3, message: "It is my second post", likes: "20 likes" },] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    errorMessages: null as null | Array<ErrorType>
}
type InitialStateType = typeof initialState


type CommonType = AddPostActionType | SetUserProfileType | SetUserStatusType | DeletePostType
    | SavePhotoSuccessType | SaveProfileSuccessType | ShowErrorMessagesType

export const profileReducer = (state = initialState, action: CommonType): InitialStateType => {
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
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case SAVE_PROFILE_SUCCESS: {
            return { ...state, profile: action.profile }
        }
        case SHOW_ERROR_MESSAGE: {
            return { ...state, errorMessages: action.errorMessages }
        }

        default:
            return state
    }
}

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}


export const getUsersStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))
}


export const updateUsersStatus = (status: string) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setUserStatus(status))
}


export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    dispatch(savePhotoSuccess(response.data.data.photos))
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId))
        dispatch(showErrorMessages(''))
        return 'success'
    } else {
        dispatch(showErrorMessages(response.data.messages))
        return response.data.messages[0]
    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    postText: string
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

type SaveProfileSuccessType = {
    type: typeof SAVE_PROFILE_SUCCESS
    profile: ProfileType
}

type ShowErrorMessagesType = {
    type: typeof SHOW_ERROR_MESSAGE
    errorMessages: string
}


export const addPostActionCreator = (postText: string): AddPostActionType => ({ type: ADD_POST, postText })
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_USER_STATUS, status })
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const saveProfileSuccess = (profile: ProfileType): SaveProfileSuccessType => ({ type: SAVE_PROFILE_SUCCESS, profile })
export const showErrorMessages = (errorMessages: string): ShowErrorMessagesType => ({ type: SHOW_ERROR_MESSAGE, errorMessages })
