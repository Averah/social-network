import React from "react";
import {
  addDialogsMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogsReducer";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogsItem name={d.name} id={d.id} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} />
  ));

  let addMessage = () => {
    props.addMessage();
  };

  let onMessageChange = (e) => {
    let text = e.target.value;
    props.onMessageChange(text);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <div className={s.newMessage}>
          <textarea
            onChange={onMessageChange}
            value={props.dialogsPage.newMessageText}
            placeholder="Enter your message"
          ></textarea>
          <div>
            <button onClick={addMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
