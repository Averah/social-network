import { ProfileType, PhotosType, PostType } from './../Types/types';
import { profileAPI } from "../API/profileAPI"
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ResultCodesEnum } from '../API/authAPI';

let initialState = {
    posts: [
        { id: 1, message: "Hey, it is me", likes: "10 likes" },
        { id: 2, message: "It is my new post", likes: "15 likes" },
        { id: 3, message: "It is my second post", likes: "20 likes" },] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    errorMessages: null as null | Array<string>
}
type InitialStateType = typeof initialState

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    addPostActionCreator: (postText: string) => ({ type: 'sn/profile/ADD_POST', postText } as const),
    setUserProfile: (profile: ProfileType | null) => ({ type: 'sn/profile/SET_USER_PROFILE', profile } as const),
    setUserStatus: (status: string) => ({ type: 'sn/profile/SET_USER_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'sn/profile/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'sn/profile/SAVE_PHOTO_SUCCESS', photos } as const),
    saveProfileSuccess: (profile: ProfileType) => ({ type: 'sn/profile/SAVE_PROFILE_SUCCESS', profile } as const),
    showErrorMessages: (errorMessages: string[] | null) => ({ type: 'sn/profile/SHOW_ERROR_MESSAGE', errorMessages } as const),
}

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'sn/profile/ADD_POST': {
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
        case 'sn/profile/DELETE_POST': {
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        }
        case 'sn/profile/SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'sn/profile/SET_USER_STATUS': {
            return { ...state, status: action.status }
        }
        case 'sn/profile/SAVE_PHOTO_SUCCESS': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case 'sn/profile/SAVE_PROFILE_SUCCESS': {
            return { ...state, profile: action.profile }
        }
        case 'sn/profile/SHOW_ERROR_MESSAGE': {
            return { ...state, errorMessages: action.errorMessages }
        }

        default:
            return state
    }
}

export type ThunkType<T = void> = ThunkAction<Promise<T>, AppStateType, unknown, ActionsTypes>

export const getUsersProfile = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}


export const getUsersStatus = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(data))
}


export const updateUsersStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success)
        dispatch(actions.setUserStatus(status))
}


export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    dispatch(actions.savePhotoSuccess(data.photos))
}

export const saveProfile = (profile: ProfileType): ThunkType<string | undefined> => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUsersProfile(userId))
            dispatch(actions.showErrorMessages(null))
            return 'success'
        } else {
            throw new Error('UserId cant be null')
        }
    } else {
        dispatch(actions.showErrorMessages(response.data.messages))
        return response.data.messages[0]
    }
}

