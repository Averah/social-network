import React from "react";
import Pagination from "../common/Pagination/Pagination";
import SearchUsers from "./SearchUsers";
import UsersList from "./UsersList";
import s from "./FindUsers.module.css";

let FindUsers = (props) => {
  return (
    <div className={s.usersPage}>
      <Pagination
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
      <SearchUsers />
      <UsersList
        users={props.users}
        followingInProgress={props.followingInProgress}
        follow={props.follow}
        unfollow={props.unfollow}
      />
    </div>
  );
};
export default FindUsers;
