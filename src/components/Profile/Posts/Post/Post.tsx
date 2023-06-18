import defaultAvatar from "../../../../images/DefaultAvatar/defaultAvatar.png";
import s from "./Post.module.css";
import React from 'react'

type PropsType = {
  message: string | null
  likes: string | null
  key: number | null
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src={defaultAvatar} className={s.avatar} alt='user avatar'></img>
      <span className={s.postText}>{props.message}</span>
      <div className={s.likes}>{props.likes}</div>
    </div>
  );
};

export default Post;
