import s from "./Friend.module.css";
import defaultAvatar from './../../../../../images/DefaultAvatar/defaultAvatar.png'

const Friend = (props) => {
  return (<div className={s.item}>
    <img src={defaultAvatar} alt="ava"></img>
    {props.friend}
  </div>)
}

export default Friend;
