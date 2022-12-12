import Friend from "./Friend/Friend";
import s from "./FriendsBar.module.css";

const FriendsBar = (props) => {
  let friendsList = props.state.friends.map((f) => 
  <Friend friend={f.friend} />);
  
  return (

    <div className={s.friendsBar}>
      <div className={s.posts}>{friendsList}</div>
    </div>
  )
   
}

export default FriendsBar;
