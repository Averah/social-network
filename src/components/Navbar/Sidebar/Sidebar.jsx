import FriendsBar from "./FriendsBar/FriendsBar";
import s from "./Sidebar.module.css";

const Sidebar = (props) => {
  return <FriendsBar state={props.state} />
   
}

export default Sidebar;
