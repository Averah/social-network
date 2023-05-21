import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import AddPostForm from "./AddPostForm";

const MyPosts = React.memo(props => {
  let postsElements = props.profilePage.posts.map((p) => (
    <Post message={p.message} likes={p.likes} key={p.id} />
  ));
  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddPostForm />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
