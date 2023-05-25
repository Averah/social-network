import React from "react";
import { useSelector } from "react-redux";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { AppStateType } from '../../redux/redux-store';


const Dialogs: React.FC = () => {
  const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs)
  const messages = useSelector((state: AppStateType) => state.dialogsPage.messages)

  let dialogsElements = dialogs.map((d, index) => (
    <DialogsItem dialogName={d.name} id={d.id} key={index} />
  ));
  let messagesElements = messages.map((m, index) => (
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

export default withAuthRedirect(Dialogs)
