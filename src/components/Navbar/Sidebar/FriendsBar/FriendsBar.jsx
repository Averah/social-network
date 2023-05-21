import Friend from "./Friend/Friend";
import s from "./FriendsBar.module.css";

const FriendsBar = (props) => {
  let friendsList = props.friends.map((f, index) => 
  <Friend friend={f.friend} key={index}/>);
  
  return (

    <div className={s.friendsBar}>
      <div className={s.posts}>{friendsList}</div>
    </div>
  )
   
}

export default FriendsBar;
