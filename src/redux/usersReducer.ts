
import { UserType } from './../Types/types';
import { followAPI } from "../API/followAPI";
import { getUsersAPI } from "../API/getUsersAPI";

const FOLLOW_SUCCESS = 'social-network/users/FOLLOW';
const UNFOLLOW_SUCCESS = 'social-network/users/UNFOLLOW_SUCCESS';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network//users/TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_SEARCH_DATA = 'social-network//users/SET_SEARCH_DATA'


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    searchData: ''
}

type InitialState = typeof initialState

type CommonType = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType 
| SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingProgressType | SetSearchDataType


export const usersReducer = (state = initialState, action: CommonType):InitialState => {
    switch (action.type) {
        case FOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case SET_SEARCH_DATA: {
            return { ...state, searchData: action.searchData }
        }

        default:
            return state;
    }
}


export const requestUsers = (searchData?:string) => async (dispatch, getState) => {
    const currentPage = getState().usersPage.currentPage
    const pageSize = getState().usersPage.pageSize
    dispatch(toggleIsFetching(true));
    let data = await getUsersAPI(currentPage, pageSize, searchData)
    dispatch(setCurrentPage(currentPage))
    searchData && dispatch(setSearchData(searchData))
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

export const follow = (id:number) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    let data = await followAPI.followUser(id)
    if (data.resultCode === 0) {
        dispatch(followSuccess(id));
    }
    dispatch(toggleFollowingProgress(false, id))
};


export const unfollow = (id:number) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    let data = await followAPI.unfollowUser(id)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(id));
    }
    dispatch(toggleFollowingProgress(false, id))

}

type FollowSuccessType = {
    type: typeof FOLLOW_SUCCESS
    userId: number
}
type UnfollowSuccessType = {
    type: typeof UNFOLLOW_SUCCESS
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean
    userId:number
}
type SetSearchDataType = {
    type: typeof SET_SEARCH_DATA
    searchData:string
}




export const followSuccess = (userId:number):FollowSuccessType => ({ type: FOLLOW_SUCCESS, userId })
export const unfollowSuccess = (userId:number):UnfollowSuccessType => ({ type: UNFOLLOW_SUCCESS, userId })
export const setUsers = (users: Array<UserType>):SetUsersType => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage:number):SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
export const setSearchData = (searchData:string):SetSearchDataType => ({ type: SET_SEARCH_DATA, searchData })


