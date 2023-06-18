import React, { useEffect } from "react";
import Pagination from "../common/Pagination/Pagination";
import SearchUsersForm from "./SearchUsersForm";
import UsersList from "./UsersList";
import s from "./Users.module.css";
import { useSelector } from 'react-redux';
import { requestUsers, follow, unfollow, actions } from '../../redux/usersReducer';
import { AppStateType } from '../../redux/redux-store';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from 'react';

const useNavigateSearch = () => {
  const navigate = useNavigate();
  const returnFn = useCallback((pathname: string, params: Record<string, string>) =>
    navigate(`${pathname}?${createSearchParams(params)}`),
    [navigate]
  )
  return returnFn;
};

const Users: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const usersPage = useSelector((state: AppStateType) => state.usersPage)

  const navigateSearch = useNavigateSearch();
  const location = useLocation();


  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryFriend = query.get("friend");
    const queryPage = query.get("page");
    const queryTerm = query.get("term");

    if (queryPage) dispatch(actions.setCurrentPage(Number(queryPage)))
    if (queryTerm) {
      const filter = {
        searchData: queryTerm,
        friend: usersPage.filter.friend
      }
      dispatch(actions.setFilterData(filter))
    }

    if (queryFriend) {
      const filter = {
        searchData: usersPage.filter.searchData,
        friend: queryFriend
      }
      dispatch(actions.setFilterData(filter))
    }

    dispatch(requestUsers());
  }, []);


  useEffect(() => {
    const paramsObj: Record<string, string> = {};
    if (usersPage.currentPage) paramsObj.page = `${usersPage.currentPage}`
    if (usersPage.pageSize) paramsObj.count = `${usersPage.pageSize}`
    if (usersPage.filter.searchData) paramsObj.term = `${usersPage.filter.searchData}`
    if (usersPage.filter.friend) paramsObj.friend = `${usersPage.filter.friend}`
    navigateSearch("/users", paramsObj);

  }, [usersPage.filter, usersPage.currentPage, usersPage.pageSize, navigateSearch]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(actions.setCurrentPage(pageNumber));
    dispatch(requestUsers())
  };
  const followUser = (id: number) => {
    dispatch(follow(id))
  }

  const unfollowUser = (id: number) => {
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
      <SearchUsersForm />
      <UsersList
        users={usersPage.users}
        followingInProgress={usersPage.followingInProgress}
        follow={followUser}
        unfollow={unfollowUser}
      />
    </div>
  );
});
export default Users;
