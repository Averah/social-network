import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://png.pngtree.com/element_our/png_detail/20181228/avatar-icon-design-vector-png_296561.jpg"></img>
      {props.message}
      <div className={s.likes}>{props.likes}</div>
    </div>
  );
};

export default Post;
