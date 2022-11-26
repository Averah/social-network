import { NavLink } from "react-router-dom";
import s from "./DialogsItem.module.css";

const DialogsItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog}>
      <NavLink to={path} activeClassName={s.active}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogsItem;
