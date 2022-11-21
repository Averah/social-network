import Post from "./Post/Post";
import s from "./Posts.module.css";

const MyPosts = (props) => {
  let postsElements = props.profilePosts.map((p) => (
    <Post message={p.message} likes={p.likes} />
  ));

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
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
