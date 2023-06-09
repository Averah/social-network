import React from "react";
import { NavLink } from "react-router-dom";
import s from "./UsersList.module.css";
import UserCard from "./UserCard";
import { useSelector } from "react-redux"
import Preloader from "../common/Preloader/Preloader";
import { AppStateType } from '../../redux/redux-store';
import { UserType } from '../../Types/types';

type PropsType = {
  users: Array<UserType>
  followingInProgress: Array<number>
  follow: (id: number) => void
  unfollow: (id: number) => void
}

let UsersList: React.FC<PropsType> = ({ users, followingInProgress, follow, unfollow }) => {
  const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)

  if (users.length === 0) {
    return <div className={s.emptyUsersList}> No matches found</div>
  }
  return (
    <div className={s.usersList}>
      {isFetching ? <Preloader /> : null}
      {users.map((user) => (
        <NavLink to={`/profile/${user.id}`} className={s.userCardLink} key={user.id}>
          <UserCard
            user={user}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
        </NavLink>
      ))}
    </div>
  )
};

export default UsersList;
