
import React from "react";
import { addDialogsMessageActionCreator, updateNewDialogsText } from "../../redux/state";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";



const Dialogs = (props) => {
  console.log(props)
  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogsItem name={d.name} id={d.id} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} />
  ));

  let newMessageElement = React.createRef()
  let addMessage = () => {
    props.dispatch(addDialogsMessageActionCreator())
  }
  

  let onMessageChange = () =>{
    let text = newMessageElement.current.value
    props.dispatch(updateNewDialogsText(text))
    
  }



  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <div className={s.newMessage}>
          <textarea onChange={onMessageChange} ref={newMessageElement} value={props.dialogsPage.newMessageText}></textarea>
          <div><button onClick={addMessage}>New Message</button></div>
        </div>
        </div>
      
    </div>
  );
};

export default Dialogs;
