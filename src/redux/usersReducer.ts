
import { UserType } from './../Types/types';
import { followAPI } from "../API/followAPI";
import { getUsersAPI } from "../API/getUsersAPI";
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ResultCodesEnum } from '../API/authAPI';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    searchData: ''
}

export type InitialState = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'sn/users/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'sn/users/UNFOLLOW_SUCCESS', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'sn/users/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'sn/users/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'sn/users/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'sn/users/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'sn/users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
    setSearchData: (searchData: string) => ({ type: 'sn/users/SET_SEARCH_DATA', searchData } as const),
}

export const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'sn/users/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case 'sn/users/UNFOLLOW_SUCCESS':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case 'sn/users/SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'sn/users/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'sn/users/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }

        case 'sn/users/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'sn/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case 'sn/users/SET_SEARCH_DATA': {
            return { ...state, searchData: action.searchData }
        }

        default:
            return state;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (searchData?: string): ThunkType => async (dispatch, getState) => {
    const currentPage = getState().usersPage.currentPage
    const pageSize = getState().usersPage.pageSize
    dispatch(actions.toggleIsFetching(true));
    let data = await getUsersAPI(currentPage, pageSize, searchData)
    dispatch(actions.setCurrentPage(currentPage))
    searchData && dispatch(actions.setSearchData(searchData ))
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

export const follow = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, id))
    let data = await followAPI.followUser(id)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.followSuccess(id));
    }
    dispatch(actions.toggleFollowingProgress(false, id))
};


export const unfollow = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, id))
    let data = await followAPI.unfollowUser(id)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.unfollowSuccess(id));
    }
    dispatch(actions.toggleFollowingProgress(false, id))

}

