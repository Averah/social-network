

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = ' SET_CURRENT_PAGE'
const SET_USERS_TOTAL = 'SET_USERS_TOTAL'

let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage:1

}
export const usersReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: true }
                    }

                    return u;
                })

            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        }

        case SET_USERS: {
            return {
                ...state, users: [...action.users]
            }

        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: [...action.currentPage]
            }

        }
        case SET_USERS_TOTAL: {
            return {
                ...state, totalUsersCount: [...action.count]
            }

        }

        default:
            return state

    }
}


export const followAC = (userID) => ({ type: FOLLOW, userID })
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID })
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const setCurrentPageAC= (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalAC = (totalUsersCount) => ({ type: SET_USERS_TOTAL, count:totalUsersCount })


