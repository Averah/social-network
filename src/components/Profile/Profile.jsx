import ProfileInfo from "./DescriptionBlock/Description";
import Posts from "./Posts/Posts";
import s from "./Profile.module.css";

console.log("profile", s);

const Profile = () => {
  return (
    <div className={s.content}>
      <ProfileInfo />
      <Posts />
    </div>
  );
};

export default Profile;
