import Post from "./Post/Post";
import s from "./Posts.module.css";

const Posts = () => {
  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>New post</button>
        </div>
      </div>
      <div className={s.posts}>
        <Post message="Hey, it is me" likes="10 likes" />
        <Post message="It is my new post" likes="20 likes" />
        <Post message="It is my second post" likes="5 likes" />
      </div>
    </div>
  );
};

export default Posts;
