import React from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

let Users = (props) => {
  return (
    <div>
      <Pagination
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
      <User
        users={props.users}
        followingInProgress={props.followingInProgress}
        follow={props.follow}
        unfollow={props.unfollow}
      />
    </div>
  );
};
export default Users;
