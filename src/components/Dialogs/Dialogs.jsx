import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

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

const Message = (props) => {
  return <div className={s.dialog}>{props.message}</div>;
};

const Dialogs = (props) => {
  let dialogsData = [
    { id: 1, name: "Sasha" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Kate" },
    { id: 4, name: "Max" },
    { id: 5, name: "Dasha" },
  ];

  let messagesData = [
    { id: 1, message: "Hello" },
    { id: 2, message: "Its me" },
    { id: 3, message: "How is your day" },
  ];
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}>
        <DialogsItem name={dialogsData[0].name} id={dialogsData[0].id} />
        <DialogsItem name={dialogsData[1].name} id={dialogsData[1].id} />
        <DialogsItem name={dialogsData[2].name} id={dialogsData[2].id} />
        <DialogsItem name={dialogsData[3].name} id={dialogsData[3].id} />
        <DialogsItem name={dialogsData[4].name} id={dialogsData[4].id} />
      </div>
      <div className={s.messages}>
        <Message message={messagesData[0].message} />
        <Message message={messagesData[1].message} />
        <Message message={messagesData[2].message} />
      </div>
    </div>
  );
};

export default Dialogs;
