import FriendsBar from "./FriendsBar/FriendsBar";


const Sidebar = (props) => {
  return <FriendsBar friends={props.sidebar.friends} />
   
}

export default Sidebar;
