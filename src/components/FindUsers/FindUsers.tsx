import React, { useEffect } from "react";
import Pagination from "../common/Pagination/Pagination";
import SearchUsers from "./SearchUsers";
import UsersList from "./UsersList";
import s from "./FindUsers.module.css";
import { useSelector } from 'react-redux';
import { requestUsers, follow, unfollow, actions } from '../../redux/usersReducer';
import { AppStateType} from '../../redux/redux-store';
import { useAppDispatch } from '../../Hooks/useAppDispatch';

const FindUsers:React.FC = () => {
  const dispatch = useAppDispatch()
  const usersPage = useSelector((state: AppStateType) => state.usersPage)

  useEffect (() => {
    dispatch(requestUsers())
    },  [dispatch])

  const onPageChanged = (pageNumber:number) => {
    dispatch(actions.setCurrentPage(pageNumber));
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
