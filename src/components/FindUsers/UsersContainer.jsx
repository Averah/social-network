import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { followAC, setCurrentPageAC, setUsersAC, setUsersTotalAC, unfollowAC } from "../../redux/usersReducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },

        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPageAC: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },

        setUsersTotalAC: (totalCount) => {
            dispatch (setUsersTotalAC(totalCount))
        }
    }


}
const UsersContainer  = connect(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;
