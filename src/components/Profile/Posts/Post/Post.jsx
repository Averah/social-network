import defaultAvatar from "../../../../images/DefaultAvatar/defaultAvatar.png";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={defaultAvatar} className={s.avatar}></img>
      <span className={s.postText}>{props.message}</span>
      <div className={s.likes}>{props.likes}</div>
    </div>
  );
};

export default Post;
