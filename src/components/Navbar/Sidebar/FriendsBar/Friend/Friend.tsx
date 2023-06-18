import s from "./Friend.module.css";
import defaultAvatar from './../../../../../images/DefaultAvatar/defaultAvatar.png'
import React from "react";

type PropsType = {
  friend: string
}

const Friend:React.FC<PropsType> = ({friend}) => {
  return (
  <div className={s.item}>
    <img src={defaultAvatar} alt="ava"></img>
    {friend}
  </div>)
}

export default Friend;
