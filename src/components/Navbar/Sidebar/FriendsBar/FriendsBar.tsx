import React from "react";
import Friend from "./Friend/Friend";
import s from "./FriendsBar.module.css";
import { FriendType } from '../../../../redux/sidebarReducer';

type PropsType = {
  friends: Array<FriendType>
}

const FriendsBar: React.FC<PropsType> = ({ friends }) => {
  let friendsList = friends.map((friend) =>
    <Friend friend={friend.name} key={friend.id} />);
  return (
    <div className={s.friendsBar}>
      <div className={s.posts}>{friendsList}</div>
    </div>
  )

}

export default FriendsBar;
