import { useEffect } from "react";

import ProfileInfo from "./DescriptionBlock/Description";
import MyPostsContainer from "./Posts/MyPostsContainer";

import s from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo />
      <MyPostsContainer
        store={props.store}
      />
    </div>
  );
};

export default Profile;
