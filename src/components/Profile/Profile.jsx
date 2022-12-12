import { useEffect } from "react";

import ProfileInfo from "./DescriptionBlock/Description";
import MyPosts from "./Posts/MyPosts";

import s from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        dispatch={props.dispatch}
      />
    </div>
  );
};

export default Profile;
