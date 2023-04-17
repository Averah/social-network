import { followAPI } from "../API/followAPI";
import { getUsersAPI } from "../API/getUsersAPI";

const FOLLOW_SUCCESS = 'social-network/users/FOLLOW';
const UNFOLLOW_SUCCESS = 'social-network/users/UNFOLLOW_SUCCESS';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []

};

export const usersReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}


export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
   let data = await getUsersAPI(currentPage, pageSize)
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    ;
}

export const follow = (id) => async (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
       let data = await followAPI.followUser(id)
            if (data.resultCode === 0) {
                dispatch(followSuccess(id));
            }
            dispatch(toggleFollowingProgress(false, id))
    };


export const unfollow = (id) => async(dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        let data = await followAPI.unfollowUser(id)
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(id));
            }
            dispatch(toggleFollowingProgress(false, id))
    
    }



export const followSuccess = (userId) => ({ type: FOLLOW_SUCCESS, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW_SUCCESS, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


