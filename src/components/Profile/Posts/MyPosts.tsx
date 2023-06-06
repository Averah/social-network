import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import AddPostForm from "./AddPostForm";
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';

const MyPosts: React.FC = () => {
  const posts = useSelector((state: AppStateType) => state.profilePage.posts)
  let postsElements = posts.map(post => (
    <Post message={post.message} likes={post.likes} key={post.id} />
  ));
  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddPostForm />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;

