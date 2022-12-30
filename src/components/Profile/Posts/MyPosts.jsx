import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";

const MyPosts = (props) => {
  let postsElements = props.profilePage.posts.map((p) => (
    <Post message={p.message} likes={p.likes} />
  ));

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = (e) => {
    let text = e.target.value;
    props.onPostChange(text);
  };
  
  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            value={props.profilePage.newPostText}
            placeholder="Enter your post"
          />
        </div>
        <div>
          <button onClick={onAddPost}>New post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
