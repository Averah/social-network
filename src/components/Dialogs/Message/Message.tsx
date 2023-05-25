import React from "react";
import s from "./Message.module.css";

type PropsType = {
  message: string
}

const Message: React.FC<PropsType> = ({message}) => {
  return <div className={s.dialog}>{message}</div>;
};

export default Message;
