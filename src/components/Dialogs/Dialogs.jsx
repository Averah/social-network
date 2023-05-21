import React from "react";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d, index) => (
    <DialogsItem name={d.name} id={d.id} key={index} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m, index) => (
    <Message message={m.message} key={index}/>
  ));
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}>{dialogsElements}</div>
      <div className={s.messages}>
        <div className={s.message}>{messagesElements}</div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Dialogs;
