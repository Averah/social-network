import React, { useEffect } from "react";
import Pagination from "../common/Pagination/Pagination.tsx";
import SearchUsers from "./SearchUsers";
import UsersList from "./UsersList";
import s from "./FindUsers.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { requestUsers, setCurrentPage, follow, unfollow } from '../../redux/usersReducer';
import { AppStateType } from '../../redux/redux-store';

const FindUsers:React.FC = () => {
  const dispatch = useDispatch()
  const usersPage = useSelector((state: AppStateType) => state.usersPage)

  useEffect (() => {
    dispatch(requestUsers())
    },  [dispatch])

  const onPageChanged = (pageNumber:number) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(requestUsers(usersPage.searchData))
  };
  const followUser = (id:number) => {
    dispatch(follow(id))
  }

  const unfollowUser = (id:number) => {
    dispatch(unfollow(id))
  }
  return (
    <div className={s.usersPage}>
      <Pagination
        currentPage={usersPage.currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={usersPage.totalUsersCount}
        pageSize={usersPage.pageSize}
      />
      <SearchUsers />
      <UsersList
        users={usersPage.users}
        followingInProgress={usersPage.followingInProgress}
        follow={followUser}
        unfollow={unfollowUser}
      />
    </div>
  );
};
export default FindUsers;
