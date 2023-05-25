import React from "react";
import { NavLink } from "react-router-dom";
import s from "./DialogsItem.module.css";

type PropsType = {
  dialogName: string
  id: number

}
const DialogsItem: React.FC<PropsType> = ({ dialogName, id }) => {
  let path = "/dialogs/" + id;
  return (
    <div className={s.dialog}>
      <NavLink to={path} className={({ isActive}) => (isActive ? s.active : '')}>
        {dialogName}
      </NavLink>
    </div>
  );
};

export default DialogsItem;
