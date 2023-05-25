import React from "react";
import FriendsBar from "./FriendsBar/FriendsBar";
import { FriendType } from '../../../redux/sidebarReducer';

type PropsType = {
  friends: Array<FriendType>
}

const Sidebar:React.FC<PropsType> = ({friends}) => {
  return <FriendsBar friends={friends} />
   
}

export default Sidebar;
