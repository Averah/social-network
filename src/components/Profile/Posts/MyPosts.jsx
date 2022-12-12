import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/state";

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likes={p.likes} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
    
  };

let onPostChange = () =>{
  let text = newPostElement.current.value
  props.dispatch(updateNewPostTextActionCreator(text))
}

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
        </div>
        <div>
          <button onClick={addPost}>New post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
