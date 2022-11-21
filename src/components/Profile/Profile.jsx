import ProfileInfo from "./DescriptionBlock/Description";
import MyPosts from "./Posts/Posts";
import s from "./Profile.module.css";

console.log("profile", s);

const Profile = (props) => {
  let posts = [
    { id: 1, message: "Hey, it is me", likes: "10 likes" },
    { id: 2, message: "It is my new post", likes: "15 likes" },
    { id: 3, message: "It is my second post", likes: "20 likes" },
  ];

  return (
    <div className={s.content}>
      <ProfileInfo />
      <MyPosts profilePosts={posts} />
    </div>
  );
};

export default Profile;
