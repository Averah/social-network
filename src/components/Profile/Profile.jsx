import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Posts/MyPostsContainer";
import s from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className={s.profileContent}>
      <div className={s.profileInfo}>
        <ProfileInfo
          profile={props.profile}
          status={props.status}
          updateUsersStatus={props.updateUsersStatus}
          isOwner={props.isOwner}
          savePhoto={props.savePhoto}
        />
      </div>
      <div className={s.profilePosts}>
        <MyPostsContainer store={props.store} />
      </div>
    </div>
  );
};

export default Profile;
